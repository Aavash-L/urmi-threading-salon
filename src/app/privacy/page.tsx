import { BUSINESS, SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = pageMetadata("/privacy");

// Describes only what the code actually does (traced in docs/urmi-audit-implementation.md,
// Phase 3). It is not a legal review; owner policy decisions still needed are listed there.
export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Appointment Privacy Information", url: `${SITE_URL}/privacy` }]} />
      <article className="pt-32 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 leading-relaxed">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-8">Appointment Privacy Information</h1>

          <section aria-labelledby="requests" className="mb-10">
            <h2 id="requests" className="font-serif text-2xl font-bold text-charcoal mb-3">Appointment Requests</h2>
            <p>
              When you submit an appointment request, you provide your name, phone number, selected service,
              preferred date and time, and any optional information you choose to include. We use this
              information to handle your request and communicate about your appointment.
            </p>
            <p className="mt-4">
              Email is optional. If you include it, we send a copy of your request to that address, and a
              message if the salon confirms or cancels your appointment.
            </p>
          </section>

          <section aria-labelledby="share" className="mb-10">
            <h2 id="share" className="font-serif text-2xl font-bold text-charcoal mb-3">Information You Choose to Share</h2>
            <p>
              Please include only information needed for your appointment request. You do not need to include
              detailed medical information in the notes field.
            </p>
          </section>

          <section aria-labelledby="handling" className="mb-10">
            <h2 id="handling" className="font-serif text-2xl font-bold text-charcoal mb-3">How Requests Reach the Salon</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Requests are stored in the salon&apos;s appointment database, hosted by Supabase.</li>
              <li>
                The salon is notified by email (sent through Resend) and, where the salon has set them up, by a
                Telegram message and by notifications on staff devices. These notifications include your name,
                phone number, service, preferred time, and notes.
              </li>
              <li>If you give an email address, messages to you are sent through Resend.</li>
              <li>The website is hosted by Vercel, which processes technical request data (such as IP addresses) to serve the site.</li>
            </ul>
          </section>

          <section aria-labelledby="device" className="mb-10">
            <h2 id="device" className="font-serif text-2xl font-bold text-charcoal mb-3">On Your Device and Third-Party Content</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                While you fill in the request form, your chosen service and date are kept in your browser tab
                (session storage) so they are not lost if you move between pages. Your name, phone number,
                email and notes are not saved there.
              </li>
              <li>
                Pages with a map load it from Google Maps, and the Get Directions and review links open Google.
                Google&apos;s own privacy policy applies to those services.
              </li>
              <li>
                The website does not currently use an analytics service. If one is added, it will receive only
                non-personal page and button information — never your name, phone number, email, notes, or
                appointment details.
              </li>
            </ul>
          </section>

          <section aria-labelledby="questions">
            <h2 id="questions" className="font-serif text-2xl font-bold text-charcoal mb-3">Questions About Your Information</h2>
            <p>
              For questions about your appointment information, including requests to correct or delete it,
              contact Urmi Threading Salon at{" "}
              <a href={`tel:${BUSINESS.phoneRaw}`} className="font-semibold text-brand-purple-strong underline underline-offset-2">
                {BUSINESS.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-brand-purple-strong underline underline-offset-2 break-all">
                {BUSINESS.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
