import { z } from 'zod';
export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  org: z.string().min(2),
  message: z.string().min(10).max(2000),
  audience: z.enum(['school','corporate','ngo'])
});
export type ContactInput = z.infer<typeof ContactSchema>;
