import { BUSINESS } from "@/lib/constants";

export default function HoursTable({ className = "" }: { className?: string }) {
  return (
    <table className={`text-sm w-full ${className}`}>
      <caption className="sr-only">Salon hours</caption>
      <tbody>
        {BUSINESS.hours.map((h) => (
          <tr key={h.days} className="border-b border-lavender-100 last:border-0">
            <th scope="row" className="py-1.5 pr-3 text-left align-top font-medium text-charcoal">{h.days}</th>
            <td className="py-1.5 text-gray-700 align-top sm:whitespace-nowrap">{`${h.open} – ${h.close}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
