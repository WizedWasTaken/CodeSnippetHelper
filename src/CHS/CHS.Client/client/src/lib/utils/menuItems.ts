/**
 * Normal navigation list items for the nav bar
 * This will be shown in the nav bar, and is used to generate the nav items
 */
export const normalMenuItems = [
    {
        name: 'Hjem',
        path: '/',
    },
    {
        name: 'Snippets',
        path: '/snippets',
    }
];

/**
 * Login and register navigation list items for the nav bar
 * This will be shown in the nav bar, and is used to generate the nav items
 */
export const loginRegisterMenuItems = [
    {
        name: 'Login',
        path: '/login',
    },
    {
        name: 'Register',
        path: '/register',
    },
];

/**
 * Profile navigation list items for the nav bar
 */
export const profileMenuItems = [
    {
        name: 'Konto',
        path: '/dashboard',
    },
    {
        name: 'Log ud',
        path: '/signout',
    },
];

export const dashboardSideNavItems = [
    {
        name: 'Dashboard',
        path: '/dashboard',
    },
    {
        name: 'Mine Snippets',
        path: '/dashboard/snippets',
    },
];