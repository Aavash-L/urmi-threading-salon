import { z } from "zod";
import { getBookableItem } from "@/lib/catalog";

// Shared by the request form (client) and /api/book (server) so both validate the
// same fields the same way.

export const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;

export const requestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(80, "Name is too long."),
  phone: z.string().trim().regex(PHONE_PATTERN, "Enter a 10-digit phone number, for example (201) 555-0123."),
  email: z
    .string()
    .trim()
    .max(120, "Email address is too long.")
    .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address, or leave it blank.")
    .optional()
    .default(""),
  serviceId: z
    .string()
    .min(1, "Choose a service.")
    .refine((id) => !!getBookableItem(id), "Choose a service from the list."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Choose a preferred time."),
  notes: z.string().trim().max(500, "Notes can be up to 500 characters.").optional().default(""),
  /** Honeypot: real visitors never see or fill this field. */
  company: z.string().optional().default(""),
});

export type RequestInput = z.input<typeof requestSchema>;
export type RequestData = z.output<typeof requestSchema>;
