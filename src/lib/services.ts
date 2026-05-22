export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  whatToExpect: string[];
  faqs: { question: string; answer: string }[];
  icon: string;
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    slug: "eyebrow-threading",
    shortDescription:
      "Precision shaping with cotton thread — clean lines, natural arches.",
    description:
      "Our signature eyebrow threading service uses 100% cotton thread to remove unwanted hair with surgical precision. Unlike waxing, threading lifts hair directly from the follicle without touching the skin with hot wax — making it ideal for all skin types including sensitive and acne-prone skin.",
    benefits: [
      "No chemicals or heat applied to skin",
      "Precise hair-by-hair removal",
      "Lasts 3–4 weeks",
      "Safe for all skin types including sensitive skin",
      "Defines natural brow arch to complement your face shape",
    ],
    whatToExpect: [
      "Consultation on your desired brow shape",
      "Gentle cleansing of the brow area",
      "Expert threading along the natural arch",
      "Tweezing for any stray hairs",
      "Finishing touch with soothing aloe",
    ],
    faqs: [
      {
        question: "How long does eyebrow threading take?",
        answer:
          "A full eyebrow threading session typically takes 10–15 minutes. We work efficiently so your wait time stays minimal.",
      },
      {
        question: "How often should I get eyebrows threaded?",
        answer:
          "Most clients return every 3–4 weeks. Hair grows back finer over time with regular threading, making each session easier.",
      },
    ],
    icon: "Sparkles",
    keywords: [
      "eyebrow threading Wayne NJ",
      "eyebrow threading near me",
      "best eyebrow threading Wayne NJ",
    ],
  },
  {
    id: "face-threading",
    name: "Full Face Threading",
    slug: "face-threading",
    shortDescription:
      "Upper lip, chin, sides, and forehead — complete facial hair removal.",
    description:
      "Full face threading addresses every area where unwanted facial hair appears — upper lip, chin, sides (cheeks), and forehead. We remove peach fuzz and coarser hairs with the same gentle threading technique, leaving skin smooth and luminous without any chemical irritation.",
    benefits: [
      "Complete facial hair removal in one visit",
      "No wax residue or chemical exposure",
      "Smooths skin texture and brightens complexion",
      "Results visible immediately",
      "Gentle enough for post-facial skin",
    ],
    whatToExpect: [
      "Brief skin assessment to identify all treatment areas",
      "Threading each area systematically for thoroughness",
      "Cool aloe application to soothe treated skin",
      "Aftercare advice tailored to your skin type",
    ],
    faqs: [
      {
        question: "Is full face threading painful?",
        answer:
          "There is mild discomfort, especially on the upper lip — but most clients find it very tolerable. The sensation is brief and fades immediately. First-timers often say it's much gentler than they expected.",
      },
      {
        question: "Can I wear makeup after face threading?",
        answer:
          "We recommend waiting at least 2 hours before applying makeup to allow the follicles to close. Mineral powder is safest if you must apply something sooner.",
      },
    ],
    icon: "User",
    keywords: [
      "face threading Wayne NJ",
      "upper lip threading Wayne NJ",
      "facial hair threading near me",
    ],
  },
  {
    id: "waxing",
    name: "Body Waxing",
    slug: "waxing",
    shortDescription:
      "Smooth, long-lasting hair removal for arms, legs, and more.",
    description:
      "Our body waxing services use premium, low-temperature wax formulas that adhere to hair — not skin — for a gentler, more effective treatment. From underarms and arms to legs and bikini line, we deliver consistently smooth results that last 3–6 weeks.",
    benefits: [
      "Hair-free results lasting 3–6 weeks",
      "Hair grows back softer and finer over time",
      "Exfoliates dead skin cells simultaneously",
      "Quick treatment times",
      "Premium wax formulas for sensitive skin",
    ],
    whatToExpect: [
      "Area cleansed and prepped with pre-wax oil",
      "Wax applied in direction of hair growth",
      "Quick removal strip against hair growth",
      "Post-wax soothing lotion applied",
      "Tweezers used for any remaining hairs",
    ],
    faqs: [
      {
        question: "How long does my hair need to be for waxing?",
        answer:
          "Hair should be at least ¼ inch (about the length of a grain of rice) for best wax adhesion. We recommend not shaving for at least 2–3 weeks prior.",
      },
      {
        question: "Should I exfoliate before waxing?",
        answer:
          "Gentle exfoliation 24–48 hours before your appointment helps prevent ingrown hairs, but avoid harsh scrubs or retinol in the 48 hours immediately before your session.",
      },
    ],
    icon: "Zap",
    keywords: [
      "waxing Wayne NJ",
      "body waxing near me",
      "leg waxing Wayne NJ",
    ],
  },
  {
    id: "facials",
    name: "Facials",
    slug: "facials",
    shortDescription:
      "Customized facials to cleanse, hydrate, and restore your glow.",
    description:
      "Our customized facials go beyond the surface. Each treatment begins with a thorough skin analysis so we can select the right cleansers, masks, and serums for your specific skin type — whether you're dealing with dryness, oiliness, breakouts, or dullness.",
    benefits: [
      "Deep cleansing removes impurities and excess oil",
      "Hydration boost for dry and dehydrated skin",
      "Promotes cell turnover for brighter complexion",
      "Reduces appearance of pores",
      "Relaxing, stress-relieving experience",
    ],
    whatToExpect: [
      "Skin analysis and consultation",
      "Double cleanse to remove makeup and impurities",
      "Steam to open pores",
      "Gentle extractions if needed",
      "Custom mask application and massage",
      "Serum and moisturizer tailored to your skin",
    ],
    faqs: [
      {
        question: "How often should I get a facial?",
        answer:
          "For maintenance and visible results, we recommend a facial every 4–6 weeks, which aligns with your skin's natural renewal cycle.",
      },
      {
        question: "What facial is best for acne-prone skin?",
        answer:
          "A deep-cleansing facial with gentle extractions and a clay mask works best. We tailor every facial to your current skin condition.",
      },
    ],
    icon: "Heart",
    keywords: [
      "facial Wayne NJ",
      "facial near me",
      "skin care salon Wayne NJ",
    ],
  },
  {
    id: "eyelash-extensions",
    name: "Eyelash Extensions",
    slug: "eyelash-extensions",
    shortDescription:
      "Volume, length, and curl — lashes that wake up beautiful every day.",
    description:
      "Wake up every morning with full, gorgeous lashes. Our lash extension service applies individual synthetic lashes to each natural lash using a medical-grade adhesive, creating a natural or dramatic look that lasts 4–6 weeks with proper care.",
    benefits: [
      "Wake up with perfect lashes — no mascara needed",
      "Fully customizable length, curl, and volume",
      "Lightweight and comfortable to wear",
      "Lasts 4–6 weeks with proper care",
      "Safe for sensitive eyes with hypoallergenic options",
    ],
    whatToExpect: [
      "Consultation on your desired style (natural, cat-eye, volume)",
      "Under-eye pads and tape applied for comfort",
      "Individual lashes bonded one-by-one to natural lashes",
      "60–90 minute application for full set",
      "Aftercare instructions provided",
    ],
    faqs: [
      {
        question: "How do I care for lash extensions?",
        answer:
          "Avoid water for the first 24–48 hours, sleep on your back when possible, brush daily with a clean spoolie, and avoid oil-based products near the eyes.",
      },
      {
        question: "Will lash extensions damage my natural lashes?",
        answer:
          "When applied correctly by a trained professional, lash extensions do not damage natural lashes. We match extension weight to the natural lash for safe, comfortable wear.",
      },
    ],
    icon: "Eye",
    keywords: [
      "eyelash extensions Wayne NJ",
      "lash extensions near me",
      "lash salon Wayne NJ",
    ],
  },
  {
    id: "henna",
    name: "Henna",
    slug: "henna",
    shortDescription:
      "Traditional henna art for celebrations, events, and everyday beauty.",
    description:
      "Henna is a time-honored tradition from South Asia and the Middle East, now embraced worldwide for its natural beauty and cultural significance. We use 100% natural henna paste — no black henna or chemical additives — to create intricate, long-lasting designs for weddings, festivals, and everyday occasions.",
    benefits: [
      "100% natural ingredients, no chemicals",
      "Designs last 1–3 weeks",
      "Painless, relaxing application",
      "Perfect for weddings, Eid, Diwali, and other celebrations",
      "Customizable designs from simple to intricate",
    ],
    whatToExpect: [
      "Consultation on design style and placement",
      "Skin cleaned and dried thoroughly",
      "Henna paste applied with precision cone",
      "Drying time of 30–60 minutes (paste stays on)",
      "Aftercare instructions to maximize color depth",
    ],
    faqs: [
      {
        question: "How long does henna last?",
        answer:
          "Henna typically lasts 1–3 weeks depending on placement and how well you care for it. Hands and feet, where skin is thicker, tend to hold color longest.",
      },
      {
        question: "Is henna safe during pregnancy?",
        answer:
          "Natural henna is generally considered safe during pregnancy. However, avoid black henna, which contains PPD, a chemical that can cause severe reactions. Always confirm with your healthcare provider.",
      },
    ],
    icon: "Palette",
    keywords: [
      "henna Wayne NJ",
      "henna artist near me",
      "mehndi Wayne NJ",
    ],
  },
  {
    id: "tinting",
    name: "Lash & Brow Tinting",
    slug: "tinting",
    shortDescription:
      "Darker, fuller-looking lashes and brows — no mascara or brow pencil needed.",
    description:
      "Tinting uses a semi-permanent dye to enhance the natural color and fullness of your brows and lashes. It's the perfect low-maintenance solution for people with light, sparse, or uneven brows who want defined results that last 4–6 weeks.",
    benefits: [
      "Defined brows and lashes without daily makeup",
      "Results last 4–6 weeks",
      "Makes sparse brows appear fuller",
      "Quick 30–45 minute treatment",
      "Multiple shade options to match your hair and skin tone",
    ],
    whatToExpect: [
      "Shade consultation to find your perfect match",
      "Protective barrier applied around the treatment area",
      "Tint mixed and applied carefully",
      "Processing time of 10–15 minutes",
      "Tint removed and results revealed",
    ],
    faqs: [
      {
        question: "Is brow tinting safe for sensitive skin?",
        answer:
          "We perform a patch test prior to your first tinting session to ensure no adverse reaction. Most clients with sensitive skin tolerate tinting very well.",
      },
      {
        question: "Can I combine tinting with threading?",
        answer:
          "Yes — threading and tinting are often done together. We typically thread first to define the shape, then tint to enhance color. The combination takes under 45 minutes.",
      },
    ],
    icon: "Brush",
    keywords: [
      "brow tinting Wayne NJ",
      "lash tinting near me",
      "eyebrow tinting Wayne NJ",
    ],
  },
];
