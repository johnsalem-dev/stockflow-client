import { z } from 'zod';

export const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  departmentId: z.string().min(1, 'Please select a department'),
  designation: z.string().min(1, 'Designation is required'),
  email: z.string().email('Invalid email address format'),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;