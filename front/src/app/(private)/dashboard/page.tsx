// front/src/app/dashboard/page.tsx
import { LoadingState } from '@/components/loading';
import { DashboardMain } from '@/pages/DashboardMain';
import { Suspense } from 'react';

export default function DashboardPage() {
    return (
        <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
                <DashboardMain />
            </Suspense>
        </main>
    );
}