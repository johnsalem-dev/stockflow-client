import { Button } from "@/components/app-ui/button";
import { PageHeader } from "@/components/layouts/page-header";
import paths from "@/config/paths";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import IssuanceTable from "./components/issuance-table";

export const IssuanceBlock = () => {
    const navigate = useNavigate()

    const navigateToNewStock = () => {
        navigate(paths.stockOutward.slug);
    }
    return (
    <div className="min-h-screen">
        <PageHeader title="Issuance: Outward History" description="Track and manage all stock outward traansactions and receive validationn.">
            <Button size="sm" onClick={navigateToNewStock}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Issuance
            </Button>
        </PageHeader>
        <IssuanceTable />
    </div>
    );
}