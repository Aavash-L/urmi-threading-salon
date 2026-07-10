export interface Location {
  city: string;
  slug: string;
  state: string;
  distance: string;
  driveTime: string;
  directions: string;
  intro: string;
  reasons: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  testimonialIds: string[];
}

export const LOCATIONS: Location[] = [
  {
    city: "Wayne",
    slug: "wayne-nj",
    state: "NJ",
    distance: "0 miles",
    driveTime: "We're right here",
    directions:
      "We're located at 150 Hinchman Ave, Wayne, NJ 07470 — easily accessible from Route 23 and Route 46. Free parking is available directly at our location.",
    intro:
      "Urmi Threading Salon is Wayne's most trusted beauty destination for eyebrow threading, waxing, and skin care. Located at 150 Hinchman Ave, we've been serving Wayne residents since 2010 with precision threading, gentle technique, and a commitment to clean, sanitized tools for every single client. Whether it's your first threading appointment or your hundredth, you'll be welcomed with the same warm, expert care.",
    reasons: [
      {
        title: "15+ Years in Wayne",
        description:
          "We've been part of the Wayne community since 2010. Our deep roots mean we know our clients by name — and by the brow shape that suits them best.",
      },
      {
        title: "Walk-Ins Always Welcome",
        description:
          "No appointment? No problem. We keep our schedule flowing efficiently so walk-in wait times stay minimal, typically under 15 minutes.",
      },
      {
        title: "CDC-Compliant Sanitation",
        description:
          "Every tool is sanitized between clients. We follow strict hygiene protocols so you can relax knowing your treatment is completely safe.",
      },
      {
        title: "Personalized Shaping",
        description:
          "No two faces are the same. We assess your unique bone structure and features to create an arch that enhances your natural beauty — not a template.",
      },
    ],
    faqs: [
      {
        question: "Where is Urmi Threading Salon located in Wayne?",
        answer:
          "We're at 150 Hinchman Ave, Wayne, NJ 07470. We're easy to find just off Route 23, with free parking available on-site.",
      },
      {
        question: "Do I need an appointment at the Wayne location?",
        answer:
          "No appointment needed — walk-ins are always welcome. Appointments are available for those who prefer a guaranteed time slot.",
      },
    ],
    testimonialIds: ["1", "2", "8"],
  },
  {
    city: "Paterson",
    slug: "paterson-nj",
    state: "NJ",
    distance: "5 miles",
    driveTime: "about 10–15 minutes",
    directions:
      "From Paterson, take Route 20 West toward Wayne, then merge onto Route 23 South. Take the Berdan Ave exit and follow signs to Hinchman Ave. Total drive time is approximately 10–15 minutes.",
    intro:
      "Paterson residents looking for top-quality eyebrow threading near them don't need to look far. Urmi Threading Salon in Wayne, NJ is just 10–15 minutes from Paterson — and the difference in quality is immediately apparent. Our team shapes brows with the kind of care and precision that keeps clients driving from Paterson, week after week, year after year.",
    reasons: [
      {
        title: "Short Drive, Big Difference",
        description:
          "Just 10–15 minutes from Paterson, Urmi Threading Salon offers a level of skill and consistency that makes the trip more than worth it.",
      },
      {
        title: "Familiar with Paterson Clients",
        description:
          "Many of our most loyal clients come from Paterson. We understand diverse beauty preferences and deliver results that celebrate each client's heritage and style.",
      },
      {
        title: "No Long Waits",
        description:
          "We run an efficient schedule — walk-ins are welcome and wait times are typically short, so you can fit a threading appointment into any busy day.",
      },
      {
        title: "Fair, Transparent Pricing",
        description:
          "Our pricing is honest and straightforward. Call ahead for current rates — no surprises, no upselling.",
      },
    ],
    faqs: [
      {
        question: "How far is Urmi Threading Salon from Paterson?",
        answer:
          "We're approximately 5 miles and 10–15 minutes from Paterson via Route 20 West to Route 23 South. Easy drive, free parking on arrival.",
      },
      {
        question: "Is threading better than waxing for eyebrows?",
        answer:
          "Threading offers more precision and doesn't use heat or chemicals on skin — making it the preferred choice for sensitive skin. Many Paterson clients who switched from waxing say threading gives them much cleaner, more defined results.",
      },
    ],
    testimonialIds: ["3", "5", "10"],
  },
  {
    city: "Clifton",
    slug: "clifton-nj",
    state: "NJ",
    distance: "7 miles",
    driveTime: "about 15 minutes",
    directions:
      "From Clifton, take Route 3 West to Route 46 West, then north on Route 23. Take the Alps Road exit and follow local roads to 150 Hinchman Ave. The drive typically takes 15 minutes.",
    intro:
      "For Clifton residents who take their brows seriously, the 15-minute drive to Urmi Threading Salon in Wayne is a ritual — not a chore. We've been shaping brows for Clifton clients since 2010, and those clients keep coming back because the results speak for themselves: clean lines, natural arches, and a shape that lasts 3–4 weeks without losing its definition.",
    reasons: [
      {
        title: "Consistency You Can Rely On",
        description:
          "Clifton clients rave about the consistency of our work. No matter when you come in, you leave with the same meticulous attention to shape and symmetry.",
      },
      {
        title: "Gentle on Every Skin Type",
        description:
          "We've helped countless Clifton clients with sensitive or reactive skin find a threading routine that works — no redness, no irritation.",
      },
      {
        title: "Complete Beauty Services",
        description:
          "Threading is just the beginning. Clifton clients combine eyebrow threading with waxing, tinting, or facials for a complete look in one visit.",
      },
      {
        title: "Veteran Team",
        description:
          "Our team has been perfecting the art of threading for over 15 years. That experience shows in every appointment.",
      },
    ],
    faqs: [
      {
        question: "How far is Urmi Threading Salon from Clifton, NJ?",
        answer:
          "We're about 7 miles from Clifton — a 15-minute drive via Route 3 West to Route 46 West to Route 23 North.",
      },
      {
        question: "What's the best threading salon near Clifton, NJ?",
        answer:
          "Urmi Threading Salon in Wayne is consistently rated the best in the region, with a 4.8-star Google rating from 155+ reviews. Many of those reviewers come specifically from Clifton.",
      },
    ],
    testimonialIds: ["5", "4", "9"],
  },
  {
    city: "Totowa",
    slug: "totowa-nj",
    state: "NJ",
    distance: "3 miles",
    driveTime: "about 8 minutes",
    directions:
      "From Totowa, take Totowa Road north to Route 23 North. Turn onto Hinchman Ave — we're right there. The drive from Totowa is just 8 minutes.",
    intro:
      "Totowa is one of our closest neighboring towns, and we proudly serve Totowa residents looking for exceptional eyebrow threading and beauty services. Just 8 minutes away, Urmi Threading Salon at 150 Hinchman Ave is the neighborhood beauty spot that Totowa clients call their own. With walk-ins always welcome and minimal wait times, getting beautiful brows has never been this convenient.",
    reasons: [
      {
        title: "Practically Next Door",
        description:
          "At just 3 miles from Totowa, we're closer than most Totowa residents realize. A quick 8-minute drive and you're in the chair.",
      },
      {
        title: "Walk-In Friendly",
        description:
          "We know busy schedules don't always allow for advance planning. Walk in anytime during business hours and we'll take great care of you.",
      },
      {
        title: "15+ Years of Trust",
        description:
          "Many Totowa clients have been with us since we opened in 2010. That loyalty is our greatest compliment.",
      },
      {
        title: "Clean, Safe Environment",
        description:
          "We sanitize all tools between every client. You deserve to feel completely at ease during your visit.",
      },
    ],
    faqs: [
      {
        question: "Is there a threading salon near Totowa, NJ?",
        answer:
          "Yes — Urmi Threading Salon in Wayne is just 3 miles from Totowa, about an 8-minute drive on Route 23. We welcome walk-ins from Totowa daily.",
      },
      {
        question: "What hours is Urmi Threading Salon open?",
        answer:
          "Mon–Wed: 10 AM–6 PM, Thu–Fri: 10 AM–7 PM, Saturday: 10 AM–6 PM. Closed Sunday.",
      },
    ],
    testimonialIds: ["1", "8", "10"],
  },
  {
    city: "Little Falls",
    slug: "little-falls-nj",
    state: "NJ",
    distance: "5 miles",
    driveTime: "about 10 minutes",
    directions:
      "From Little Falls, take Route 23 North toward Wayne. Take the Hinchman Ave exit. We're located at 150 Hinchman Ave on your right. Total drive time is approximately 10 minutes.",
    intro:
      "Little Falls residents have been making the short 10-minute trip to Urmi Threading Salon in Wayne for years — and once you experience the precision and care we bring to every appointment, you'll understand why. Our salon has become the go-to beauty destination for Little Falls clients who want excellent threading, waxing, and skin care without settling for less.",
    reasons: [
      {
        title: "10-Minute Drive from Little Falls",
        description:
          "We're just 5 miles via Route 23 — a quick and easy commute that fits into any break in your day.",
      },
      {
        title: "Exceptional Brow Shaping",
        description:
          "We shape each brow arch to complement your individual face structure, not follow a generic template. Your brows are unique — we treat them that way.",
      },
      {
        title: "All Services Under One Roof",
        description:
          "Threading, waxing, facials, lash extensions, tinting, and henna. Little Falls clients love being able to take care of multiple beauty needs in one visit.",
      },
      {
        title: "No-Pressure Environment",
        description:
          "We'll never push services you didn't come in for. Honest recommendations, expert execution.",
      },
    ],
    faqs: [
      {
        question: "Where can I get eyebrow threading near Little Falls, NJ?",
        answer:
          "Urmi Threading Salon in Wayne is the closest premium threading salon to Little Falls — just 5 miles and 10 minutes on Route 23.",
      },
      {
        question: "Do you offer walk-in threading appointments?",
        answer:
          "Yes, walk-ins are always welcome. Many of our Little Falls clients stop in on their way home without any advance notice.",
      },
    ],
    testimonialIds: ["2", "7", "6"],
  },
  {
    city: "Fair Lawn",
    slug: "fair-lawn-nj",
    state: "NJ",
    distance: "10 miles",
    driveTime: "about 20 minutes",
    directions:
      "From Fair Lawn, take Route 208 North to Route 23 North. Exit at Hinchman Ave and we're on your right at 150 Hinchman Ave. The drive takes approximately 20 minutes.",
    intro:
      "Fair Lawn has excellent options for beauty services, but clients who've discovered Urmi Threading Salon in Wayne keep making the 20-minute drive — because the results simply can't be matched locally. Since 2010, we've been the destination threading salon for Fair Lawn residents who know that the best brow shaping is worth the trip. Our 4.8-star Google rating, earned from 155+ real reviews, says everything.",
    reasons: [
      {
        title: "Worth Every Minute of the Drive",
        description:
          "Fair Lawn clients consistently tell us that no local salon compares to the precision and care we provide. The extra 20 minutes is well worth it.",
      },
      {
        title: "Real Results, Real Reviews",
        description:
          "4.8 stars from 155+ genuine Google reviews. We don't just promise great brows — our clients tell you about them.",
      },
      {
        title: "Natural Technique",
        description:
          "Our threading technique uses only cotton thread — no chemicals, no heat, no skin damage. Perfect for the Fair Lawn client who prioritizes skin health.",
      },
      {
        title: "Multiple Services in One Visit",
        description:
          "Make the most of your trip — combine threading with waxing, tinting, or a facial to walk out fully refreshed.",
      },
    ],
    faqs: [
      {
        question: "Is Urmi Threading Salon worth the drive from Fair Lawn?",
        answer:
          "Our Fair Lawn clients say absolutely yes. The quality of threading and the overall experience keep them coming back for years.",
      },
      {
        question: "How long does an eyebrow threading appointment take?",
        answer:
          "A standard eyebrow threading appointment takes just 10–15 minutes. Full face threading takes 20–30 minutes. You won't be waiting long.",
      },
    ],
    testimonialIds: ["9", "3", "1"],
  },
  {
    city: "Paramus",
    slug: "paramus-nj",
    state: "NJ",
    distance: "12 miles",
    driveTime: "about 20–25 minutes",
    directions:
      "From Paramus, take Route 17 North to Route 202, then connect to Route 23 North toward Wayne. Exit at Hinchman Ave and find us at 150 Hinchman Ave. The drive takes approximately 20–25 minutes.",
    intro:
      "Paramus is a hub for shopping and services — but for truly exceptional eyebrow threading, residents are heading to Urmi Threading Salon in Wayne. Just 20–25 minutes away, we offer the precision threading, relaxing ambiance, and results-driven service that sets us apart from anything you'll find closer to home. Your brows deserve the best — and that's exactly what we deliver.",
    reasons: [
      {
        title: "Premium Service, Fair Pricing",
        description:
          "Paramus clients appreciate that expert threading doesn't have to come with an inflated price tag. We believe beautiful brows should be accessible.",
      },
      {
        title: "Established Reputation",
        description:
          "15+ years in business. Thousands of satisfied clients. A 4.8-star Google rating. When you're choosing where to trust with your face, reputation matters.",
      },
      {
        title: "Efficient, Respectful of Your Time",
        description:
          "We keep appointments moving so you're never waiting long. Walk-ins are welcome and typically seen within 15 minutes.",
      },
      {
        title: "Full Beauty Menu",
        description:
          "From threading to lash extensions, facials to henna — Paramus clients can take care of their full beauty routine in one convenient trip to Wayne.",
      },
    ],
    faqs: [
      {
        question: "Where is the best threading salon near Paramus, NJ?",
        answer:
          "Urmi Threading Salon in Wayne is consistently rated the top threading salon in the region. Just 20–25 minutes from Paramus via Route 17 to Route 23.",
      },
      {
        question: "Can I book an appointment online?",
        answer:
          "Yes, you can book through our website or call us at (973) 653-9322. Walk-ins are also always welcome during business hours.",
      },
    ],
    testimonialIds: ["6", "4", "2"],
  },
];
