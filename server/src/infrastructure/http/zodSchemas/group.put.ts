import { z } from 'zod';

export const editGroupSchema = z.object({
  group_id: z.uuid(),
  group_name: z.string(),
  active: z.boolean().optional(),
  group_description: z.string().optional(),
  users_email: z.email(),
});

export type EditGroup = z.infer<typeof editGroupSchema>;
