import Link from "next/link";
import { Fragment } from "react";

// Renders plain copy, turning the first occurrence of each given phrase into a link.
export default function LinkedText({
  text,
  links = [],
}: {
  text: string;
  links?: { text: string; href: string }[];
}) {
  const parts: (string | { text: string; href: string })[] = [text];
  for (const link of links) {
    const i = parts.findIndex((p) => typeof p === "string" && p.includes(link.text));
    if (i === -1) continue;
    const s = parts[i] as string;
    const at = s.indexOf(link.text);
    parts.splice(i, 1, s.slice(0, at), link, s.slice(at + link.text.length));
  }
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <Link
            key={i}
            href={p.href}
            className="font-medium text-brand-purple-strong underline underline-offset-4 hover:no-underline"
          >
            {p.text}
          </Link>
        )
      )}
    </>
  );
}
