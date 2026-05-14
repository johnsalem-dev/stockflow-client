import { Button } from "@/components/app-ui/button";
import { PageHeader } from "@/components/layouts/page-header";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import ProcurementTable from "./components/procurement";
import paths from "@/config/paths";

export const ProcurementBlock = () => {
    const navigate = useNavigate()

    const navigateToNewStock = () => {
        navigate(paths.newStockInward.slug);
    }
    return (
    <div className="min-h-screen">
        <PageHeader title="Procurement: Inward History" description="Track and manage all stock inward transition with precision.">
            <Button size="sm" onClick={navigateToNewStock}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Stock Inward
            </Button>
        </PageHeader>
        <ProcurementTable />
    </div>
    );
}