import * as z from "zod/mini";
import { getBookableItem } from "@/lib/catalog";

// Shared by the request form (client) and /api/book (server) so both validate the
// same fields the same way. zod/mini keeps the form's client bundle small.

export const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const optionalText = (max: number, message: string) =>
  z._default(z.optional(z.string().check(z.trim(), z.maxLength(max, message))), "");

export const requestSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Enter your name (at least 2 characters)."),
      z.maxLength(80, "Name is too long.")
    ),
  phone: z
    .string()
    .check(z.trim(), z.regex(PHONE_PATTERN, "Enter a 10-digit phone number, for example (201) 555-0123.")),
  email: z._default(
    z.optional(
      z
        .string()
        .check(
          z.trim(),
          z.maxLength(120, "Email address is too long."),
          z.refine((v) => v === "" || EMAIL_PATTERN.test(v), "Enter a valid email address, or leave it blank.")
        )
    ),
    ""
  ),
  serviceId: z
    .string()
    .check(
      z.minLength(1, "Choose a service."),
      z.refine((id) => !!getBookableItem(id), "Choose a service from the list.")
    ),
  date: z.string().check(z.regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date.")),
  time: z.string().check(z.regex(/^\d{2}:\d{2}$/, "Choose a preferred time.")),
  notes: optionalText(500, "Notes can be up to 500 characters."),
  /** Honeypot: real visitors never see or fill this field. */
  company: optionalText(200, "Invalid."),
});

export type RequestInput = z.input<typeof requestSchema>;
export type RequestData = z.output<typeof requestSchema>;
