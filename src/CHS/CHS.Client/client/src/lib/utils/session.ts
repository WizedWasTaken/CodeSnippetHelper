import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/entities/User';

// Define a Session class that holds the user and other session data
export class Session {
    constructor(public user: User) { }
}

// Function to get the session from cookies
export const getSession = (): Session | null => {
    if (typeof window !== 'undefined') {
        const sessionData = Cookies.get('session');

        if (sessionData) {
            try {
                const parsedData = JSON.parse(sessionData); // Parse the cookie value
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

// Function to save session data to cookies
export const setSession = (session: Session): void => {
    if (typeof window !== 'undefined') {
        try {
            // Serialize the session object to JSON
            Cookies.set('session', JSON.stringify(session), {
                expires: 7, // Expires in 7 days
                secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
                path: '/', // Ensure the cookie is available across the entire site
                sameSite: 'lax', // Allows sending cookies on top-level navigation
            });
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }
};

// Custom hook to manage session state
export const useSession = () => {
    const [session, setSessionState] = useState<Session | null>(null);

    useEffect(() => {
        const storedSession = getSession();
        if (storedSession) {
            setSessionState(storedSession);
        }
    }, []); // Empty dependency array ensures this runs only once

    const updateSession = (sessionData: Session) => {
        setSessionState(sessionData); // Update local state
        setSession(sessionData); // Save to cookies
    };

    const clearSession = () => {
        setSessionState(null); // Clear local state
        Cookies.remove('session'); // Remove session from cookies
    };

    return { session, updateSession, clearSession };
};
