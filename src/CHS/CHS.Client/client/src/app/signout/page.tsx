'use client';

import { Button } from "@/components/ui/button";
import { useSession, clearSession } from "@/lib/utils/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function SignOut() {
    const { session, loading } = useSession();
    const router = useRouter();

    // Redirect to login page if not signed in
    useEffect(() => {
        if (!loading) {
            console.log(session);
            if (!session) {
                router.replace('/login');
            }
        }
    }, [session, loading, router]);

    function handleSignOut() {
        clearSession(); // Clear session state
        router.push('/'); // Redirect to homepage after sign out
    }

    function cancelSignOut() {
        router.push('/dashboard'); // Redirect to profile or another page when canceling
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900 p-4">
            <main className="flex flex-col items-center justify-center w-full max-w-lg bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8">
                <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
                <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-100 text-center mb-4">
                    Er du sikker på, at du vil logge ud?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-center mb-6">
                    Hvis du logger ud, vil du blive nødt til at logge ind igen for at få adgang til dine data.
                </p>
                <div className="flex gap-4">
                    <Button
                        onClick={handleSignOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Log ud
                    </Button>
                    <Button
                        onClick={cancelSignOut}
                        variant="outline"
                        className="border-neutral-400 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-6 py-3 rounded-lg font-semibold"
                    >
                        Annuller
                    </Button>
                </div>
            </main>
        </div>
    );
}