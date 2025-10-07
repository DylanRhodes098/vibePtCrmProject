import { z } from "zod";

export const memberCreate = z.object({
  gymId: z.string().uuid(),
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  joinDate: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
});

export const memberUpdate = memberCreate.partial();

export const memberUpdateWithId = memberUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.gymId !== undefined) return true;
    if (d.fullName !== undefined) return true;
    if (d.email !== undefined) return true;
    if (d.phone !== undefined) return true;
    if (d.joinDate !== undefined) return true;
    if (d.isActive !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const memberDelete = z.object({
  id: z.string().uuid(),
});

export const optionalMemberDelete = memberDelete.partial();

export default {
  memberCreate,
  memberUpdate,
  memberDelete,
  optionalMemberDelete,
  memberUpdateWithId,
};


