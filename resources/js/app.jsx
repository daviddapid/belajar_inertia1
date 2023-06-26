import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import MainLayout from './Pages/MainLayout';

createInertiaApp({
    resolve: name => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx', { eager: true })),
    // resolve: name => {
    //     const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    //     let page = pages[`./Pages/${name}.jsx`]
    //     page.default.layout = page.default.layout || (page => <MainLayout children={page} />)

    //     return page
    // },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})