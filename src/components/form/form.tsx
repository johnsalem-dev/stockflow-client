import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type UseFormReturn,
  type SubmitHandler,
  type UseFormProps,
  type FieldValues,
  FormProvider,
} from 'react-hook-form';
import { ZodType , } from 'zod';

interface FormProps<TFormValues extends FieldValues, Schema extends ZodType<any, any, any>> {
    className?: string;
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: Omit<UseFormProps<TFormValues>, 'resolver'>;
    schema: Schema;
  }

export const Form = <
    TFormValues extends FieldValues,
    Schema extends ZodType<any, any, any>
>({
  onSubmit,
  children,
  className,
  options,
  schema,
}: FormProps<TFormValues, Schema>) => {
  // Initialize form with Zod validation resolver
  const methods = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema) as any,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};