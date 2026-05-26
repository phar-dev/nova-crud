import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import Crud from '@/components/app-crud';

export default function Dashboard() {
    return (
        // <>
        //     <Head title="Dashboard" />
        //     <div className="flex flex-col flex-1 gap-4 p-4 rounded-xl h-full overflow-x-auto">
        //         <div className="gap-4 grid md:grid-cols-3 auto-rows-min">
        //             <div className="relative border border-sidebar-border/70 dark:border-sidebar-border rounded-xl aspect-video overflow-hidden">
        //                 <PlaceholderPattern className="absolute inset-0 stroke-neutral-900/20 dark:stroke-neutral-100/20 size-full" />
        //             </div>
        //             <div className="relative border border-sidebar-border/70 dark:border-sidebar-border rounded-xl aspect-video overflow-hidden">
        //                 <PlaceholderPattern className="absolute inset-0 stroke-neutral-900/20 dark:stroke-neutral-100/20 size-full" />
        //             </div>
        //             <div className="relative border border-sidebar-border/70 dark:border-sidebar-border rounded-xl aspect-video overflow-hidden">
        //                 <PlaceholderPattern className="absolute inset-0 stroke-neutral-900/20 dark:stroke-neutral-100/20 size-full" />
        //             </div>
        //         </div>
        //         <div className="relative flex-1 border border-sidebar-border/70 dark:border-sidebar-border rounded-xl min-h-[100vh] md:min-h-min overflow-hidden">
        //             <PlaceholderPattern className="absolute inset-0 stroke-neutral-900/20 dark:stroke-neutral-100/20 size-full" />
        //         </div>
        //     </div>
        // </>
        <>
            <Crud />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
