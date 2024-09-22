"use client";

// Imports
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/classNames";
import LoggedInAlert from "@/components/alerts/LoggedInAlert";

// Find a solution to session and sign in.
import { Session, setSession, useSession } from "@/lib/utils/session";
import { User } from "@/entities/User";
import { useRouter } from "next/navigation";

/*
 * Login page
 */
export default function LoginPage() {
  const { session } = useSession();
  const router = useRouter();

  // TODO: Find a way to alert other than using alert
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userObject = new User(
      0,
      "Log ind",
      formData.get("email") as string,
      formData.get("password") as string
    );

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/User/login`;
      const { userId, name, email, password } = userObject;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, name, email, password }),
      });

      if (res.ok) {
        alert("Du er nu logget ind!");
        const data: any = await res.json();
        const user = new User(
          data.userId,
          data.name,
          data.email,
          data.password
        );
        setSession(new Session(user));
        let redirectUrl: string = "/dashboard";

        const params = new URLSearchParams(window.location.search);
        const redirectParam = params.get("redirect");

        // If 'redirect' parameter exists, use it as the redirect URL
        if (redirectParam) {
          redirectUrl = redirectParam;
        }

        router.push(redirectUrl);
        return;
      }

      alert("Der opstod en fejl under login på brugeren.");

      return;
    } catch (error: any) {
      alert(
        "An error occurred while creating the user. Please try again later."
      );
    }
  };

  return (
    <main className="flex flex-col flex-grow items-center justify-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Velkommen tilbage til Code Snippet Hjælper
      </h2>
      <p className="text-neutral-600 text-sm md:text-lg mt-2 dark:text-neutral-300">
        Log ind på din konto
      </p>
      <div>
        <form className="my-6 flex flex-col gap-2" onSubmit={registerUser}>
          <div className="flex gap-5">
            <LabelInputContainer className="md:mb-2">
              <Label htmlFor="email">E-mailadresse</Label>
              <Input
                name="email"
                id="email"
                placeholder="din@email.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="md:mb-4">
              <Label htmlFor="password">Kodeord</Label>
              <Input
                name="password"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </LabelInputContainer>
          </div>

          <button
            className="bg-gradient-to-br relative group/btn disabled:cursor-not-allowed from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={session ? true : false}
          >
            Log ind &rarr;
            {!session && <BottomGradient />}
          </button>
        </form>
        <div>{session && <LoggedInAlert />}</div>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
