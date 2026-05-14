import { Button } from "@/components/app-ui/button"
import { PageHeader } from "@/components/layouts/page-header"
import { Download, Plus } from "lucide-react"
import { ItemCatalog } from "./components/item-catalog"
import { useNavigate } from "react-router"

export const ItemCatalogBlock = () => {
    const navigate = useNavigate()

    const navigateToAddItem = () => {
        navigate('add');
    }
    return (
        <div className="min-h-screen">
            <PageHeader title="Item Catalog" description="Manage global registry of office supply SKUs and stock position">
                <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
                <Button size="sm" onClick={navigateToAddItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Item
                </Button>
            </PageHeader>

            <ItemCatalog />

        </div>
    )
}