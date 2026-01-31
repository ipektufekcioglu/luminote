"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function useThemeSync() {
  const { settings } = useSettings();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(settings.colorTheme);
  }, [settings.colorTheme, setTheme]);
}
