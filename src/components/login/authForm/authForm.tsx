"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthForm({ value }: any) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, _session) => {
      if (event === "SIGNED_IN") {
        if (value === "admin" || value === "teacher") {
          router.replace("/admin/home");
        }
        if (value === "parent") {
          router.replace("/parent/home");
        }
      }
    });
  }, [router, supabase.auth]);

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={`http://localhost:3000/login/callback?userType=${value}`}
    />
  );
}
