import NavBar from '@/components/pages/Header/NavComponent';
import HamburgerMenu from '@/components/pages/Header/HamburgerMenu';
import { useSession } from '@/lib/utils/session';
import { h3 } from 'framer-motion/client';

/*
 * Header component with the site title and navigation bar
 * This will be shown on all pages
 */
export default function Header() {
    const session = useSession();
    console.log(session);

    return (
        <header className='py-5 px-4 w-full flex justify-between items-center border-b-2 border-slate-400 overflow-hidden'>
            <HamburgerMenu />
            <div className='absolute w-full flex justify-end md:justify-start px-5 md:px-0'>
                {!session.session && (
                    <h3>
                        Code Snippet Hjælper
                    </h3>
                )}
                {session.session && (
                    <h3>
                        <b>Velkommen, </b>{session.session?.user.Name}
                    </h3>
                )}
            </div>
            <NavBar />
        </header>
    );
}