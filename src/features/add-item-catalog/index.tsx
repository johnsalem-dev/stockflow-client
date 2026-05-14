import { PageHeader } from "@/components/layouts/page-header"
import { useLocation } from "react-router"
import AddItemForm from "./forms/add-item-form";

export const AddItemCatalog = () => {
    const route = useLocation();
    return (
        <div className="min-h-screen">
            <PageHeader route={route} title="Add New Item" description="Registering a new unique entity in the central architect database." />
            <AddItemForm />

        </div>
    )
}