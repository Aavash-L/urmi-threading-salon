export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Priya M.",
    rating: 5,
    text: "I've been coming to Urmi for over 5 years and would never go anywhere else. She has a gift for shaping brows — she looks at your face and just knows what arch will suit you perfectly. Clean, quick, and always gentle.",
    service: "Eyebrow Threading",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Sara L.",
    rating: 5,
    text: "Best threading salon in Wayne by far. I walked in without an appointment and was seen within 10 minutes. My brows look incredible — perfectly symmetrical for the first time in my life. Already booked my return visit.",
    service: "Eyebrow Threading",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Divya K.",
    rating: 5,
    text: "I came for full face threading before a wedding and left feeling absolutely beautiful. The technique is so precise — she removed every bit of peach fuzz without any irritation. My skin felt smooth for weeks.",
    service: "Full Face Threading",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Maria G.",
    rating: 5,
    text: "As someone with extremely sensitive skin, I was nervous about threading. The staff explained everything and used such a gentle technique that I felt zero irritation afterward. My brows have never looked this good.",
    service: "Eyebrow Threading",
    date: "1 week ago",
  },
  {
    id: "5",
    name: "Jennifer T.",
    rating: 5,
    text: "I drive 25 minutes from Clifton specifically for Urmi's threading. I've tried other salons closer to home but nothing compares. The attention to detail and the shape she creates is unmatched in the area.",
    service: "Eyebrow Threading",
    date: "2 months ago",
  },
  {
    id: "6",
    name: "Anita R.",
    rating: 5,
    text: "The lash extensions are incredible — lightweight, natural-looking, and lasted well over 5 weeks with my aftercare routine. I've gotten so many compliments. The studio is spotless, which matters a lot to me.",
    service: "Eyelash Extensions",
    date: "3 weeks ago",
  },
  {
    id: "7",
    name: "Fatima H.",
    rating: 5,
    text: "Got henna done for Eid and it was stunning. The design was exactly what I wanted — intricate, clean lines, and the color came out so deep and rich. I'll be back for every occasion from now on.",
    service: "Henna",
    date: "1 month ago",
  },
  {
    id: "8",
    name: "Aisha B.",
    rating: 5,
    text: "I've been getting my brows and upper lip threaded here for 3 years. Consistent quality, always sanitized tools, and the wait time is minimal. Exactly what you want in a threading salon — reliable and skilled.",
    service: "Eyebrow & Face Threading",
    date: "2 weeks ago",
  },
  {
    id: "9",
    name: "Rachel P.",
    rating: 4,
    text: "Very professional and friendly. My facial was so relaxing and my skin felt amazing afterward — hydrated and glowing for days. The prices are fair for the quality. Highly recommend for anyone in the Wayne area.",
    service: "Facials",
    date: "1 month ago",
  },
  {
    id: "10",
    name: "Sonia D.",
    rating: 5,
    text: "First time getting my brows threaded and I was nervous but the experience was so calming. She shaped my brows to my face perfectly — I looked so put-together without trying. Walk-ins are truly welcome, no attitude.",
    service: "Eyebrow Threading",
    date: "3 weeks ago",
  },
];
