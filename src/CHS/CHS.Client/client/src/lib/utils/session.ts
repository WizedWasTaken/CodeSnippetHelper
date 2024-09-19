import { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { NextRequest } from 'next/server';
import { serialize, parse } from 'cookie';

// Define a Session class that holds the user and other session data
export class Session {
    constructor(public user: User) { }
}

// Global variable to store session change listeners
let sessionListeners: Array<(session: Session | null) => void> = [];

// Function to get the session from cookies or localStorage
export const getSession = (): Session | null => {
    if (typeof window !== 'undefined') {
        const sessionData = localStorage.getItem('session'); // Use localStorage instead of cookies
        if (sessionData) {
            try {
                const parsedData = JSON.parse(sessionData); // Parse the localStorage value
                return new Session(
                    new User(
                        parsedData.user.userId,
                        parsedData.user.name,
                        parsedData.user.email,
                        parsedData.user.password
                    )
                );
            } catch (error) {
                console.error("Error parsing session data:", error);
                return null;
            }
        }
    }
    return null;
};

// Function to save session data to localStorage and notify listeners
export const setSession = (session: Session): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('session', JSON.stringify(session)); // Save to localStorage
            document.cookie = serialize('session', JSON.stringify(session), {
                path: '/', // Ensure the path matches where you read and clear the cookie
                maxAge: 60 * 60 * 24 * 7, // 1 week
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            notifySessionListeners(session); // Notify all listeners about the session change
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }
};

// Function to clear session data from localStorage and notify listeners
export const clearSession = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('session'); // Remove session from localStorage
        document.cookie = serialize('session', '', {
            path: '/',
            maxAge: -1, // Expire the cookie immediately
        });
        notifySessionListeners(null); // Notify all listeners about the session change
    }
};

// Function to notify all registered listeners about session changes
const notifySessionListeners = (session: Session | null) => {
    sessionListeners.forEach((listener) => listener(session));
};

// Function to subscribe to session changes
export const subscribeToSessionChanges = (listener: (session: Session | null) => void) => {
    sessionListeners.push(listener);
    return () => {
        sessionListeners = sessionListeners.filter((l) => l !== listener); // Unsubscribe when component unmounts
    };
};

export const getSessionFromRequest = (request?: NextRequest): Session | null => {
    let sessionCookie: string | undefined;

    if (request) {
        // Server-side: read the session from the request cookies
        sessionCookie = request.cookies.get('session')?.value;
    } else if (typeof document !== 'undefined') {
        // Client-side: read the session from the document cookies
        const cookies = parse(document.cookie);
        sessionCookie = cookies.session;
    }

    if (sessionCookie) {
        console.log('session cookie');
        try {
            const parsedData = JSON.parse(sessionCookie);
            return new Session(
                new User(
                    parsedData.user.userId,
                    parsedData.user.name,
                    parsedData.user.email,
                    parsedData.user.password
                )
            );
        } catch (error) {
            console.error("Error parsing session data:", error);
            return null;
        }
    }
    return null
};

// Custom hook to manage session state
export const useSession = () => {
    const [session, setSessionState] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load session data from localStorage on component mount
        const storedSession = getSession();
        if (storedSession) {
            setSessionState(storedSession);
        }
        setLoading(false); // Set loading to false after session is checked

        // Subscribe to session changes
        const unsubscribe = subscribeToSessionChanges((updatedSession) => {
            setSessionState(updatedSession); // Update the local state when session changes
        });

        // Cleanup subscription on component unmount
        return () => {
            unsubscribe();
        };
    }, []);

    return { session, loading };
};
