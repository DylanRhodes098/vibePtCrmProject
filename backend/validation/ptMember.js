import { z } from "zod";

export const ptMemberCreate = z.object({
  gymId: z.string().uuid(),
  ptId: z.string().uuid(),
  memberId: z.string().uuid(),
  notes: z.string().optional(),
  status: z.enum(["new", "engaged", "consult_booked", "client", "lost"]).optional(),
  lastContactedAt: z.coerce.date().optional(),
  nextActionAt: z.coerce.date().optional(),
});

export const ptMemberUpdate = ptMemberCreate.partial();

export const ptMemberUpdateWithId = ptMemberUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.gymId !== undefined) return true;
    if (d.ptId !== undefined) return true;
    if (d.memberId !== undefined) return true;
    if (d.notes !== undefined) return true;
    if (d.status !== undefined) return true;
    if (d.lastContactedAt !== undefined) return true;
    if (d.nextActionAt !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const ptMemberDelete = z.object({
  id: z.string().uuid(),
});

export const optionalPtMemberDelete = ptMemberDelete.partial();

export default {
  ptMemberCreate,
  ptMemberUpdate,
  ptMemberDelete,
  optionalPtMemberDelete,
  ptMemberUpdateWithId,
};


