import { Button } from "@/components/app-ui/button";
import { DialogFormWrapper } from "@/components/wrapper/dialog-from-wrapper";
import { UserPlus } from "lucide-react";
import { CreateEmployeeForm } from "../forms/create-employee";

export const AddEmployeeDialog = () => {

  return (
    <DialogFormWrapper
      title="Register New Employee"
      description="Enter employee details to initialize their corporate profile."
      triggerButton={
        <Button variant="primary" className="gap-2 px-4 h-11">
            <UserPlus className="h-4 w-4" /> Register New Employee
      </Button>
      }
      onClose={close}
    >
      {({close}) => <CreateEmployeeForm onClose={close} />}
    </DialogFormWrapper>
  );
};