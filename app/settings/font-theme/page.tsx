"use client";
import { useState, useEffect, useMemo } from "react";
import { RiFontSansSerif } from "react-icons/ri";
import { RiFontSans } from "react-icons/ri";
import { RiFontMono } from "react-icons/ri";
import type { FontTheme } from "@/app/types";
import { useSettings } from "@/contexts/SettingsContext";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { toast } from "sonner";

export default function FontThemePage() {
  const { settings, setSettings } = useSettings();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const handleChange = async (fontTheme: FontTheme) => {
    try {
      setSettings((s) => ({ ...s, fontTheme }));

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("user", user);

      if (!user) {
        toast.error("You must be logged in to save settings");
        return;
      }

      const { error } = await supabase
        .from("settings")
        .upsert(
          {
            user_id: user.id,
            font_theme: fontTheme,
            color_theme: settings.colorTheme,
          },
          { onConflict: "user_id" },
        )
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to save font theme");
        console.error(error);
      } else {
        toast.success("Font theme updated!");
      }
    } catch (error) {
      toast.error("An error occcured");
      console.error(error);
    }
  };

  return (
    <div className="py-4 px-4 flex-1 overflow-hidden flex flex-col mx-auto max-w-md max-h-screen gap-4">
      <div>
        <h1 className="text-2xl">Font Theme</h1>
        <p>Choose your font theme:</p>
        <p>{settings.fontTheme}</p>
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.fontTheme === "sans" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <RiFontSans className="w-6 h-6" />
          <label htmlFor="sans">
            <h1 className="text-xl">Sans-serif</h1>
            <p className="text-sm">Clean and modern, easy to read.</p>
          </label>
        </div>
        <input
          type="radio"
          id="sans"
          value="sans"
          name="font"
          checked={settings.fontTheme === "sans"}
          className="w-6 h-6"
          onChange={() => handleChange("sans")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.fontTheme === "serif" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <RiFontSansSerif className="w-6 h-6" />
          <label htmlFor="serif">
            <h1 className="text-xl">Serif</h1>
            <p className="text-sm">Classic and elegant for a timeless feel.</p>
          </label>
        </div>
        <input
          type="radio"
          id="serif"
          value="serif"
          name="font"
          checked={settings.fontTheme === "serif"}
          className="w-6 h-6"
          onChange={() => handleChange("serif")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.fontTheme === "mono" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <RiFontMono className="w-6 h-6" />
          <label htmlFor="mono">
            <h1 className="text-xl">Monospace</h1>
            <p className="text-sm">Code-like, great for a technical vibe.</p>
          </label>
        </div>
        <input
          type="radio"
          id="mono"
          value="mono"
          name="font"
          checked={settings.fontTheme === "mono"}
          className="w-6 h-6"
          onChange={() => handleChange("mono")}
        />
      </div>
    </div>
  );
}
