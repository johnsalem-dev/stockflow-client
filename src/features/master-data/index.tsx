import { PageHeader } from '@/components/layouts/page-header';

export const MasterDataGrid = () => {
    return(
        <div className="min-h-screen">
            <PageHeader
                preTitle="MASTER DATA"
                title="Master Data Management"
                description="Manage departments, categories, suppliers, and reference data in one place."
            />

            
        </div>
    )
}