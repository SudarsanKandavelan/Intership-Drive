// ✅ Still used for structure clarity, but not required now
import { z } from "zod";

export const listNotesSchema = z.object({
  maxResults: z.number().optional(),
  query: z.string().optional(),
});
