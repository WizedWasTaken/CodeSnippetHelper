'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    normalMenuItems,
    loginRegisterMenuItems,
    profileMenuItems,
} from '@/lib/utils/menuItems';
import { useSession } from '@/lib/utils/session';
import { Button } from '@/components/ui/button';

/*
 * Navigation bar with linkt to different pages, links can be added in the menuItems.ts file
 */
export default function NavBar() {
    const pathname = usePathname();
    const { session } = useSession();
    return (
        <nav className='justify-between w-full flex-row hidden md:flex'>
            <ul className='w-full hidden justify-center flex-row md:flex relative'>
                <ul className='flex justify-center gap-3 flex-row absolute'>
                    {normalMenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Button
                                    asChild
                                    size={'lg'}
                                    className={` ${pathname === item.path
                                        ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                                        : ''
                                        }`}
                                >
                                    <Link href={item.path}>{item.name}</Link>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
                {!session && (
                    <ul className='flex gap-3 justify-end items-end flex-grow'>
                        {loginRegisterMenuItems.map((item: any, index: any) => {
                            return (
                                <li key={index}>
                                    <Button
                                        asChild
                                        size={'lg'}
                                        className={` ${pathname === item.path
                                            ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                                            : ''
                                            }`}
                                    >
                                        <Link href={item.path}>{item.name}</Link>
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {session && (
                    <ul className='flex gap-2 justify-end items-end flex-grow'>
                        {(session.user as { groups?: string[] }).groups?.includes(
                            'admin'
                        ) && (
                                <li>
                                    <Button
                                        asChild
                                        size={'lg'}
                                    >
                                        <Link href='/admin'>Admin</Link>
                                    </Button>
                                </li>
                            )}
                        {profileMenuItems.map((item: any, index: any) => {
                            return (
                                <li key={index}>
                                    <Button
                                        asChild
                                        size={'lg'}
                                        className={` ${pathname === item.path
                                            ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                                            : ''
                                            }`}
                                    >
                                        <Link href={item.path}>{item.name}</Link>
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </ul>
        </nav>
    );
}