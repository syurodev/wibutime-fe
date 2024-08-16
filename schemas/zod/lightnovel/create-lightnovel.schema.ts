import * as z from "zod";
import { EditorContentSchema } from "../shared/editor-content.schema";

export const lightnovelCreateSchema = z.object({
  name: z.string().trim().min(1, { message: "Tên lightnovel là bắt buộc" }),
  other_names: z
    .array(
      z.object({
        id: z.string({ required_error: "Vui lòng nhập ít nhất một tên khác" }),
        text: z.string({
          required_error: "Vui lòng nhập ít nhất một tên khác",
        }),
      }),
      { required_error: "Vui lòng nhập ít nhất một tên khác" }
    )
    .nonempty({ message: "Vui lòng nhập ít nhất một tên khác" }),
  categories: z.array(z.string()),
  author: z.string().trim().min(1, { message: "Tên tác giả là bắt buộc" }),
  illustrator: z.string().optional(),
  image: z.string().optional(),
  note: EditorContentSchema.optional(),
  summary: EditorContentSchema,
  user_id: z.coerce.number(),
});

export type LightnovelCreateSchema = z.infer<typeof lightnovelCreateSchema>;
