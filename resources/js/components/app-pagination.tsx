import { router } from '@inertiajs/react';
import {
    Pagination as PaginationNav,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginationMeta } from '@/types/pagination';

type AppPaginationProps = {
    meta: PaginationMeta;
};

const buildSearchParams = (page: number): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);

    params.set('page', String(page));

    return Object.fromEntries(params);
};

const navigate = (page: number) => {
    router.get(window.location.pathname, buildSearchParams(page), {
        preserveState: true,
        preserveScroll: true,
    });
};

export default function AppPagination({ meta }: AppPaginationProps) {
    if (meta.last_page <= 1) {
        return null;
    }

    const url = (page: number) => {
        const params = new URLSearchParams(window.location.search);

        params.set('page', String(page));

        return `${window.location.pathname}?${params.toString()}`;
    };

    const renderPages = () => {
        const pages: React.ReactNode[] = [];
        const range = 2;
        const start = Math.max(2, meta.current_page - range);
        const end = Math.min(meta.last_page - 1, meta.current_page + range);

        // Page 1
        pages.push(
            <PaginationItem key="page-1">
                <PaginationLink
                    href={url(1)}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(1);
                    }}
                    isActive={meta.current_page === 1}
                >
                    1
                </PaginationLink>
            </PaginationItem>,
        );

        // Start ellipsis
        if (start > 2) {
            pages.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
        }

        // Middle pages
        for (let i = start; i <= end; i++) {
            pages.push(
                <PaginationItem key={`page-${i}`}>
                    <PaginationLink
                        href={url(i)}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(i);
                        }}
                        isActive={meta.current_page === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        // End ellipsis
        if (end < meta.last_page - 1) {
            pages.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>,
            );
        }

        // Last page
        if (meta.last_page > 1) {
            pages.push(
                <PaginationItem key={`page-${meta.last_page}`}>
                    <PaginationLink
                        href={url(meta.last_page)}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(meta.last_page);
                        }}
                        isActive={meta.current_page === meta.last_page}
                    >
                        {meta.last_page}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return pages;
    };

    return (
        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                {meta.from}–{meta.to} of {meta.total}
            </p>
            <PaginationNav className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={url(meta.current_page - 1)}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(meta.current_page - 1);
                            }}
                            className={
                                meta.current_page <= 1
                                    ? 'pointer-events-none opacity-50'
                                    : undefined
                            }
                        />
                    </PaginationItem>
                    {renderPages()}
                    <PaginationItem>
                        <PaginationNext
                            href={url(meta.current_page + 1)}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(meta.current_page + 1);
                            }}
                            className={
                                meta.current_page >= meta.last_page
                                    ? 'pointer-events-none opacity-50'
                                    : undefined
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </PaginationNav>
        </div>
    );
}
