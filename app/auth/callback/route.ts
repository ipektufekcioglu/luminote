import { createClient } from "@/auth/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/notes";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("🔵 Exchange data:", data);
    console.log("🔵 Exchange error:", error);

    if (!error) {
      const redirectUrl = `${origin}${next}`;
      console.log("🔵 ✅ SUCCESS! Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    console.log("🔵 ❌ No code found in URL");
  }

  return NextResponse.redirect(`${origin}/sign-in`);
}
