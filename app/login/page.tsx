import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Navbar from "@/components/Navbar";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <main className="h-full w-full bg-gray-200 dark:bg-slate-700">
      <Navbar/>
      <div className="h-screen w-full bg-gray-200 dark:bg-slate-700 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form className="animate-in flex-1 flex flex-col max-w-md justify-center gap-2 text-foreground">
          <label className="text-md text-black" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 border mb-6 bg-gray-200 text-gray-700"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md text-black" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 border mb-6 bg-gray-200 text-gray-700"
            type="password"
            name="password"
            placeholder="•••••••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-indigo-600 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="bg-indigo-600 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
    </main>
  );
}
