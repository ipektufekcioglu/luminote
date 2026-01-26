"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import type { FontTheme, ColorTheme, SettingsType } from "@/app/types";

export const SettingsContext = createContext<{
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
  setFontTheme: (v: FontTheme) => Promise<void>;
  setColorTheme: (v: ColorTheme) => Promise<void>;
} | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>({
    fontTheme: "sans",
    colorTheme: "light",
  });
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth.user;
        if (!user) {
          setIsLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("settings")
          .select("font_theme, color_theme")
          .eq("user_id", user.id)
          .single();
        if (!error && data) {
          setSettings({
            fontTheme: data.font_theme,
            colorTheme: data.color_theme,
          });
        }
      } catch (err) {
        console.error("Unexpected error fetching settings", err);
      }
      {
        setIsLoading(false);
      }
    };
    fetchSettings();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchSettings();
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-sans", "font-serif", "font-mono");
    root.classList.add(`font-${settings.fontTheme}`);
    console.log(root.classList);
  }, [settings.fontTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.colorTheme === "dark") {
      root.classList.add("dark");
    } else if (settings.colorTheme === "light") {
      root.classList.remove("dark");
    } else if (settings.colorTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [settings.colorTheme]);

  async function setFontTheme(v: FontTheme) {
    setSettings((s) => ({ ...s, fontTheme: v }));

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return;

    await supabase
      .from("settings")
      .upsert({ user_id: user.id, font_theme: v }, { onConflict: "user_id" });
  }

  async function setColorTheme(v: ColorTheme) {
    setSettings((s) => ({ ...s, colorTheme: v }));

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user) return;

    await supabase
      .from("settings")
      .upsert({ user_id: user.id, color_theme: v }, { onConflict: "user_id" });
  }

  const value = useMemo(
    () => ({ settings, setSettings, setFontTheme, setColorTheme }),
    [settings],
  );
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
