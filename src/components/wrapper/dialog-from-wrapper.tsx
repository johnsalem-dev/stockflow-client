import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/utils';

export interface DialogFormWrapperProps {
  title: string;
  description?: string;
  triggerButton: React.ReactElement<{ onClick?: () => void }>;
  submitButton?: React.ReactElement<{ disabled?: boolean }>;
  onClose?: () => void;
  children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);
  isLoading?: boolean;
  className?: string;
}

export const DialogFormWrapper = ({
  title,
  description,
  triggerButton,
  submitButton,
  children,
  isLoading,
  className,
}: DialogFormWrapperProps) => {
  const { isOpen, open, close } = useDisclosure();

  const handleClose = React.useCallback(() => {
    close();
  }, [close]);

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => !openState && handleClose()}>
      {React.cloneElement(triggerButton, {
        onClick: () => {
          triggerButton.props.onClick?.();
          open();
        },
      })}

      <DialogContent className={cn("sm:max-w-[500px] gap-0 p-0 overflow-hidden border-border bg-background shadow-2xl", className)}>
        
        <DialogHeader className="p-6 bg-muted/50 border-b border-border">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-md text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="p-6 bg-muted/10 ">
        {typeof children === 'function' ? children({ close: handleClose }) : children}
        </div>

        {submitButton && (
          <DialogFooter className="p-4 bg-muted/50 border-t border-border flex items-center gap-2">
             {/* We can add a Cancel button here by default if we wanted to be extra helpful */}
             <DialogFooter>
                {React.cloneElement(submitButton, {
                    disabled: isLoading || submitButton.props.disabled,
                    // Ensuring our primary button inside modals always feels "Elevated"
                    // variant: submitButton.props.variant || "primary" 
                })}
             </DialogFooter>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};