"use client";

import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { TbSunMoon } from "react-icons/tb";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function ColorThemePage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const { settings, setSettings } = useSettings();

  const handleChange = async (colorTheme) => {
    try {
      setSettings((s) => ({ ...s, colorTheme }));

      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) {
        toast.error("You must be logged in to save settings");
      }

      const { error } = await supabase
        .from("settings")
        .update({ colorTheme: colorTheme })
        .eq("user_id", user.id);
      if (error) {
        toast.error("Failed to save color theme");
        console.error(error);
      } else {
        toast.success("Color theme updated!");
      }
    } catch (error) {
      toast.error("an error occured");
      console.error("An error occured");
    }
  };

  return (
    <div className="py-4 px-4 flex-1 overflow-hidden flex flex-col mx-auto max-w-md max-h-screen gap-4">
      <div>
        <h1 className="text-2xl">Color Theme</h1>
        <p>Choose your color theme:</p>
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${theme === "light" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
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
          defaultChecked
          className="w-6 h-6"
          onChange={() => handleChange("light")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${theme === "dark" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
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
          className="w-6 h-6"
          onChange={() => handleChange("dark")}
        />
      </div>
      <div
        className={`flex justify-between items-center border rounded-lg px-2 py-2 ${theme === "system" ? "bg-gray-100" : "bg-white"} cursor-pointer`}
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
          className="w-6 h-6"
          onChange={() => handleChange("system")}
        />
      </div>
    </div>
  );
}
