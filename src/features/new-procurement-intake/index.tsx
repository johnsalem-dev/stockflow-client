import { PageHeader } from "@/components/layouts/page-header";
import { useLocation } from "react-router"
import NewProcurementForm from "./forms/new-procurement-form";

export const NewProcurementIntake = () => {
    const route = useLocation();
    return (
        <div className="min-h-screen">
            <PageHeader route={route} title="New Procurement Intake" description="Validate and commit physical or digital inventory arrivals into the master ledger with real-time source reconciliation."/>
            <NewProcurementForm />
        </div>
    )
}