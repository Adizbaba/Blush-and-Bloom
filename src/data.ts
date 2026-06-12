/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, Artist, Review, QuizQuestion } from './types';
// @ts-ignore
import zaraPortrait from './assets/images/regenerated_image_1780951853920.png';
// @ts-ignore
import ellaPortrait from './assets/images/regenerated_image_1781301069900.png';

export const STUDIO_SERVICES: ServiceItem[] = [
  // Hair Styling
  {
    id: 'hs-1',
    category: 'Hair Styling',
    title: 'Signature Blowout & Style',
    price: '$95',
    duration: '45 mins',
    description: 'Our signature signature styling including luxury wash, scalp massage, and bespoke bouncy volume or sleek glossy finish.',
    features: ['Luxury double wash', 'Nourishing botanical mask', 'Custom heat protection styling', 'Volume lock-in hold']
  },
  {
    id: 'hs-2',
    category: 'Hair Styling',
    title: 'Luxe Sculpted Cut & Blow-Dry',
    price: '$165',
    duration: '60 mins',
    description: 'Bespoke sculptural haircut customized for your face shape, accompanied by deep hair therapy and professional blow-dry tailoring.',
    badge: 'Popular',
    features: ['Personalized facial shape analysis', 'Luxury botanical treatment', 'Precision cutting', 'Signature blow-out']
  },
  {
    id: 'hs-3',
    category: 'Hair Styling',
    title: 'Textured Editorial Waves',
    price: '$120',
    duration: '50 mins',
    description: 'Perfect beach-ready, high-fashion texturized waves or mermaid curls styled to last for days, complete with dry styling.',
    features: ['Dry texture prepping', 'Luxury tong texturing', 'Oil shine gloss spray', 'Humidity resistance treatment']
  },

  // Colouring
  {
    id: 'col-1',
    category: 'Colouring',
    title: 'The Signature Bondi Balayage',
    price: '$345',
    duration: '180 mins',
    description: 'Highly customized, hand-painted dimensional highlights that emulate natural, Australian and New Zealand sunkissed radiance with seamless regrowth.',
    badge: 'Trending',
    features: ['Bespoke clay-paint lighting', 'Full-tonal personalized glazing', 'Bond-building restorative treatment', 'Blow-dry finish']
  },
  {
    id: 'col-2',
    category: 'Colouring',
    title: 'Luminous Half-Head Highlights',
    price: '$240',
    duration: '120 mins',
    description: 'Focus foils mapping around your parting and hairline to lift your current tone and frame your features with boutique organic lightener.',
    features: ['High-performance low-damage lightener', 'Tonal glaze pairing', 'pH-balancing scalp wellness mist', 'Bounce restoration blow style']
  },
  {
    id: 'col-3',
    category: 'Colouring',
    title: 'Vivid Tonal Glaze & Moisture Cure',
    price: '$160',
    duration: '90 mins',
    description: 'A full-head ammonia-free refreshing color glaze, sealed in with an ultra-hydrating steam mask to restore high glossy dimension.',
    features: ['Ammonia-free organic glaze', 'Deep moisture steam therapy', 'Scalp stimulation massage', 'Sleek dry finish']
  },

  // Bridal
  {
    id: 'br-1',
    category: 'Bridal',
    title: 'The Radiant Bride Hair Plan',
    price: '$295',
    duration: '120 mins',
    description: 'Exquisite bridal coiffure, from intricate textured up-dos to cascading waves, designed to survive all-day celebrations and outdoor winds.',
    badge: 'Bridal Special',
    features: ['90-minute trial run custom tuning', 'Veil or hair-piece securing', 'All-day hold technology spray', 'Mini touch-up mist kit']
  },
  {
    id: 'br-2',
    category: 'Bridal',
    title: 'The Vogue Bridal Makeup',
    price: '$285',
    duration: '90 mins',
    description: 'Photogenic, natural-glow professional makeup style tailored for photography and high-definition filming, featuring elite luxury finishes.',
    features: ['Detailed skin prepping hydrate therapy', 'Individual silk lash design', 'Hydration sealing lock setting', 'Essential touch-up sponge & lip vial']
  },
  {
    id: 'br-3',
    category: 'Bridal',
    title: 'Ultimate Garden Party Bridal Package',
    price: '$540',
    duration: '210 mins',
    description: 'The ultimate coordinated hair styling and flawless longwear makeup experience for the modern, luxurious Australian and New Zealand bride.',
    badge: 'Best Value',
    features: ['Bridal consultation & complete trial', 'Luxury face & neck contour sculpting', 'Custom bridal hair design & volume prep', 'Deluxe organic champagne gift set']
  },

  // Event Makeup
  {
    id: 'em-1',
    category: 'Event Makeup',
    title: 'The Trans-Tasman Red-Carpet Glow',
    price: '$170',
    duration: '60 mins',
    description: 'Luminous, customized event makeup focusing on gorgeous dewy skin, custom soft contouring, and striking soft-smudge eyes.',
    badge: 'Bestseller',
    features: ['Hyaluronic hydration glow base', 'Flawless customized foundation', 'Mink/Silk light lash clusters', 'Precision lip styling']
  },
  {
    id: 'em-2',
    category: 'Event Makeup',
    title: 'Chic Barely-There Natural Beauty',
    price: '$140',
    duration: '50 mins',
    description: 'Effortless, radiant, sunkissed makeup that mimics the glow of Australian and New Zealand summer while highlighting your natural contours.',
    features: ['Dewy skin fluid prep', 'Feathered soft brow sculpt', 'Soft earthy tonal sweep', 'Cream cheek flush blend']
  },

  // Beauty Treatments
  {
    id: 'bt-1',
    category: 'Beauty Treatments',
    title: 'Bespoke Keratin Lash Lift & Tint',
    price: '$120',
    duration: '50 mins',
    description: 'A transformative botanical lift that gently curls your natural lashes from root-to-tip, with dark keratin infusion coating.',
    features: ['Keratin deep reinforcement', 'Custom silicone shield scaling', 'Intense black mineral tint', 'Conditioning oil coat']
  },
  {
    id: 'bt-2',
    category: 'Beauty Treatments',
    title: 'Glow-Up Sculpture Face Lifting Massage',
    price: '$195',
    duration: '75 mins',
    description: 'A deeply revitalising facial lifting treatment using gua-sha, lymphatic drainage, and high-performance hydration serums.',
    badge: 'Highly Requested',
    features: ['Double cold-pressed botanical wash', 'Gua-sha contour stimulation', 'Active peptide oxygen infusion', 'Chilled rose quartz rolling']
  }
];

export const STUDIO_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'Chloe Mitchell',
    role: 'Creative Director & Color Specialist',
    bio: 'With over 12 years designing dimensional color across Sydney and London art scenes, Chloe is our absolute Queen of Balayage. She is known for creating customized sunkissed beach-blonde tones that grow out seamlessly and maintain robust, healthy shine.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    specialties: ['French Balayage', 'Precision Razor Cutting', 'Vivid Tone Correction'],
    rating: 5.0
  },
  {
    id: 'art-2',
    name: 'Ella Johnson',
    role: 'Lead Bridal & Event Makeup Artist',
    bio: 'Ella is a true skin magician who spent years styling runway looks for prestigious Trans-Tasman Fashion Weeks. Her signature "high-end glass skin" look has graced prestigious magazines. She believes in amplifying a woman\'s natural symmetry rather than masking it.',
    image: ellaPortrait,
    specialties: ['Airbrush Glow', 'Custom Eyelash Framing', 'Editorial Styling'],
    rating: 4.9
  },
  {
    id: 'art-3',
    name: 'Jessica Sclafani',
    role: 'Senior Hair Artist & bridal Coiffeur',
    bio: 'Jessica brings high-energy luxury styling to every client. Her background in theatrical design and high-society bridal events makes her the master of spectacular up-dos, textured bridal waves, and luxurious hand-tied extensions.',
    image: zaraPortrait,
    specialties: ['Editorial Bridal Up-dos', 'Seamless Extensions', 'Thick Hair Restyling'],
    rating: 5.0
  }
];

export const CLIENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Isabella Henderson',
    stars: 5,
    date: 'May 28, 2026',
    text: 'I booked the Bondi Balayage with Chloe, and it is hands down the best colour I have ever had! The transition looks completely natural, and my hair feels healthier than it did before. The studio vibe is gorgeous, absolute luxury.',
    service: 'The Signature Bondi Balayage'
  },
  {
    id: 'rev-2',
    author: 'Genevieve Wright',
    stars: 5,
    date: 'June 01, 2026',
    text: 'Ella did my wedding makeup alongside Jessica styling my bridal hair, and they were incredible! My makeup survived tears, laughter, and humid weather beautifully. Every single guest complimented the look!',
    service: 'Ultimate Garden Party Bridal Package'
  },
  {
    id: 'rev-3',
    author: 'Matilda Clarke',
    stars: 5,
    date: 'June 03, 2026',
    text: 'The signature wash, head massage & blowout is literally heavenly. You get greeted with herbal tea, beautiful aromatherapy, and the staff are extremely professional. This is my absolute favorite fortnightly ritual now.',
    service: 'Signature Blowout & Style'
  }
];

export const CONSULTATION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "What glamorous experience are you looking for today?",
    options: [
      { text: "Bespoke Hair Colouring", value: "colouring", description: "Luminous foils, multi-dimensional balayage, or deep tonal glazes." },
      { text: "Professional Styling & Cut", value: "styling", description: "Precision sculptural cuts, luxury blowout, or sleek texturised waves." },
      { text: "Bridal Styling for the Big Day", value: "bridal", description: "Trials or complete wedding day hair and photographic makeup plans." },
      { text: "Flawless Event Makeup", value: "makeup", description: "Red-carpet glow, airbrush finishes, or minimal radiant bare-skin beauty." }
    ]
  },
  {
    id: 2,
    question: "How would you describe your style vibe?",
    options: [
      { text: "Effortless & Barely-There", value: "natural", description: "Sunkissed Australian and New Zealand beauty, soft contours, dewy radiant skin." },
      { text: "Sleek, High-Fashion & Bold", value: "bold", description: "Editorial textures, rich contrasts, sharp architectural elements." },
      { text: "Classic, Timeless Elegance", value: "classic", description: "Intricate up-dos, structured luxury cuts, balanced polished makeup." },
      { text: "Romantic, Soft & Whimsical", value: "romantic", description: "Cascading waves, textured braid accents, warm peach and coral tones." }
    ]
  },
  {
    id: 3,
    question: "Identify your priority skin or hair goal:",
    options: [
      { text: "Insane Luminous Radiance & Hydration", value: "glow", description: "Lifting dull skin or nourishing dry locks with active peptides." },
      { text: "High Volume, Texture, and Hold", value: "volume", description: "Bouncy blowouts and styling designed to last all weekend." },
      { text: "Perfect Seamless Blending", value: "blend", description: "Balayage and highlights that grow out elegantly with low maintenance." },
      { text: "All-Day Durability with Zero Smudge", value: "durable", description: "High-performance bridal and event styling that resists sweat and wind." }
    ]
  }
];
