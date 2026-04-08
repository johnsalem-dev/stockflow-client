import { Button } from "@/components/app-ui/button";
import { DialogFormWrapper } from "@/components/wrapper/dialog-from-wrapper";
import { PlusCircle } from "lucide-react";
import { CreateDepartmentForm } from "../forms/create-department";

export const AddDepartmentDialog = () => {

  return (
      <DialogFormWrapper
        title="Add Department"
        description="Register a new functional unit within the organization."
        triggerButton={<Button size={"sm"} variant="ghost"><span className="mr-2"><PlusCircle size={16}/></span> Add New Department</Button>}
      >
        {({ close }) => <CreateDepartmentForm onClose={close} />}
        
      </DialogFormWrapper>
  );
};