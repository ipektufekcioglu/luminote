import { createClient } from "@/auth/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("🔵 ===== CALLBACK ROUTE CALLED =====");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/notes";
  console.log("🔵 Code:", code);
  console.log("🔵 Origin:", origin);
  console.log("🔵 Next:", next);
  console.log("🔵 Full URL:", request.url);

  if (code) {
    console.log("🔵 Code found, creating Supabase client...");
    const supabase = await createClient();

    console.log("🔵 Exchanging code for session...");
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("🔵 Exchange data:", data);
    console.log("🔵 Exchange error:", error);

    if (!error) {
      const redirectUrl = `${origin}${next}`;
      console.log("🔵 ✅ SUCCESS! Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    } else {
      console.log("🔵 ❌ Exchange failed:", error.message);
    }
  } else {
    console.log("🔵 ❌ No code found in URL");
  }

  return NextResponse.redirect(`${origin}/sign-in`);
}
