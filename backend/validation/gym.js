import { z } from "zod";

export const gymCreate = z.object({
  name: z.string().min(1),
  brand_theme_json: z.any().nullable().optional(),
});

export const gymUpdate = gymCreate.partial();

export const gymUpdateWithId = gymUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.name !== undefined) return true;
    if (d.brand_theme_json !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const gymDelete = z.object({
  id: z.string().uuid(),
});

export const optionalGymDelete = gymDelete.partial();

export default {
  gymCreate,
  gymUpdate,
  gymDelete,
  optionalGymDelete,
  gymUpdateWithId,
};


