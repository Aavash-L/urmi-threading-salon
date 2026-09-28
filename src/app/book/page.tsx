import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Booking from "@/components/sections/Booking";

export const metadata = pageMetadata("/book");

export default function BookPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Request an Appointment", url: `${SITE_URL}/book` }]} />
      <Booking headingLevel="h1" />
    </>
  );
}
