import { PageHeader } from "@/components/layouts/page-header";
import { useLocation } from "react-router"
import { NewIssuanceForm } from "./forms/new-issuance-from";

export const NewIssuanceOutward = () => {
    const route = useLocation();
    
    return(
        <div className="min-h-screen">
            <PageHeader route={route} title="Controlled Issuance" description="Submit a multi-item outward request for validated personnel."/>
            <NewIssuanceForm />
        </div>
    )
}