import { z } from 'zod';

const projectStatus = z.union([
  z.literal('IN_PROGRESS'),
  z.literal('PENDING'),
  z.literal('REJECTED'),
  z.literal('FAILED'),
  z.literal('COMPLETED'),
]);

const accessRole = z.union([
  z.literal('Owner'),
  z.literal('Developer'),
  z.literal('Admin'),
]);

export type ProjectStatus = z.infer<typeof projectStatus>;

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  createdDate: z.coerce.date(),
  modifiedDate: z.coerce.date(),
  status: projectStatus
    .default('IN_PROGRESS')
    .transform(value => value.split('_').join(' ')),
  modifiedBy: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  accessRole: accessRole,
});

export type Project = z.infer<typeof projectSchema>;
