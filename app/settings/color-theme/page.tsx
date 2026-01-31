"use client";

import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { TbSunMoon } from "react-icons/tb";
import { useState, useMemo } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { toast } from "sonner";
import type { ColorTheme } from "@/app/types";

export default function ColorThemePage() {
  const { settings, setSettings } = useSettings();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const handleChange = async (colorTheme: ColorTheme) => {
    try {
      setSettings((s) => ({ ...s, colorTheme }));

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
            font_theme: settings.fontTheme,
            color_theme: colorTheme,
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
    <div className="py-4 px-4 flex-1 overflow-hidden flex flex-col mx-auto max-w-md max-h-screen gap-4 text-popover">
      <div className="text-foreground">
        <h1 className="text-2xl">Color Theme</h1>
        <p>Choose your color theme:</p>
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.colorTheme === "light" ? "bg-card" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <LuSun className="w-6 h-6" />
          <label htmlFor="light">
            <h1 className="text-xl">Light Mode</h1>
            <p className="text-sm">Pick a clean and classic light theme</p>
          </label>
        </div>
        <input
          type="radio"
          id="light"
          value="light"
          name="theme"
          checked={settings.colorTheme == "light"}
          className="w-6 h-6"
          onChange={() => handleChange("light")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.colorTheme === "dark" ? "bg-card" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <FaRegMoon className="w-6 h-6" />
          <label htmlFor="dark">
            <h1 className="text-xl">Dark Mode</h1>
            <p className="text-sm">Select a sleek and modern dark theme</p>
          </label>
        </div>
        <input
          type="radio"
          id="dark"
          value="dark"
          name="theme"
          checked={settings.colorTheme == "dark"}
          className="w-6 h-6"
          onChange={() => handleChange("dark")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${settings.colorTheme === "system" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
      >
        <div className="flex items-center gap-4">
          <TbSunMoon className="w-6 h-6" />
          <label htmlFor="system">
            <h1 className="text-xl">System</h1>
            <p className="text-sm">Adapts to your device’s theme</p>
          </label>
        </div>
        <input
          type="radio"
          id="system"
          value="system"
          name="theme"
          checked={settings.colorTheme == "system"}
          className="w-6 h-6"
          onChange={() => handleChange("system")}
        />
      </div>
    </div>
  );
}
