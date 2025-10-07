import { z } from "zod";

export const timeLineCreate = z.object({
  ptMemberId: z.string().uuid(),
  type: z.enum(["note", "contacted", "consult_booked", "session"]).default("note"),
  body: z.string().optional(),
  createdBy: z.string().uuid(),
});

export const timeLineUpdate = timeLineCreate.partial();

export const timeLineUpdateWithId = timeLineUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.ptMemberId !== undefined) return true;
    if (d.type !== undefined) return true;
    if (d.body !== undefined) return true;
    if (d.createdBy !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const timeLineDelete = z.object({
  id: z.string().uuid(),
});

export const optionalTimeLineDelete = timeLineDelete.partial();

export default {
  timeLineCreate,
  timeLineUpdate,
  timeLineDelete,
  optionalTimeLineDelete,
  timeLineUpdateWithId,
};


