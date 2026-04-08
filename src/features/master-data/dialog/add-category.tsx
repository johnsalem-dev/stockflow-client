import { Button } from "@/components/app-ui/button";
import { DialogFormWrapper } from "@/components/wrapper/dialog-from-wrapper";
import { PlusCircle } from "lucide-react";
import { CreateCategoryForm } from "../forms/create-category";

export const AddCategoryDialog = () => {
  return (
    <DialogFormWrapper
      title="Create New Category"
      description="Define a new architectural grouping for the master inventory."
      triggerButton={
        <Button size={"sm"} variant="ghost" className="border-2 border-dashed border-muted flex flex-col items-center justify-center rounded-xl p-4 gap-2 transition-colors group min-h-[110px]"> 
          <span className="mr-2"><PlusCircle size={16} /></span> Add New Category
        </Button>
      }
      onClose={close}
    >
      {({close}) => <CreateCategoryForm onClose={close} />}
    </DialogFormWrapper>
  );
};