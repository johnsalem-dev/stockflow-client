import { PageHeader } from '@/components/layouts/page-header';
import { Button } from '@/components/app-ui/button';
import { UploadCloud } from 'lucide-react';

export const MasterDataGrid = () => {
    return(
        <div className="min-h-screen">
            <PageHeader
                title="Establishing Source of Truth"
                description="Define organizational structures, categories, and personnel to initialize system integrity."
            >
                <Button size="sm" variant="outline">
                    Export Master file
                </Button>
                <Button size="sm">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Bulk Import
                </Button>
            </PageHeader>

        </div>
    )
}