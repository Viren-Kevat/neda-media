import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { animate, useInView, motion, useMotionValue, useAnimationFrame, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { CircularTestimonials } from "./components/ui/circular-testimonials.jsx";

const CALENDLY = "https://calendly.com/neriahtellerup/30-minutes";
const INSTAGRAM_PROFILE = "https://www.instagram.com/nedamedia.cph/";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/neriah-tellerup-andersen-59baab202/";
const proofOfWorkImages = [
  
  "proof-work2.jpg",
  "proof-work3.jpg",
  "proof-work4.jpg",
  "proof-work5.jpg",
  "proof-work6.jpg",
  "proof-work7.jpg",
  "proof-work8.jpg",
  "proof-work9.jpg",
  "proof-work10.jpg",
  "proof-work11.jpg",
];

const clients = [
  ["fame.png", "Fame"],
  ["woiga.png", "Woiga"],
  ["Train.png", "Train"],
  ["jentle.png", "Jentle"],
  ["fitness.png", "Fitness"],
  ["reformer.png", "Reformer"],
  ["job-indu.png", "Job Indu"],
  ["streex.png", "Streex"],
  ["shapeit.png", "Shapeit"]
];

const LOCALE_STORAGE_KEY = "neda-locale";

const faqsEn = [
  [
    "What do your services cost?",
    "Pricing depends on your needs and ambitions. We create tailored packages for performance marketing and social media management."
  ],
  [
    "How quickly can we see results?",
    "Most clients see early results within 2-4 weeks. Paid marketing can move quickly, while organic social media typically takes 2-3 months to build momentum."
  ],
  [
    "Which platforms do you work with?",
    "We specialize in Meta, Google Ads, TikTok and LinkedIn. We choose platforms based on where your audience is and where we can create the strongest impact."
  ],
  [
    "Do your agreements have a lock-in period?",
    "Our collaborations typically start with a 3-month minimum so there is enough time to build and optimize, then continue month to month."
  ],
  [
    "What makes you different from other agencies?",
    "We combine authentic human content with hard data and continuous optimization. We are a boutique team that truly gets to know your brand."
  ],
  [
    "How does a strategy call work?",
    "We review your current setup, goals and biggest growth opportunities. After the call, you get a clear direction for the next step."
  ]
];

const faqsDa = [
  [
    "Hvad koster jeres ydelser?",
    "Prisen afhænger af jeres behov og ambitioner. Vi skræddersyr løsninger inden for performance marketing og social media management."
  ],
  [
    "Hvor hurtigt kan vi se resultater?",
    "De fleste kunder ser tidlige resultater inden for 2–4 uger. Betalt marketing kan gå hurtigt, mens organisk sociale medier typisk kræver 2–3 måneder for at bygge fart på."
  ],
  [
    "Hvilke platforme arbejder I med?",
    "Vi er specialiserede i Meta, Google Ads, TikTok og LinkedIn. Vi vælger platforme ud fra, hvor jeres målgruppe er, og hvor vi kan skabe størst effekt."
  ],
  [
    "Er der binding på jeres aftaler?",
    "Vores samarbejder starter typisk med minimum tre måneder, så der er tid til at bygge og optimere. Derefter fortsætter vi måned for måned."
  ],
  [
    "Hvad gør jer anderledes end andre bureauer?",
    "Vi kombinerer ægte menneskeligt indhold med hårde data og løbende optimering. Vi er et lille, dedikeret team, der virkelig lærer jeres brand at kende."
  ],
  [
    "Hvordan foregår et strategimøde?",
    "Vi gennemgår jeres nuværende setup, mål og største vækstmuligheder. Efter mødet får I en klar retning for næste skridt."
  ]
];

const performanceDataEn = {
  slug: "performance-marketing",
  image: "/images/neriah-desk.png",
  label: "Services",
  title: "Performance Marketing",
  subtitle:
    "Data-driven advertising that transforms your business. From strategy to scaling, we handle it all.",
  philosophy:
    "We do not believe in throwing money at ads and hoping for the best. Our approach is systematic, creative and 100% data-driven. Every krone of ad spend should work harder than the last.",
  offerTitle: "Everything you need to scale",
 pillars: [
  {
    title: "Social Ads",
    text: "More revenue from Facebook and Instagram not more spend. You get profitable campaigns that scale, with creative that converts and targeting that finds your best customers.",
    points: [
      "Higher ROAS, lower cost per acquisition",
      "Scroll-stopping creatives that convert",
      "Your ideal customer, found and re-engaged",
      "Lookalike audiences that expand profitably",
      "Ad spend that goes further every week"
    ]
  },
  {
    title: "Google Ads",
    text: "Show up exactly when buyers are ready. You get sales-ready traffic from people already searching for what you sell no wasted clicks, no guesswork.",
    points: [
      "Top placement when purchase intent is highest",
      "Shopping ads that outsell the competition",
      "Keywords that bring buyers, not browsers",
      "Every conversion traced back to its source",
      "Landing pages and ads that keep improving"
    ]
  },
  {
    title: "Your Data Layer",
    text: "Know exactly what's making you money. You get a clear, reliable picture of every sale, every source, and every decision so nothing is wasted.",
    points: [
      "Accurate data you can actually trust",
      "Full visibility across every channel",
      "Sales tracked even without cookies",
      "One dashboard showing what matters",
      "Know which ad made you money, always"
    ]
  }
],
  processTitle: "How we work",
  process: [
    ["01", "Analysis & audit", "We dive into your current setup, analyze data and identify the biggest growth opportunities.", "/images/process-audit.png"],
    ["02", "Strategy & setup", "We build campaign structure, tracking and creatives so everything is ready before we spend.", "/images/process-creative.png"],
    ["03", "Launch & optimization", "We launch and optimize daily based on data, creative tests, audiences and bidding strategies.", "/images/process-setup.png"],
    ["04", "Reporting & scaling", "You receive transparent reports, and when we find winners, we scale aggressively.", "/images/process-scaling.png"]
  ],
  ctaTitle: "Ready to maximize your ad budget?",
  ctaText:
    "Book a free strategy call and get a concrete plan for how we can scale your business with performance marketing."
};

const performanceDataDa = {
  slug: "performance-marketing",
  image: "/images/neriah-desk.png",
  label: "Ydelser",
  title: "Performance marketing",
  subtitle:
    "Data-drevet annoncering, der transformerer jeres forretning. Fra strategi til skalering vi håndterer det hele.",
  philosophy:
    "Vi tror ikke på at brænde penge af på annoncer og håbe på det bedste. Vores tilgang er systematisk, kreativ og 100 % data-drevet. Hver krone i annoncebudgettet skal performe bedre end den sidste.",
  offerTitle: "Alt hvad I skal bruge for at skalere",
pillars: [
  {
    title: "Social Ads",
    text: "Mere omsætning fra Facebook og Instagram  ikke mere forbrug. I får profitable kampagner der skalerer, med kreativer der konverterer og målretning der finder jeres bedste kunder.",
    points: [
      "Højere ROAS, lavere omkostning per køb",
      "Kreativer der stopper scrollet og konverterer",
      "Jeres ideelle kunde  fundet og genaktiveret",
      "Lookalike-målgrupper der vokser profitabelt",
      "Annoncekroner der rækker længere hver uge"
    ]
  },
  {
    title: "Search Ads",
    text: "Vis jer præcis når købere er klar. I får salgsklart trafik fra folk der allerede søger efter det I sælger  ingen spildte klik, ingen gætværk.",
    points: [
      "Topplacering når købsintentionen er højest",
      "Shopping-annoncer der slår konkurrenterne",
      "Keywords der tiltrækker købere, ikke browsere",
      "Hver konvertering sporet tilbage til kilden",
      "Landingssider og annoncer der bliver bedre løbende"
    ]
  },
  {
    title: "Dit datalag",
    text: "Ved præcis hvad der tjener jer penge. I får et klart, pålideligt billede af hvert salg, hver kilde og hver beslutning  så intet går til spilde.",
    points: [
      "Præcise data I faktisk kan stole på",
      "Fuld synlighed på tværs af alle kanaler",
      "Salg sporet selv uden cookies",
      "Ét dashboard der viser det der betyder noget",
      "Ved altid hvilken annonce der tjente jer penge"
    ]
  }
],
  processTitle: "Sådan arbejder vi",
  process: [
    ["01", "Analyse og audit", "Vi dykker ned i jeres nuværende setup, analyserer data og finder de største vækstmuligheder.", "/images/process-audit.png"],
    ["02", "Strategi og setup", "Vi bygger kampagnestruktur, tracking og kreativer, så alt er klar, før vi spender.", "/images/process-creative.png"],
    ["03", "Launch og optimering", "Vi launcher og optimerer dagligt ud fra data, kreative tests, målgrupper og budstrategier.", "/images/process-setup.png"],
    ["04", "Rapportering og skalering", "I får transparente rapporter, og når vi finder vindere, skalerer vi aggressivt.", "/images/process-scaling.png"]
  ],
  ctaTitle: "Klar til at få mest muligt ud af jeres annoncebudget?",
  ctaText:
    "Book et gratis strategimøde og få en konkret plan for, hvordan vi kan skalere jeres forretning med performance marketing."
};

const socialDataEn = {
  slug: "social-media",
  image: "/images/neriah-outdoor.jpeg",
  label: "Services",
  title: "Content That Builds Brands",
  subtitle:
    "A brand people follow, trust and buy from. We turn your social media into your strongest sales channel  with content that feels real and results you can measure.",
  philosophy:
    "Your social media is your brand voice. We create content that feels real, engages your community and turns followers into customers without feeling like advertising.",
  offerTitle: "Your complete social media setup",
  pillars: [
    {
      title: "Content strategy",
      text: "We develop a tailored content strategy based on your brand, audience and business goals."
    },
    {
      title: "Content production",
      text: "Professional photo and video production focused on authentic, human content that performs on every platform."
    },
    {
      title: "Community management",
      text: "We engage your followers, reply to comments and DMs, and build an active community that loves your brand."
    },
    {
      title: "Analysis & reporting",
      text: "Monthly reporting with the metrics that matter most, so you always know what works."
    }
  ],
  platformsLabel: "Platforms",
  platformsTitle: "We master every channel",
  platforms: [
    ["Instagram", "Feed posts, Reels, Stories and guides that stop the scroll and drive engagement.", ["Feed aesthetics & grid planning", "Reels production", "Story templates", "Hashtag strategy"]],
    ["Facebook", "Organic content and community building that activates your existing followers.", ["Engaging posts & video", "Groups management", "Event promotion", "Community engagement"]],
    ["TikTok", "Authentic, entertaining content that reaches Gen Z and Millennials.", ["Trend-based content", "UGC-style videos", "Influencer collaborations", "Community engagement"]],
    // ["LinkedIn", "Professional thought leadership content that positions you as experts.", ["Thought leadership posts", "Employer branding", "Industry insights", "Network engagement"]]
  ],
  processTitle: "From strategy to content",
  process: [
    ["01", "Brand deep dive", "We get to know your brand, values and audience in depth."],
    ["02", "Strategy & planning", "We develop themes, formats and posting cadence in a clear content calendar."],
    ["03", "Production & publishing", "We produce content, write copy and publish according to the plan."],
    ["04", "Analysis & optimization", "We track results, identify top performers and adjust the strategy over time."]
  ],
  ctaTitle: "Ready to build your brand online?",
  ctaText:
    "Book a free strategy call and let us discuss how we can take your social media to the next level."
};

const socialDataDa = {
  slug: "social-media",
  image: "/images/neriah-outdoor.jpeg",
  label: "Ydelser",
  title: "Indhold der bygger brands",
  subtitle:
    "Ægte indhold, der bygger jeres brand. Fra strategi til eksekvering skaber vi jeres digitale tilstedeværelse.",
  philosophy:
    "Jeres sociale medier er jeres brandstemme. Vi skaber indhold, der føles ægte, engagerer jeres community og forvandler følgere til kunder uden at føles som reklame.",
  offerTitle: "Jeres komplette setup til sociale medier",
  pillars: [
    {
      title: "Indholdsstrategi",
      text: "Vi udvikler en skræddersyet indholdsstrategi baseret på jeres brand, målgruppe og forretningsmål."
    },
    {
      title: "Indholdsproduktion",
      text: "Professionel foto- og videoproduktion med fokus på autentisk, menneskeligt indhold, der performer på alle platforme."
    },
    {
      title: "Community management",
      text: "Vi engagerer jeres følgere, svarer på kommentarer og beskeder og bygger et aktivt fællesskab, der elsker jeres brand."
    },
    {
      title: "Analyse og rapportering",
      text: "Månedlig rapportering med de vigtigste KPI'er, så I altid ved, hvad der virker."
    }
  ],
  platformsLabel: "Platforme",
  platformsTitle: "Vi mestrer alle kanaler",
  platforms: [
    ["Instagram", "Feed, Reels, Stories og guides, der stopper scroll og skaber engagement.", ["Feed æstetik og grid-planlægning", "Reels-produktion", "Story-skabeloner", "Hashtag-strategi"]],
    ["Facebook", "Organisk indhold og community, der aktiverer jeres eksisterende følgere.", ["Engagerende opslag og video", "Gruppeadministration", "Eventpromovering", "Community engagement"]],
    ["TikTok", "Underholdende, autentisk indhold, der rammer Gen Z og millennials.", ["Trendbaseret indhold", "UGC-lignende videoer", "Influencer-samarbejder", "Community engagement"]],
    // ["LinkedIn", "Professionelt thought leadership-indhold, der positionerer jer som eksperter.", ["Thought leadership-opslag", "Employer branding", "Indsigter fra branchen", "Netværksengagement"]]
  ],
  processTitle: "Fra strategi til indhold",
  process: [
    ["01", "Brand deep dive", "Vi lærer jeres brand, værdier og målgruppe at kende i dybden."],
    ["02", "Strategi og planlægning", "Vi udvikler temaer, formater og publiceringskadence i en tydelig contentkalender."],
    ["03", "Produktion og publicering", "Vi producerer indhold, skriver tekster og publicerer efter planen."],
    ["04", "Analyse og optimering", "Vi følger resultaterne, finder topperformers og tilpasser strategien over tid."]
  ],
  ctaTitle: "Klar til at bygge jeres brand online?",
  ctaText:
    "Book et gratis strategimøde, og lad os tale om, hvordan vi kan løfte jeres sociale medier til næste niveau."
};

const translationsEn = {
  nav: {
    about: "About",
    services: "Services",
    performance: "Performance Marketing",
    social: "Social Media",
    meeting: "Book a meeting",
    menu: "Menu",
    mobileAds: "Ads",
    mobileSocial: "Social",
    mobileCall: "Call",
    langSwitcher: "Language",
    mobileNavLabel: "Mobile navigation"
  },
  home: {
    heroLabel: "Performance Marketing Agency",
    heroTitle: "We create growth",
    heroAccent: "you can feel",
    heroSubtitle: "Performance marketing & social media management for ambitious brands in Scandinavia",
    strategy: "Book Strategy Call",
    results: "Our Results",
    explore: "Explore",
    clients: "Selected Clients",
    clientsTitle: "Brands we have worked with",
    brandStory:
      "Neda Media is not just another marketing agency. We are your strategic growth partner, focused on authentic human content that builds trust and performance-driven advertising that delivers measurable results.",
    rolesTitle: "We're not just an agency.",
    rolesIntro: "We step in as the team that spots opportunities, solves problems and makes content perform.",
    roles: ["Your strategist", "Your growth partner", "Your creative director", "Your problem solver", "Your trend spotter", "Your video editor"],
    servicesLabel: "Services",
    servicesTitle: "What we do best",
    readMore: "Read More",
    casesLabel: "Cases",
    casesTitle: "Results that speak for themselves",
    caseType: "Performance Marketing Case",
    caseTitle: "From unprofitable webshop to 5X profit growth",
    caseText:
      "Shapeit.dk came to us with a webshop that was not performing. Through strategic Meta Ads, creative content production and data-driven optimization, we transformed their business in only 365 days.",
    caseMetrics: [
      ["500%", "Profit growth"],
      ["365", "Timeline"],
      ["12X", "ROAS"]
    ],
    getResults: "Get Similar Results",
    stats: ["Happy Clients", "DKK Ad Spend Managed", "Average ROAS", "Avg. Engagement Growth"],
    aboutLabel: "About Neda Media",
    aboutTitle: "Neriah Tellerup Andersen",
    aboutRole: "Founder & Marketing Specialist",
    aboutText1:
      "With a passion for authentic marketing and data-driven results, I founded Neda Media to help ambitious brands grow. I believe the best results come from real, human content.",
    aboutText2:
      "My approach combines creative storytelling with hard performance data. The result? Brands that look great and deliver on the bottom line.",
    bookTalk: "Book a Call",
    proofLabel: "Work in action",
proofTitle: "Inside the NEDA Media production process",
proofText: "A behind the scenes look at the visuals, video shoots, and content built under the NEDA Media brand from concept to camera-ready.",

    proofProfile: "See more on Instagram",
    testimonialsLabel: "Testimonials",
    testimonialsTitle: "What our clients say",
    faqLabel: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqIntro:
      "Find answers to the most important questions about collaboration, pricing, platforms and how we build growth.",
    ctaTitle: "Ready to scale your business?",
    ctaText:
      "Book a free strategy call and let us show you exactly how Neda Media can help you grow through performance marketing and social media.",
    carouselTestimonials: [
      {
    name: "Anders",
    designation: "Client",
    quote: "I have worked with Neriah for many years. She is dedicated, skilled and always goes the extra mile to ensure results. Highest recommendation."
  },
  {
    name: "Rie Møller",
    designation: "Client",
    quote: "Neriah is an incredibly dedicated, ambitious and talented young woman. Her ability to quickly understand our needs made the collaboration effective from day one."
  },
  {
    name: "Malene",
    designation: "Client",
    quote: "I have had the pleasure of working with Neriah, now Nedamedia, across several projects. She is thorough, creative and highly performance-focused."
  }
    ]
  },
  services: [
    [
      "01",
      "Performance Marketing",
      "Strategic Meta & Google advertising that converts. We build scalable systems for leads, sales and growth, powered by data and creativity."
    ],
    [
      "02",
      "Content That Builds Brands",
      "Content strategy, production and community management that builds your brand. Authentic storytelling that engages and creates loyal followers."
    ]
  ],
  faq: faqsEn,
  servicePages: {
    performance: performanceDataEn,
    social: socialDataEn
  },
  about: {
    title: "We are Neda Media.",
    accent: "Your growth team.",
    subtitle:
      'We were founded from a frustration with "fluffy" marketing without bottom-line responsibility. We are not a traditional agency. We are an agile team of specialists in performance and creativity.',
    meeting: "Book a no-obligation meeting",
    articles: "See our articles",
    missionLabel: "Mission",
    mission:
      "Our mission is to bridge ambitious brands and their audiences through authentic, results-driven marketing. We only win when our clients win.",
    members: [
      ["Neriah", "Founder & Head of Strategy", "I started my own webshop when I was 11. That project taught me the value of real online marketing and sparked my drive to help ambitious brands grow."],
      ["Cecilie", "Paid & organic junior specialist", "My name is Cecilie Heinrichsen, and I am passionate about media, content and strong communities. At Neda Media I help companies grow through organic and paid channels."]
    ],
    ctaTitle: "Ready to strengthen your brand online?",
    ctaText: "Book a no-obligation call and let us show you how we can strengthen your business."
  },
  shapeitCase: {
    eyebrow: "Shapeit.dk case study",
    title: "How Shapeit 5X'ed profit by marketing smarter to women",
    subtitle:
      "See how we combined data, psychology and performance marketing to create growth in record time.",
    primaryCta: "Watch the video",
    primarySubtext: "Learn how you can do the same!",
    logosLabel: "Selected brands and collaborations",
    testimonialsTitle: "Testimonials",
    testimonials: [
      ["Dedicated, ambitious and talented", "Neriah is incredibly dedicated, ambitious and talented. Her ability to quickly understand our needs made the collaboration effective from day one.", "Rie Møller"],
      ["Professional advertising that delivers results", "I have had the pleasure of working with Neriah across several projects. She is thorough, creative and highly focused on performance.", "Malene"],
      ["Working with Neriah", "Neriah is skilled, creative and serious. She has made a real difference for us and gets my strongest recommendation.", "Ulrik Juhl"]
    ],
    ctaTitle: "Want to create smarter growth too?",
    ctaText: "Book a strategy call and let us review where you can lift your performance."
  },
  cta: {
    label: "Let's talk",
    meeting: "Book a free strategy call",
    services: "See our services"
  },
  footer: {
    text: "Performance marketing & social media agency for ambitious brands in Denmark.",
    nav: "Navigation",
    contact: "Contact",
    social: "Social",
    home: "Home",
    rights: "© 2026 Neda Media. All rights reserved."
  },
  labels: {
    whatWeOffer: "What we offer",
    process: "Process",
    stepPrefix: "Step",
    featuredCase: "Featured case",
    shapeitSpotlightTitle: "Shapeit.dk 5X profit growth",
    shapeitSpotlightBody:
      "Shapeit.dk was a webshop with potential but no clear direction in their marketing. We took over and transformed everything.",
    shapeitSpotlightMetrics: [
      ["500%", "Profit growth"],
      ["12X", "ROAS achieved"],
      ["365", "Days"]
    ],
    shapeitSpotlightBullets: [
      "Complete restructuring of the Meta Ads account",
      "New creative strategy with UGC and lifestyle content",
      "Implementation of server-side tracking",
      "Scaling ad spend from 5,000 DKK/month to 80,000 DKK/month"
    ],
    portfolio: "Portfolio",
    engagingContent: "Content that engages",
    socialQuote:
      "Neriah truly understands our brand and creates content that feels 100% authentic. Our engagement has increased significantly.",
    video: "Video",
    proofWorkImageAlt: "Proof of work",
    ctaTeamImageAlt: "Neda Media team at work",
    shapeitHeroImageAlt: "Neriah Tellerup Andersen marketing specialist",
    featuredTestimonialBrand: "Nordic Wellness Studio",
    socialShowcaseImageAlt: "Neda Media content"
  }
};

const translationsDa = {
  nav: {
    about: "Om os",
    services: "Ydelser",
    performance: "Performance marketing",
    social: "Social media",
    meeting: "Book møde",
    menu: "Menu",
    mobileAds: "Annoncer",
    mobileSocial: "SoMe",
    mobileCall: "Møde",
    langSwitcher: "Sprog",
    mobileNavLabel: "Mobil navigation"
  },
  home: {
    heroLabel: "Performance marketing-bureau",
    heroTitle: "Vi skaber vækst",
    heroAccent: "du kan mærke",
    heroSubtitle: "Performance marketing og social media management for ambitiøse brands i Skandinavien",
    strategy: "Book strategimøde",
    results: "Vores resultater",
    explore: "Udforsk",
    clients: "Udvalgte kunder",
    clientsTitle: "Brands vi har arbejdet med",
    brandStory:
      "Neda Media er ikke bare endnu et marketingbureau. Vi er jeres strategiske vækstpartner med fokus på autentisk, menneskeligt indhold, der skaber tillid, og performance-drevet annoncering med målbare resultater.",
    rolesTitle: "Vi er ikke bare et bureau.",
    rolesIntro: "Vi træder til som teamet, der spotter muligheder, løser problemer og får indhold til at performe.",
    roles: [
      "Jeres strateg",
      "Jeres vækstpartner",
      "Jeres kreative director",
      "Jeres problemløser",
      "Jeres trendspotter",
      "Jeres videoeditor"
    ],
    servicesLabel: "Ydelser",
    servicesTitle: "Det vi er bedst til",
    readMore: "Læs mere",
    casesLabel: "Cases",
    casesTitle: "Resultater der taler deres eget sprog",
    caseType: "Performance marketing-case",
    caseTitle: "Fra uprofitabel webshop til 5X overskudsvækst",
    caseText:
      "Shapeit.dk kom til os med en webshop uden fart på. Med strategiske Meta Ads, kreativ produktion og data-drevet optimering transformerede vi forretningen på kun 365 dage.",
    caseMetrics: [
      ["500%", "Overskudsvækst"],
      ["365", "Tidslinje"],
      ["12X", "ROAS"]
    ],
    getResults: "Få lignende resultater",
    stats: ["Glade kunder", "Annonceforbrug (DKK)", "Gennemsnitlig ROAS", "Gns. stigning i engagement"],
    aboutLabel: "Om Neda Media",
    aboutTitle: "Neriah Tellerup Andersen",
    aboutRole: "Stifter & marketing specialist",
    aboutText1:
      "Med passion for autentisk marketing og datadrevne resultater stiftede jeg Neda Media for at hjælpe ambitiøse brands med at vokse. Jeg tror på, at de bedste resultater kommer fra ægte, menneskeligt indhold.",
    aboutText2:
      "Min tilgang kombinerer kreativ storytelling med hård performance-data. Resultatet? Brands der både ser stærke ud og leverer i bundlinjen.",
    bookTalk: "Book et møde",
    proofLabel: "Arbejdet i praksis",
proofTitle: "Bag kulisserne hos NEDA Media",
proofText: "Et indblik i de visuals, videoproduktioner og content, der skabes under NEDA Media-brandet fra idé til færdigt produkt.",
    proofProfile: "Se mere på Instagram",
    testimonialsLabel: "Udtalelser",
    testimonialsTitle: "Det siger vores kunder",
    faqLabel: "FAQ",
    faqTitle: "Ofte stillede spørgsmål",
    faqIntro:
      "Find svar på de vigtigste spørgsmål om samarbejde, pris, platforme og hvordan vi bygger vækst.",
    ctaTitle: "Klar til at skalere jeres forretning?",
    ctaText:
      "Book et gratis strategimøde, og lad os vise jer præcis, hvordan Neda Media kan hjælpe jer med at vokse gennem performance marketing og social media.",
    carouselTestimonials: [
    {
    name: "Anders",
    designation: "Kunde",
    quote: "Har arbejdet med Neriah i mange år, hun er dedikeret, dygtig og går gerne den ekstra mil for at sikre resultater. Mine varmeste anbefalinger."
  },
  {
    name: "Rie Møller",
    designation: "Kunde",
    quote: "Neriah er en utrolig dedikeret, ambitiøs og talentfuld ung kvinde. Hendes evne til hurtigt at forstå vores behov gjorde samarbejdet effektivt fra dag ét."
  },
  {
    name: "Malene",
    designation: "Kunde",
    quote: "Jeg har haft fornøjelsen af at arbejde med Neriah, nu Nedamedia, på tværs af flere projekter. Hun er grundig, kreativ og stærkt performance-fokuseret."
  }
    ]
  },
  services: [
    [
      "01",
      "Performance marketing",
      "Strategisk Meta- og Google-annoncering der konverterer. Vi bygger skalerbare systemer til leads, salg og vækst med data og kreativitet."
    ],
    [
      "02",
      "Social media management",
      "Indholdsstrategi, produktion og community management der styrker jeres brand. Autentisk storytelling der skaber loyale følgere."
    ]
  ],
  faq: faqsDa,
  servicePages: {
    performance: performanceDataDa,
    social: socialDataDa
  },
  about: {
    title: "Vi er Neda Media.",
    accent: "Jeres vækstteam.",
    subtitle:
      'Vi blev skabt af frustration over "fluffy" marketing uden ansvar for bundlinjen. Vi er ikke et traditionelt bureau. Vi er et agilet team af specialister inden for performance og kreativitet.',
    meeting: "Book et uforpligtende møde",
    articles: "Se vores artikler",
    missionLabel: "Mission",
    mission:
      "Vores mission er at forbinde ambitiøse brands med deres målgrupper gennem autentisk, resultatorienteret marketing. Vi vinder kun, når vores kunder vinder.",
    members: [
      [
        "Neriah",
        "Stifter & head of strategy",
        "Jeg startede min egen webshop, da jeg var 11. Det projekt lærte mig værdien af ægte online marketing og gav mig drive til at hjælpe ambitiøse brands med at vokse."
      ],
      [
        "Cecilie",
        "Junior specialist i betalt og organisk",
        "Jeg hedder Cecilie Heinrichsen, og jeg brænder for medier, indhold og stærke communities. Hos Neda Media hjælper jeg virksomheder med at vokse gennem organiske og betalte kanaler."
      ]
    ],
    ctaTitle: "Klar til at styrke jeres brand online?",
    ctaText: "Book et uforpligtende møde, og lad os vise, hvordan vi kan styrke jeres forretning."
  },
  shapeitCase: {
    eyebrow: "Shapeit.dk case",
    title: "Sådan 5X'ede Shapeit overskuddet ved at markete smartere til kvinder",
    subtitle:
      "Se hvordan vi kombinerede data, psykologi og performance marketing for at skabe vækst på rekordtid.",
    primaryCta: "Se videoen",
    primarySubtext: "Lær hvordan I kan gøre det samme!",
    logosLabel: "Udvalgte brands og samarbejder",
    testimonialsTitle: "Udtalelser",
    testimonials: [
      [
        "Dedikeret, ambitiøs og talentfuld",
        "Neriah er utrolig dedikeret, ambitiøs og talentfuld. Hendes evne til hurtigt at forstå vores behov gjorde samarbejdet effektivt fra dag ét.",
        "Rie Møller"
      ],
      [
        "Professionel annoncering med resultater",
        "Jeg har haft fornøjelsen af at arbejde med Neriah på tværs af flere projekter. Hun er grundig, kreativ og stærkt performance-fokuseret.",
        "Malene"
      ],
      [
        "Samarbejde med Neriah",
        "Neriah er dygtig, kreativ og seriøs. Hun har gjort en reel forskel for os og får min varmeste anbefaling.",
        "Ulrik Juhl"
      ]
    ],
    ctaTitle: "Vil I også skabe smartere vækst?",
    ctaText: "Book et strategimøde, og lad os gennemgå, hvor I kan løfte jeres performance."
  },
  cta: {
    label: "Lad os tale sammen",
    meeting: "Book et gratis strategimøde",
    services: "Se vores ydelser"
  },
  footer: {
    text: "Performance marketing- og social media-bureau for ambitiøse brands i Danmark.",
    nav: "Navigation",
    contact: "Kontakt",
    social: "Sociale medier",
    home: "Forside",
    rights: "© 2026 Neda Media. Alle rettigheder forbeholdes."
  },
  labels: {
    whatWeOffer: "Det vi tilbyder",
    process: "Proces",
    stepPrefix: "Trin",
    featuredCase: "Udvalgt case",
    shapeitSpotlightTitle: "Shapeit.dk 5X overskudsvækst",
    shapeitSpotlightBody:
      "Shapeit.dk var en webshop med potentiale, men uden klar retning i marketing. Vi overtog og forvandlede alt.",
    shapeitSpotlightMetrics: [
      ["500%", "Overskudsvækst"],
      ["12X", "ROAS opnået"],
      ["365", "Dage"]
    ],
    shapeitSpotlightBullets: [
      "Komplet omstrukturering af Meta Ads-kontoen",
      "Ny kreativ strategi med UGC og lifestyle-indhold",
      "Implementering af server-side tracking",
      "Skalering af annonceforbrug fra 5.000 kr./md. til 80.000 kr./md."
    ],
    portfolio: "Portfolio",
    engagingContent: "Indhold der engagerer",
    socialQuote:
      "Neriah forstår virkelig vores brand og skaber indhold, der føles 100 % autentisk. Vores engagement er steget markant.",
    video: "Video",
    proofWorkImageAlt: "Udvalgt arbejde",
    ctaTeamImageAlt: "Neda Media-teamet i arbejde",
    shapeitHeroImageAlt: "Neriah Tellerup Andersen marketing specialist",
    featuredTestimonialBrand: "Nordic Wellness Studio",
    socialShowcaseImageAlt: "Neda Media-indhold"
  }
};

const TRANSLATIONS = {
  en: translationsEn,
  da: translationsDa
};

function pathnameToRoute(pathname) {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  let path = pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  const segment = path.replace(/^\/+/, "").split("/").filter(Boolean)[0];
  if (!segment) return "home";
  return segment;
}

const RouteContext = createContext(null);

function RouteProvider({ children }) {
  const [route, setRoute] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash.startsWith("#/")) {
      const segment = window.location.hash.replace("#/", "").split("?")[0] || "home";
      const path = !segment || segment === "home" ? "/" : `/${segment}`;
      window.history.replaceState(null, "", path + window.location.search);
    }
    return pathnameToRoute(window.location.pathname);
  });

  const navigate = useCallback((to) => {
    const segment =
      !to || to === "home"
        ? "home"
        : String(to)
            .replace(/^\/+/, "")
            .split("/")
            .filter(Boolean)[0] || "home";
    const path = segment === "home" ? "/" : `/${segment}`;
    window.history.pushState(null, "", path);
    setRoute(pathnameToRoute(window.location.pathname));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPop = () => {
      setRoute(pathnameToRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const value = useMemo(() => ({ route, navigate }), [route, navigate]);
  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}

function useAppRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useAppRoute must be used within RouteProvider");
  return ctx;
}

function AppLink({ to, children, className, onClick, ...rest }) {
  const { navigate } = useAppRoute();
  const href = !to || to === "home" ? "/" : `/${String(to).replace(/^\/+/, "")}`;
  return (
    <a
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function readInitialLocale() {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "da") return stored;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && /^da\b/i.test(navigator.language || "")) return "da";
  return "en";
}

function App() {
  const [locale, setLocale] = useState(readInitialLocale);
  const t = useMemo(() => TRANSLATIONS[locale], [locale]);

  useEffect(() => {
    document.documentElement.lang = locale === "da" ? "da" : "en";
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.remove("theme-dark");
    window.localStorage.removeItem("theme");
  }, []);

  return (
    <RouteProvider>
      <AppContent locale={locale} setLocale={setLocale} t={t} />
    </RouteProvider>
  );
}

function AppContent({ locale, setLocale, t }) {
  const { route } = useAppRoute();

  const page = useMemo(() => {
    if (route === "about-us") return <AboutPage t={t} />;
    if (route === "performance-marketing") return <ServicePage data={t.servicePages.performance} t={t} />;
    if (route === "social-media") return <ServicePage data={t.servicePages.social} t={t} />;
    if (route === "case-study-shapeit") return <ShapeitCasePage t={t} />;
    return <HomePage t={t} />;
  }, [route, t]);

  return (
    <div className="min-h-screen bg-beige text-ink transition-colors duration-300">
      <div className="noise" aria-hidden="true" />
      <Header route={route} t={t} locale={locale} onLocaleChange={setLocale} />
      {page}
      <Footer t={t} />
    </div>
  );
}

function LangSwitcher({ locale, onLocaleChange, solidHeader, t }) {
  const muted = solidHeader ? "text-ink/55" : "text-beige/60";
  const activeCls = solidHeader ? "text-ink" : "text-beige";
  const btn = (code, label) => (
    <button
      key={code}
      type="button"
      className={`rounded-md px-1.5 py-0.5 transition ${
        locale === code ? `${activeCls} underline decoration-2 underline-offset-4` : `${muted} hover:opacity-100`
      }`}
      onClick={() => onLocaleChange(code)}
      lang={code}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide ${solidHeader ? "text-ink" : "text-beige"}`}
      role="group"
      aria-label={t.nav.langSwitcher}
    >
      {btn("da", "DA")}
      <span className={muted} aria-hidden>
        |
      </span>
      {btn("en", "EN")}
    </div>
  );
}

function Header({ route, t, locale, onLocaleChange }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidHeader = scrolled || route !== "home";
  const logoSrc = solidHeader ? "images/logo-dark.png" : "images/logo-white.png";
  const desktopNavColor = solidHeader ? "lg:text-ink" : "lg:text-beige";
  const controlsColor = solidHeader ? "text-ink" : "text-beige";
  const mobileNavItems = [
    { to: "home", label: t.footer.home, icon: "home", active: route === "home" },
    { to: "about-us", label: t.nav.about, icon: "about", active: route === "about-us" },
    { to: "performance-marketing", label: t.nav.mobileAds, icon: "chart", active: route === "performance-marketing" },
    { to: "social-media", label: t.nav.mobileSocial, icon: "social", active: route === "social-media" },
    { external: true, href: CALENDLY, label: t.nav.mobileCall, icon: "calendar", active: false }
  ];
  const close = () => {};

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          solidHeader
            ? "bg-white/95 py-3 shadow-card backdrop-blur"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-shell grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="flex w-full items-center justify-between gap-4 lg:contents">
            <AppLink to="home" onClick={close} className="shrink-0 justify-self-start">
              <img src={logoSrc} alt="Neda Media" className="h-12 w-40 object-contain" />
            </AppLink>
            <div className={`shrink-0 lg:hidden ${controlsColor}`}>
              <LangSwitcher locale={locale} onLocaleChange={onLocaleChange} solidHeader={solidHeader} t={t} />
            </div>
          </div>

          <nav
            className={`hidden text-sm font-semibold uppercase lg:block lg:justify-self-center ${desktopNavColor}`}
            aria-label={t.nav.services}
          >
            <ul className="flex items-center gap-7">
                <li>
                  <AppLink className={linkState(route === "about-us")} to="about-us" onClick={close}>
                    {t.nav.about}
                  </AppLink>
                </li>
                <li className="group relative">
                  <span className="inline-flex cursor-default items-center gap-2 py-2">{t.nav.services}</span>
                  <div className="absolute left-0 mt-2 grid min-w-64 gap-3 rounded-lg border border-white/10 bg-cream p-4 text-ink opacity-0 shadow-soft transition group-hover:opacity-100">
                    <AppLink to="performance-marketing" onClick={close} className="hover:text-rust">
                      {t.nav.performance}
                    </AppLink>
                    <AppLink to="social-media" onClick={close} className="hover:text-rust">
                      {t.nav.social}
                    </AppLink>
                  </div>
                </li>
              </ul>
          </nav>

          <div className={`hidden items-center justify-end gap-5 justify-self-end lg:flex ${controlsColor}`}>
            <LangSwitcher locale={locale} onLocaleChange={onLocaleChange} solidHeader={solidHeader} t={t} />
            <a href={CALENDLY} className={`btn py-3 ${solidHeader ? "btn-primary" : "btn-light"}`}>
              {t.nav.meeting}
            </a>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-ink/10 bg-cream/95 px-3 py-2 shadow-soft backdrop-blur lg:hidden" aria-label={t.nav.mobileNavLabel}>
        <ul className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => (
            <li key={item.external ? item.href : item.to}>
              {item.external ? (
                <a
                  href={item.href}
                  className={`grid place-items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-bold uppercase transition ${
                    item.active ? "bg-olive text-beige" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <NavIcon name={item.icon} />
                  <span>{item.label}</span>
                </a>
              ) : (
                <AppLink
                  to={item.to}
                  className={`grid place-items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-bold uppercase transition ${
                    item.active ? "bg-olive text-beige" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <NavIcon name={item.icon} />
                  <span>{item.label}</span>
                </AppLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function NavIcon({ name }) {
  const icons = {
    home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z" />,
    about: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 9a7 7 0 0 0-14 0" />,
    chart: <path d="M4 19h16M7 16v-5m5 5V6m5 10v-8" />,
    social: <path d="M7 8h10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-4l-4 3v-3H7a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z" />,
    calendar: <path d="M7 3v3m10-3v3M5 9h14M6 5h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  };

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function linkState(active) {
  return `py-2 hover:text-rust ${active ? "text-rust lg:text-rust" : ""}`;
}

function HomePage({ t }) {
  return (
    <main>
      <Hero t={t} />
      <ClientsMarquee t={t} />
      <BrandStory t={t} />
      <AgencyRoles t={t} />
      <ServicesOverview t={t} />
      <CaseStudy t={t} />
      <StatsBanner t={t} />
      <AboutPreview t={t} />
      <ProofOfWork t={t} />
      <Testimonials t={t} />
      {/* <TestimonialsV2 t={t} /> */}
      <CTA title={t.home.ctaTitle} text={t.home.ctaText} t={t} />
      <FAQ t={t} />
    </main>
  );
}

function Hero({ t }) {
  return ( 
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 text-center text-white">
      <img src="/images/hero-bg.png" alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" />
      <div className="absolute inset-0 bg-olive/30" />
      <div className="container-shell relative z-10 flex justify-center">
        <div className="max-w-5xl p-8 md:p-12">
          <span className="font-accent text-2xl  text-beige">{t.home.heroLabel}</span>
          <h1 className="display-xl mt-5">
            {t.home.heroTitle} <br />
            <span className=" text-beige">{t.home.heroAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-beige">
            {t.home.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={CALENDLY} className="btn btn-light">
              {t.home.strategy}
            </a>
            <a href="#cases" className="btn border border-white/70 text-white hover:bg-white hover:text-olive">
              {t.home.results}
            </a>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="font-accent text-lg  text-beige">{t.home.explore}</span>
        <span className="mx-auto mt-3 block h-16 w-px bg-gradient-to-b from-beige to-transparent" />
      </div> */}
    </section>
  );
}

function ClientsMarquee({ t }) {
  const repeated = [...clients, ...clients];
  return (
    <section className="overflow-hidden border-y border-black/10 bg-beige py-12">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[30%_70%]">
        <div>
          <span className="section-label mb-1">{t.home.clients}</span>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {t.home.clientsTitle}
          </h2>
        </div>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-20">
            {repeated.map(([src, alt], index) => (
              <img
                key={`${src}-${index}`}
                src={`/images/clients/${src}`}
                alt={index >= clients.length ? "" : alt}
                className="h-14 w-auto shrink-0 object-contain opacity-90 transition   hover:opacity-100 md:h-16"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStory({ t }) {
  return (
    <section className="section-pad bg-[radial-gradient(ellipse_at_15%_40%,rgba(97,30,8,0.09),transparent_55%),radial-gradient(ellipse_at_85%_70%,rgba(42,31,26,0.07),transparent_55%)]">
      <div className="container-shell max-w-5xl">
        <p className="font-display text-3xl leading-[1.18] md:text-5xl md:leading-[1.12] !font-normal">
          {t.home.brandStory}
        </p>
      </div>
    </section>
  );
}

function AgencyRoles({ t }) {
  return (
    <section className="bg-olive py-16 text-beige md:py-24">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-accent text-2xl  text-beige/70">{t.home.servicesLabel}</span>
          <h2 className="mt-4 font-display text-4xl leading-tight text-beige md:text-6xl">{t.home.rolesTitle}</h2>
          <p className="mt-6 max-w-xl text-beige/75">{t.home.rolesIntro}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.home.roles.map((role, index) => (
            <div
              key={role}
              className="rounded-2xl border border-beige/15 bg-beige/5 p-5 text-lg font-semibold text-beige shadow-card backdrop-blur"
            >
              <span className="mb-4 block font-accent text-3xl  text-beige/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              {role}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview({ t }) {
  const services = t.services.map((service, index) => [
    ...service,
    index === 0 ? "performance-marketing" : "social-media"
  ]);

  return (
    <section className="section-pad bg-warm" id="services">
      <div className="container-shell">
        <SectionHeader label={t.home.servicesLabel} title={t.home.servicesTitle} center />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(([number, title, text, to]) => (
            <AppLink key={title} to={to} className="card group min-h-80">
              <span className="font-accent text-3xl  text-rust">{number}</span>
              <h3 className="mt-8 text-3xl">{title}</h3>
              <p className="mt-5 text-taupe">{text}</p>
              <span className="mt-8 inline-flex items-center gap-3 border-b border-current pb-1 text-sm font-bold uppercase text-ink group-hover:text-rust">
                {t.home.readMore} <span aria-hidden="true">→</span>
              </span>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ t }) {
  return (
    <section className="section-pad bg-beige" id="cases">
      <div className="container-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase text-taupe">{t.home.caseType}</span>
            <h3 className="mt-4 text-4xl md:text-5xl">{t.home.caseTitle}</h3>
            <p className="mt-6 text-taupe">
              {t.home.caseText}
            </p>
            <div className="mt-9 grid grid-cols-3 gap-4">
              {t.home.caseMetrics.map(([number, label]) => (
                <div key={label}>
                  <span className="block font-display text-4xl text-brown">{number}</span>
                  <span className="mt-2 block text-xs font-bold uppercase text-taupe">{label}</span>
                </div>
              ))}
            </div>
            <AppLink to="case-study-shapeit" className="btn btn-outline mt-9">
              {t.home.getResults}
            </AppLink>
          </div>
          <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-lg bg-brown shadow-soft lg:mr-0">
            <video autoPlay muted loop controls playsInline className="block h-auto w-full">
              <source src="/images/proof-of-work/Shapeit.dk-testimonial.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ valueString }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = valueString.match(/^([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(valueString);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];

    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        const formatted = Number.isInteger(target)
          ? Math.round(latest).toString()
          : latest.toFixed(1);
        setDisplayValue(formatted + suffix);
      }
    });

    return () => controls.stop();
  }, [valueString, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

function StatsBanner({ t }) {
  return (
    <section className="dark-band py-16">
      <div className="container-shell grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {[
          ["50+", t.home.stats[0]],
          ["10M+", t.home.stats[1]],
          ["5X", t.home.stats[2]],
          ["200%", t.home.stats[3]]
        ].map(([number, label]) => (
          <div key={label}>
            <span className="block font-display text-5xl text-beige md:text-6xl">
              <AnimatedCounter valueString={number} />
            </span>
            <span className="mt-3 block text-sm uppercase text-beige/70">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPreview({ t }) {
  return (
    <section className="section-pad bg-warm" id="about">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div className="image-frame">
          <img src="/images/neriah-portrait.png" alt="Neriah Tellerup Andersen" className="  w-full object-cover" />
        </div>
        <div>
          <span className="section-label">{t.home.aboutLabel}</span>
          <h2 className="display-lg">{t.home.aboutTitle}</h2>
          <p className="mt-4 text-xs font-bold uppercase text-taupe">{t.home.aboutRole}</p>
          <p className="mt-7 text-taupe">
            {t.home.aboutText1}
          </p>
          <p className="mt-5 text-taupe">
            {t.home.aboutText2}
          </p>
          <a href={CALENDLY} className="btn btn-outline mt-8">
            {t.home.bookTalk}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProofOfWork({ t }) {
  return (
    <section className="section-pad bg-beige" id="proof-of-work">
      <div className="container-shell">
        <div className="grid items-start gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div className="rounded-lg border border-ink/10 bg-cream p-8 shadow-card lg:sticky lg:top-28">
            <span className="section-label">{t.home.proofLabel}</span>
            <h2 className="display-lg">{t.home.proofTitle}</h2>
            <p className="mt-6 text-taupe">{t.home.proofText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FaInstagram aria-hidden="true" /> {t.home.proofProfile}
              </a>
            </div>
          </div>
          <div className="columns-1 gap-4 sm:columns-2">
            {proofOfWorkImages.map((image, index) => (
              <div
                key={image}
                className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft"
              >
                <img
                  src={`/images/proof-of-work/${image}`}
                  alt={`${t.labels.proofWorkImageAlt} ${index + 1}`}
                  className="h-auto w-full transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// function Testimonials({ t }) {
//   const testimonials = t.home.carouselTestimonials.map((item, index) => {
//     const srcs = ["/images/neriah-portrait.png", "/images/hero-portrait.png", "/images/cecilie-portrait.avif"];
//     return { ...item, src: srcs[index] };
//   });

//   return (
//     <section className="section-pad bg-beige">
//       <div className="container-shell">
//         <SectionHeader label={t.home.testimonialsLabel} title={t.home.testimonialsTitle} />
//         <div className="mx-auto max-w-6xl">
//           <CircularTestimonials
//             testimonials={testimonials}
//             autoplay
//             colors={{
//               name: "rgb(var(--color-ink))",
//               designation: "rgb(var(--color-taupe))",
//               testimony: "rgb(var(--color-ink))",
//               arrowBackground: "rgb(var(--color-beige))",
//               arrowForeground: "rgb(18 18 17)",
//               arrowHoverBackground: "rgb(var(--color-taupe))"
//             }}
//             fontSizes={{
//               name: "28px",
//               designation: "20px",
//               quote: "20px"
//             }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

function Testimonials({ t }) {
  const [reviews, setReviews] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const hiddenRef = useRef(null);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://cdn.commoninja.com/sdk/latest/commonninja.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
      script.defer = true;
      document.body.appendChild(script);
    }

    let attempts = 0;
    const maxAttempts = 15; // 15 * 500ms = 7.5 seconds timeout

    const interval = setInterval(() => {
      attempts++;
      
      const host = hiddenRef.current?.querySelector(".commonninja_component");
      const shadow = host?.shadowRoot;
      const items = shadow?.querySelectorAll(".item.is-testimonials");

      if (items && items.length > 0) {
        const parsed = [];
        const seen = new Set();

        items.forEach((item) => {
          const name =
            item.querySelector(".author-name")?.textContent?.trim() ||
            item.querySelector(".item-title")?.textContent?.trim() ||
            "";
          const quote =
            item.querySelector(".item-body p")?.textContent?.trim() || "";
          const key = `${name}|${quote}`;
          if (seen.has(key) || !name || !quote) return;
          seen.add(key);
          parsed.push({ name, designation: "Client", quote });
        });

        if (parsed.length > 0) {
          setReviews(parsed);
          clearInterval(interval);
          return;
        }
      }

      // Fallback if parsing fails after max attempts
      if (attempts >= maxAttempts) {
        setIsFallback(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const srcs = [
    "/images/neriah-portrait.png",
    "/images/neriah.png",
    "/images/cecilie-portrait.avif",
    "/images/neriah-outdoor.jpeg",
    "/images/neriah-desk.png",
    "/images/process-audit.png"
  ];

  // Live reviews take priority. If fallback is triggered, use hardcoded translations.
  const activeReviews = reviews.length > 0 ? reviews : (isFallback ? t.home.carouselTestimonials : []);
  
  const testimonials = activeReviews.map((item, index) => ({
    ...item,
    src: srcs[index % srcs.length]
  }));

  const isLoading = testimonials.length === 0;

  // Featured Review State
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const handlePrev = () => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(handleNext, 7000);
    return () => clearInterval(interval);
  }, [isLoading, testimonials.length]);

  return (
    <section className="relative overflow-hidden bg-warm py-24 lg:py-32">
      {/* Premium Ambient Background Effects */}
      {/* <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-olive/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[800px] w-[800px] translate-x-1/3 translate-y-1/3 rounded-full bg-rust/5 blur-[120px]" /> */}

      <div className="container-shell relative z-10">
        
        {/* Hidden Common Ninja renderer off-screen but alive */}
        <div ref={hiddenRef} style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "500px", pointerEvents: "none", opacity: 0 }}>
          <div className="commonninja_component pid-5cd38a52-7ee6-446e-9776-6237c2d091ef" />
        </div>

        {isLoading ? (
           // Minimal skeleton matching split layout
           <div className="grid min-h-[600px] animate-pulse grid-cols-1 gap-12 opacity-50 lg:grid-cols-2">
             <div className="flex flex-col gap-6 pt-12">
                <div className="h-6 w-32 rounded-full bg-ink/10" />
                <div className="h-16 w-3/4 rounded-full bg-ink/10" />
                <div className="h-16 w-1/2 rounded-full bg-ink/10" />
             </div>
             <div className="h-full min-h-[500px] w-full rounded-[32px] bg-ink/5" />
           </div>
        ) : (
          <>
            {/* TOP SPLIT SECTION */}
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              
              {/* LEFT: Text & Trust */}
              <div className="flex flex-col items-start pr-4">
                <span className="mb-4 text-sm font-bold uppercase tracking-widest text-rust">
                  {t.home.testimonialsLabel}
                </span>
                
                <h2 className="mb-8 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-6xl">
                  {t.home.testimonialsTitle}
                </h2>

                {/* Trustpilot Bar */}
                <div className="mb-10 flex w-fit flex-col items-start gap-4 rounded-[20px] border border-ink/5 bg-white/60 px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex items-center gap-2">
                    <svg className="h-6 w-6 text-[#00B67A]" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M256 0l83.6 172.9L512 195.4l-127 122.1L417.8 512 256 424.3 94.2 512l32.8-194.5L0 195.4l172.4-22.5L256 0z" />
                    </svg>
                    <span className="font-display text-lg font-medium tracking-tight text-ink">Trustpilot</span>
                  </div>
                  
                  <div className="hidden h-8 w-px bg-ink/10 sm:block" />
                  
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 text-[#FFB400]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="h-4 w-4 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-medium text-ink">4.9/5</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[13px] text-taupe">
                      <svg className="h-4 w-4 text-[#00B67A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Based on verified client reviews</span>
                    </div>
                  </div>
                </div>

                <p className="max-w-md text-lg leading-relaxed text-taupe">
                  We partner with ambitious brands to scale their revenue through data-driven performance marketing. Here is what they have to say.
                </p>
              </div>

              {/* RIGHT: Featured Testimonial Card */}
              <div className="group relative flex min-h-[500px] w-full flex-col justify-end overflow-hidden rounded-[32px] bg-ink/5 p-8 shadow-card md:min-h-[600px] md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={testimonials[activeIndex].src} 
                      className="h-full w-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 flex flex-col justify-end">
                  <div className="mb-8 flex gap-3">
                    <button aria-label="Previous" onClick={handlePrev} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-105">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button aria-label="Next" onClick={handleNext} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-105">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      <p className="font-display text-2xl font-medium leading-snug text-white md:text-3xl lg:text-[32px] lg:leading-[1.4]">
                        "{testimonials[activeIndex].quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/20">
                          <img src={testimonials[activeIndex].src} className="h-full w-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{testimonials[activeIndex].name}</h4>
                          <div className="flex items-center gap-1.5 text-sm text-white/70">
                            <svg className="h-3.5 w-3.5 text-[#00B67A]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified Client
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* BOTTOM MARQUEE REVIEW STRIP */}
            <div className="relative mt-20 flex w-full overflow-hidden pb-8 pt-8 -mx-4 px-4 sm:-mx-8 sm:px-8">
              {/* Fade out edges */}
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-16 bg-gradient-to-r from-warm to-transparent lg:w-40" />
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-16 bg-gradient-to-l from-warm to-transparent lg:w-40" />
              
              <div className="flex w-max animate-marquee gap-6 [animation-duration:45s] hover:[animation-play-state:paused]">
                {[0, 1].map((set) => (
                  <div key={set} className="flex gap-6 pr-6">
                    {testimonials.map((review, i) => (
                      <div 
                        key={`${set}-${i}`} 
                        className="group flex w-[320px] shrink-0 flex-col gap-4 rounded-[24px] border border-ink/5 bg-white/40 p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/60 hover:shadow-md"
                      >
                        <div className="flex gap-1 text-[#FFB400]">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="line-clamp-3 text-sm leading-[1.6] text-ink/80 transition-colors group-hover:text-ink">"{review.quote}"</p>
                        <div className="mt-auto pt-4 border-t border-ink/5 flex items-center gap-3">
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-ink/10">
                             <img src={review.src} className="h-full w-full object-cover" alt=""/>
                          </div>
                          <span className="text-[13px] font-medium text-ink">{review.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FAQ({ t }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section-pad bg-warm" id="faq">
      <div className="container-shell grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-ink/10 bg-cream p-8 shadow-card lg:sticky lg:top-28">
          <span className="section-label">{t.home.faqLabel}</span>
          <h2 className="text-4xl">{t.home.faqTitle}</h2>
          <p className="mt-6 text-taupe">
            {t.home.faqIntro}
          </p>
          <a href={CALENDLY} className="btn btn-outline mt-8">
            {t.home.strategy}
          </a>
        </div>
        <div className="divide-y divide-ink/10 bg-transparent">
          {t.faq.map(([question, answer], index) => (
            <div
              key={question}
              className="px-1"
            >
              <button
                className="flex w-full items-center justify-between gap-5 py-6 text-left"
                onClick={() => setActive(active === index ? -1 : index)}
                aria-expanded={active === index}
              >
                <span className="font-body text-lg font-semibold leading-tight text-ink md:text-xl">{question}</span>
                <span className="shrink-0 text-2xl leading-none text-taupe">
                  {active === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ease-out ${
                  active === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <p className="max-w-3xl pb-6 text-taupe">{answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShapeitCasePage({ t }) {
  const scrollToVideo = (event) => {
    event.preventDefault();
    document.getElementById("shapeit-video")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="bg-beige pt-28 text-ink">
      <section className="section-pad">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-label">{t.shapeitCase.eyebrow}</span>
            <h1 className="display-lg max-w-4xl">
              {t.shapeitCase.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-taupe">{t.shapeitCase.subtitle}</p>
            <a href="#shapeit-video" onClick={scrollToVideo} className="btn btn-primary mt-9">
              {t.shapeitCase.primaryCta}
            </a>
            <p className="mt-3 text-sm font-semibold text-taupe">{t.shapeitCase.primarySubtext}</p>
          </div>
          <div className="image-frame">
            <img
              src="/images/proof-of-work/proof-work1.jpg"
              alt={t.labels.shapeitHeroImageAlt}
              className="h-[360px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section id="shapeit-video" className="section-pad bg-beige">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-label">{t.labels.video}</span>
            <h2 className="display-lg">{t.shapeitCase.primaryCta}</h2>
            <p className="mt-5 text-taupe">{t.shapeitCase.subtitle}</p>
          </div>
          <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-lg shadow-soft">
            <video autoPlay muted loop controls playsInline className="block h-auto w-full">
              <source src="/images/proof-of-work/Shapeit.dk-testimonial.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-shell">
          <h2 className="display-lg text-center">
            {t.shapeitCase.testimonialsTitle}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.shapeitCase.testimonials.map(([title, text, name]) => (
              <article key={title} className="card">
                <h3 className="font-body text-lg font-bold text-ink">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-taupe">{text}</p>
                <div className="mt-6 text-sm text-[#38c172]" aria-label="5 stars">★★★★★</div>
                <p className="mt-2 text-sm font-bold  text-ink">{name}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={CALENDLY} className="btn btn-primary">
              {t.shapeitCase.primaryCta}
            </a>
            <p className="mt-3 text-sm font-semibold text-taupe">{t.shapeitCase.primarySubtext}</p>
          </div>
        </div>
      </section>

      <CTA title={t.shapeitCase.ctaTitle} text={t.shapeitCase.ctaText} t={t} />
    </main>
  );
}

function AboutPage({ t }) {
  const testimonials = t.shapeitCase.testimonials;

  return (
    <main className="pt-28">
      <section className="section-pad bg-beige">
        <div className="container-shell max-w-5xl text-center">
          <h1 className="display-xl">
            {t.about.title}
            <span className="block font-accent  text-rust">{t.about.accent}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg text-taupe">
            {t.about.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={CALENDLY} className="btn btn-primary">
              {t.about.meeting}
            </a>
            <a href="#team" className="btn btn-ghost">
              {t.about.articles}
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-shell max-w-5xl">
          <span className="section-label">{t.about.missionLabel}</span>
          <p className="font-display text-3xl leading-tight md:text-5xl !font-normal">
            {t.about.mission}
          </p>
        </div>
      </section>

      <section className="section-pad bg-beige" id="team">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <TeamMember image="/images/neriah-portrait.png" name={t.about.members[0][0]} role={t.about.members[0][1]}>
            {t.about.members[0][2]}
          </TeamMember>
          <TeamMember image="/images/cecilie-portrait.avif" name={t.about.members[1][0]} role={t.about.members[1][1]}>
            {t.about.members[1][2]}
          </TeamMember>
        </div>
      </section>

      <section className="section-pad bg-warm">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {testimonials.map(([title, text, author], index) => (
            <article key={title} className="card">
              <div className="mb-5 text-green-600">★★★★★</div>
              <h3 className="text-2xl">{title}</h3>
              <p className="mt-4 text-taupe">{text}</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={`https://i.pravatar.cc/150?img=${12 - index}`} alt={author} className="h-10 w-10 rounded-full" />
                <strong>{author}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTA splitImage="/images/neriah-desk.png" title={t.about.ctaTitle} text={t.about.ctaText} t={t} />
    </main>
  );
}

function TeamMember({ image, name, role, children }) {
  return (
    <article className="grid gap-6">
      <div className="image-frame">
        <img src={image} alt={`${name} from Neda Media`} className="h-[620px] w-full object-cover" />
      </div>
      <div>
        <h2 className="text-5xl">{name}</h2>
        <p className="mt-2 text-sm font-bold uppercase text-taupe">{role}</p>
        <p className="mt-5 text-taupe">{children}</p>
      </div>
    </article>
  );
}

function ServicePage({ data, t }) {
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const baseX = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [data.pillars]);

  useAnimationFrame((t, delta) => {
    if (isHovered.current || isDragging.current || !contentWidth) return;
    // Very slow cinematic float (~15px per second)
    let moveBy = 0.85 * (delta / 16.666);
    baseX.set(baseX.get() - moveBy);
  });

  useMotionValueEvent(baseX, "change", (latest) => {
    if (!contentWidth) return;
    if (latest <= -contentWidth) {
      baseX.set(latest + contentWidth);
    } else if (latest > 0) {
      baseX.set(latest - contentWidth);
    }
  });

  return (
    <main>
      <SubHero data={data} />
      <section className="section-pad bg-warm">
        <div className="container-shell max-w-5xl">
          <p className="font-display text-3xl leading-tight md:text-5xl !font-normal">{data.philosophy}</p>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F8F6] to-beige py-24 lg:py-32">
        {/* Soft atmospheric background glow */}
        <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-rust/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-olive/5 blur-[120px]" />

        <div className="container-shell relative z-10">
          <div className="grid gap-16 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20 xl:grid-cols-[0.35fr_0.65fr]">
            
            {/* LEFT COLUMN - Sticky Intro */}
            <div className="flex flex-col items-start lg:sticky lg:top-32 lg:h-max">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-rust/10 bg-white/60 px-4 py-1.5 font-accent text-sm tracking-widest text-rust shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-rust" />
                {t.labels.whatWeOffer}
              </span>
              
              <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
                {(() => {
                  const words = data.offerTitle.split(" ");
                  const highlightCount = words.length > 3 ? 2 : 1;
                  const normal = words.slice(0, -highlightCount).join(" ");
                  const grad = words.slice(-highlightCount).join(" ");
                  return (
                    <>
                      {normal}{" "}
                      <span className="bg-gradient-to-r from-rust to-[#b25f3c] bg-clip-text text-transparent">{grad}</span>
                    </>
                  );
                })()}
              </h2>
              
              <p className="mt-6 max-w-md text-lg leading-relaxed text-taupe/90">
                {data.subtitle}
              </p>
              
              <AppLink to="meeting" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white shadow-lg shadow-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive hover:shadow-xl hover:shadow-olive/20">
                {t.cta?.meeting || "Book a meeting"}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </AppLink>
            </div>

            {/* RIGHT COLUMN - Cinematic Interactive Drift */}
            <div 
              className="relative w-full overflow-hidden py-6 -my-6"
              onMouseEnter={() => { isHovered.current = true; }}
              onMouseLeave={() => { isHovered.current = false; }}
              onTouchStart={() => { isHovered.current = true; }}
              onTouchEnd={() => { isHovered.current = false; }}
            >
              {/* Fade out edges for depth indication */}
              {/* <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-12 bg-gradient-to-r from-[#F9F8F6] to-transparent lg:w-24" />
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-16 bg-gradient-to-l from-[#F3EEEA]/80 to-transparent lg:w-40" /> */}

              <motion.div 
                style={{ x: baseX, touchAction: "pan-y" }}
                drag="x"
                dragMomentum={true}
                dragTransition={{ bounceStiffness: 80, bounceDamping: 20 }}
                onDragStart={() => { isDragging.current = true; isHovered.current = true; }}
                onDragEnd={() => { isDragging.current = false; isHovered.current = false; }}
                className="flex w-max px-2 py-4 cursor-grab active:cursor-grabbing"
              >
                {[0, 1, 2].map((setIndex) => (
                  <div key={setIndex} ref={setIndex === 0 ? contentRef : null} className="flex gap-6 pr-6">
                    {data.pillars.map((pillar) => (
                      <article 
                        key={`${setIndex}-${pillar.title}`}
                        className="group relative flex w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 flex-col rounded-[32px] border border-white/60 bg-white/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/80   hover:z-10"
                      >
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        {/* glowing orb behind icon */}
                        <div className="absolute left-8 top-8 h-16 w-16 rounded-full bg-rust/10 blur-xl transition-all duration-500 group-hover:bg-rust/30 group-hover:blur-2xl group-hover:scale-125" />
                        
                        <div className="relative mb-6">
                          <div className="[&>div]:mb-0 [&>div]:shadow-sm">
                            <PillarLogo title={pillar.title} />
                          </div>
                        </div>
                        
                        <h3 className="relative font-display text-2xl font-medium text-ink transition-colors duration-300">{pillar.title}</h3>
                        <p className="relative mt-3 text-sm leading-[1.6] text-taupe group-hover:text-ink/80 transition-colors duration-300">{pillar.text}</p>
                        
                        {pillar.points && (
                          <ul className="relative mt-8 flex flex-col gap-3 border-t border-ink/5 pt-6">
                            {pillar.points.map((point) => (
                              <li key={point} className="flex items-start gap-4 text-sm text-taupe group-hover:text-ink/80 transition-colors duration-300">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-rust transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="leading-snug">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {data.slug === "social-media" && <SocialShowcase t={t} />}
      {data.slug === "social-media" && <Platforms data={data} />}

      <Process title={data.processTitle} steps={data.process} t={t} />

      {data.slug === "performance-marketing" && <PerformanceSpotlight t={t} />}
      {data.slug === "social-media" && <FeaturedSocialTestimonial t={t} />}

      <CTA title={data.ctaTitle} text={data.ctaText} t={t} />
    </main>
  );
}

function PillarLogo({ title }) {
  const lower = title.toLowerCase();
  const iconWrap = (children) => (
    <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-rust/10 text-rust" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );

 if (lower.includes("meta") || lower.includes("social ads")) {
    return (
      <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-[#0668e1]/10 text-[#0668e1]" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
          <path
            d="M12 39.5C12 28.6 17.2 19 24.2 19c4.4 0 7.6 3.7 10.7 8.4C38.4 22.1 41.6 19 45.8 19 52.9 19 58 28.2 58 38.9c0 6.8-2.8 10.9-7.4 10.9-4.7 0-8.1-3.5-14.2-13.8l-1.7-2.8-1.9 3.1C26.8 46.2 23.6 49.8 19 49.8c-4.4 0-7-3.9-7-10.3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (lower.includes("google")) {
    return (
      <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-white shadow-card" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="h-8 w-8">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 19.5-8 19.5-20c0-1.2-.1-2.3-.3-3.5h.4Z" />
          <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.2 4 24 4 16.3 4 9.6 8.3 6.3 14.7Z" />
          <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.2-5.2C29.1 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.5 16.1 44 24 44Z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2c-.4.4 6.2-4.5 6.2-14.8 0-1.2-.1-2.3-.3-3.5h.4Z" />
        </svg>
      </div>
    );
  }

  if (lower.includes("tracking") || lower.includes("sporing") || lower.includes("analytics") || lower.includes("analyse") || lower.includes("data layer") || lower.includes("datalag")) {
    return iconWrap(
      <>
        <rect x="7" y="7" width="34" height="34" rx="5" />
        <path d="M15 32V22M24 32V15M33 32V26" />
      </>
    );
  }

  if (lower.includes("strategi") || lower.includes("strategy")) {
    return iconWrap(
      <>
        <path d="M8 35c9-1 16-8 18-18" />
        <path d="M22 17h8v8" />
        <circle cx="13" cy="35" r="4" />
        <circle cx="34" cy="13" r="4" />
      </>
    );
  }

  if (lower.includes("produktion") || lower.includes("production") || lower.includes("content")) {
    return iconWrap(
      <>
        <rect x="8" y="13" width="32" height="24" rx="5" />
        <path d="m21 21 9 5-9 5v-10Z" />
        <path d="M15 9h18" />
      </>
    );
  }

  if (lower.includes("community") || lower.includes("fællesskab")) {
    return iconWrap(
      <>
        <path d="M16 24a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
        <path d="M32 24a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="M6 38c1.8-6.5 6.3-10 10-10s8.2 3.5 10 10" />
        <path d="M25 34c1.9-3.8 4.6-6 7.2-6 3.4 0 6.5 2.9 7.8 8" />
      </>
    );
  }

  return (
    <div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-rust/10 text-rust" aria-hidden="true">
      <span className="font-display text-2xl">✦</span>
    </div>
  );
}

function SubHero({ data }) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 text-white">
      <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-olive/60" />
      <div className="container-shell relative z-10">
        <span className="font-accent text-2xl  text-beige">{data.label}</span>
        <h1 className="display-xl mt-4 max-w-4xl">{data.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-beige">{data.subtitle}</p>
      </div>
    </section>
  );
}

function Process({ title, steps, t }) {
  return (
    <section className="section-pad bg-warm">
      <div className="container-shell">
        <SectionHeader label={t.labels.process} title={title} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(([number, heading, text], index) => (
            <article key={number} className="card relative min-h-[360px] overflow-hidden">
              <span className="absolute right-6 top-5 font-accent text-5xl  text-rust/20">{number}</span>
              <ProcessIcon index={index} />
              <span className="mt-8 block text-xs font-bold uppercase text-rust">
                {t.labels.stepPrefix} {number}
              </span>
              <h3 className="mt-4 text-3xl">{heading}</h3>
              <p className="mt-4 text-taupe">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ index }) {
  const icons = [
    <path key="search" d="M21 21l-5.2-5.2m2-5.3a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />,
    <path key="settings" d="M12 3v3m0 12v3M4.2 7.5l2.6 1.5m10.4 6 2.6 1.5m0-9-2.6 1.5m-10.4 6-2.6 1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
    <path key="rocket" d="M14.5 4.5c3.4.6 5.4 2.6 6 6l-6.7 6.7-4.2-4.2 4.9-8.5ZM8.6 14 5 17.6M13 18.4 9.4 22M7.8 11.2 4 10l3-3 4.2.8M17.8 16.2 19 20l3-3-1.2-3.8" />,
    <path key="chart" d="M4 20h16M7 16v-5M12 16V6M17 16v-8" />
  ];

  return (
    <div className="grid h-16 w-16 place-items-center rounded-full bg-rust/10 text-rust" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {icons[index % icons.length]}
      </svg>
    </div>
  );
}

function PerformanceSpotlight({ t }) {
  return (
    <section className="section-pad bg-beige">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-lg bg-brown shadow-soft lg:mx-0">
          <video autoPlay muted loop controls playsInline className="block h-auto w-full">
            <source src="/images/proof-of-work/Shapeit.dk-testimonial.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <span className="section-label">{t.labels.featuredCase}</span>
          <h2 className="display-lg">{t.labels.shapeitSpotlightTitle}</h2>
          <p className="mt-6 text-taupe">{t.labels.shapeitSpotlightBody}</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {t.labels.shapeitSpotlightMetrics.map(([number, label]) => (
              <div key={label}>
                <span className="block font-display text-4xl text-brown">{number}</span>
                <span className="text-xs uppercase text-taupe">{label}</span>
              </div>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 text-taupe">
            {t.labels.shapeitSpotlightBullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SocialShowcase({ t }) {
  const showcaseItems = [
    {
      type: "video",
      src: "/images/v1.mp4",
      span: "row-span-2",
    },
    {
      type: "image",
      src: "/images/cecilie-portrait.avif", // Replace with your actual vertical MP4
      span: "",
    },
        {
      type: "video",
      src: "/images/hero-video.mp4", // Replace with your actual landscape MP4
      span: "row-span-2",
    },
    {
      type: "image",
      src: "/images/neriah-outdoor.jpeg",
      span: "",
    },
       {
      type: "image",
      src: "/images/process-creative.png",
      span: "",
    },

 
  ];

  return (
    <section className="relative overflow-hidden bg-warm py-24 lg:py-32">
      {/* Premium Ambient Background Effects */}
      <div className="pointer-events-none absolute left-[10%] top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[10%] h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-olive/5 blur-[120px]" />
      
      <div className="container-shell relative z-10">
        <SectionHeader label={t.labels.portfolio} title={t.labels.engagingContent} center />
        
        <div className="grid auto-rows-[260px] gap-5 md:grid-cols-4">
          {showcaseItems.map((item, index) => (
            <div 
              key={`${item.src}-${index}`} 
              className={`group relative overflow-hidden rounded-[28px] bg-ink/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] ${item.span}`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img 
                  src={item.src} 
                  alt={t.labels.socialShowcaseImageAlt || "Portfolio Showcase"} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              )}
              
              {/* Soft Cinematic Gradient Overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platforms({ data }) {
  const platformIcons = {
    Instagram: {
      Icon: FaInstagram,
      className: "bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#515bd4] text-white"
    },
    Facebook: {
      Icon: FaFacebookF,
      className: "bg-[#1877f2] text-white"
    },
    TikTok: {
      Icon: FaTiktok,
      className: "bg-[#010101] text-white"
    },
    // LinkedIn: {
    //   Icon: FaLinkedinIn,
    //   className: "bg-[#0a66c2] text-white"
    // }
  };

  return (
    <section className="section-pad bg-beige">
      <div className="container-shell">
        <SectionHeader label={data.platformsLabel} title={data.platformsTitle} center />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {data.platforms.map(([name, text, items]) => {
            const platform = platformIcons[name];
            const Icon = platform?.Icon;

            return (
              <article key={name} className="card">
                <div className={`mb-7 grid h-14 w-14 place-items-center rounded-full shadow-card ${platform?.className || "bg-rust/10 text-rust"}`} aria-hidden="true">
                  {Icon ? <Icon className="h-7 w-7" /> : <span className="font-display text-2xl">✦</span>}
                </div>
                <h3 className="text-3xl">{name}</h3>
                <p className="mt-4 text-taupe">{text}</p>
                <ul className="mt-6 grid gap-2 text-sm text-taupe">
                  {items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedSocialTestimonial({ t }) {
  return (
    <section className="section-pad bg-beige">
      <div className="container-shell max-w-5xl text-center">
        <blockquote className="font-display text-3xl leading-tight md:text-5xl">
          “{t.labels.socialQuote}”
        </blockquote>
        <p className="mt-6 text-taupe">{t.labels.featuredTestimonialBrand}</p>
      </div>
    </section>
  );
}

function CTA({ title, text, splitImage, t }) {
  return (
    <section className="dark-band section-pad">
      <div className={`container-shell grid items-center gap-10 ${splitImage ? "lg:grid-cols-[1.2fr_0.8fr]" : "max-w-5xl text-center"}`}>
        <div>
          <span className="font-accent text-2xl  text-beige/70">{t.cta.label}</span>
          <h2 className="mt-4 font-display text-4xl leading-tight text-beige md:text-6xl">{title}</h2>
          <p className={`mt-6 text-beige/75 ${splitImage ? "" : "mx-auto max-w-2xl"}`}>{text}</p>
          <div className={`mt-9 flex flex-col gap-4 sm:flex-row ${splitImage ? "" : "justify-center"}`}>
            <a href={CALENDLY} className="btn btn-light">
              {t.cta.meeting}
            </a>
            <AppLink to="performance-marketing" className="btn border border-beige/60 text-beige hover:bg-beige hover:text-olive">
              {t.cta.services}
            </AppLink>
          </div>
        </div>
        {splitImage && (
          <div className="image-frame">
            <img src={splitImage} alt={t.labels.ctaTeamImageAlt} className="h-[420px] w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

function SectionHeader({ label, title, center }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <span className="section-label">{label}</span>
      <h2 className="display-lg">{title}</h2>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="bg-ink text-beige border-t border-beige/10 py-14" id="contact">
      <div className="container-shell">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/images/logo-white.png" alt="Neda Media" className="h-16 w-48 object-contain" />
            <p className="mt-5 text-beige/70">{t.footer.text}</p>
          </div>
          <div>
            <h3 className="font-body text-sm font-bold uppercase text-beige">{t.footer.nav}</h3>
            <ul className="mt-5 grid gap-3 text-beige/70">
              <li><AppLink to="home">{t.footer.home}</AppLink></li>
              <li><AppLink to="about-us">{t.nav.about}</AppLink></li>
              <li><AppLink to="performance-marketing">{t.nav.performance}</AppLink></li>
              <li><AppLink to="social-media">{t.nav.social}</AppLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-body text-sm font-bold uppercase text-beige">{t.footer.contact}</h3>
            <div className="mt-5 grid gap-2 text-beige/70 [&_p]:text-beige/70 [&_a]:text-beige/70 [&_a:hover]:text-beige">
              <p>Neriah Tellerup Andersen</p>
              <a href="mailto:neriah@nedamedia.dk">neriah@nedamedia.dk</a>
              <a href="tel:+4521451217">+45 21 45 12 17</a>
              <p>Buddingevej 72<br />2800 Kongens Lyngby</p>
            </div>
          </div>
          <div>
            <h3 className="font-body text-sm font-bold uppercase text-beige">{t.footer.social}</h3>
            <div className="mt-5 flex gap-3">
              <a className="grid h-11 w-11 place-items-center rounded-full border border-beige/30 text-beige hover:bg-[#0a66c2] hover:text-white" href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-full border border-beige/30 text-beige hover:bg-[#e4405f] hover:text-white" href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-beige/10 pt-6 text-sm text-beige/80 md:flex-row">
          <p>{t.footer.rights}</p>
          <p>CVR: 41613394</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
