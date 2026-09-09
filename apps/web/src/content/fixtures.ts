import type {
  Article,
  Faq,
  Partner,
  Project,
  Service,
  ServiceArea,
  TeamMember,
  Testimonial
} from "./types";

export const residenceNight = {
  src: "/images/synchro-spaces/residence-night.jpeg",
  alt: "Contemporary residence illuminated with warm exterior lighting at dusk",
  width: 1338,
  height: 1175
};

export const residenceTwilight = {
  src: "/images/synchro-spaces/residence-twilight.jpeg",
  alt: "Modern two-storey residence with balconies and a landscaped garden at twilight",
  width: 1122,
  height: 1402
};

export const sceneKeypadSix = {
  src: "/images/synchro-spaces/scene-keypad-six.jpeg",
  alt: "Wall-mounted scene-control keypad with six labelled buttons",
  width: 1122,
  height: 1402
};

export const smartLock = {
  src: "/images/synchro-spaces/smart-lock.jpeg",
  alt: "Illuminated keypad smart lock on a wooden door",
  width: 1122,
  height: 1402
};

export const sceneKeypadThree = {
  src: "/images/synchro-spaces/scene-keypad-three.jpeg",
  alt: "Wall-mounted scene-control keypad with Welcome, Curtain and Away presets",
  width: 1122,
  height: 1402
};

export const integrationRack = {
  src: "/images/synchro-spaces/integration-rack.jpeg",
  alt: "Integrated smart-home equipment rack for control, audio and networking",
  width: 1254,
  height: 1254
};

export const control4KeypadWall = {
  src: "/images/synchro-spaces/control4-keypad-wall.jpeg",
  alt: "Black scene keypad mounted on a charcoal wall beside a softly focused dining space",
  width: 1600,
  height: 1066
};

export const control4TouchscreenEvening = {
  src: "/images/synchro-spaces/control4-touchscreen-evening.jpeg",
  alt: "Wall-mounted home-control touchscreen and scene keypad illuminated in a dim interior",
  width: 1067,
  height: 1600
};

export const control4TouchscreenHallway = {
  src: "/images/synchro-spaces/control4-touchscreen-hallway.jpeg",
  alt: "Home-control touchscreen and scene keypad beside a warmly lit residential hallway",
  width: 1600,
  height: 1067
};

export const control4KeypadCollection = {
  src: "/images/synchro-spaces/control4-keypad-collection.jpeg",
  alt: "Three architectural wall controls in bronze, warm silver and brushed silver finishes",
  width: 1600,
  height: 1066
};

export const control4Logo = {
  src: "/images/synchro-spaces/control4-logo.jpeg",
  alt: "Control4",
  width: 1206,
  height: 982
};

export const videoDoorStation = {
  src: "/images/synchro-spaces/video-door-station.jpeg",
  alt: "Person pressing a wall-mounted video door station at a brick entrance",
  width: 1206,
  height: 670
};

export const exteriorSecurityCamera = {
  src: "/images/synchro-spaces/exterior-security-camera.jpeg",
  alt: "Exterior security camera mounted beneath the eaves of a home",
  width: 1206,
  height: 773
};

export const handheldMediaController = {
  src: "/images/synchro-spaces/handheld-media-controller.jpeg",
  alt: "Handheld media controller on a charging base with a television in the background",
  width: 1206,
  height: 801
};

export const homeTheatre = {
  src: "/images/synchro-spaces/home-theatre.jpeg",
  alt: "Home theatre with a projection screen and built-in audio equipment",
  width: 1206,
  height: 818
};

export const cinemaRoom = {
  src: "/images/synchro-spaces/cinema-room.jpeg",
  alt: "Dedicated cinema room with three displays and integrated ceiling speakers",
  width: 1206,
  height: 820
};

export const audioTouchscreen = {
  src: "/images/synchro-spaces/audio-touchscreen.jpeg",
  alt: "Wall-mounted touchscreen displaying music controls beside a softly furnished living room",
  width: 1206,
  height: 923
};

export const services: Service[] = [
  {
    id: "service-whole-home",
    title: "Whole-home automation",
    slug: "whole-home-automation",
    eyebrow: "One considered system",
    summary: "Bring lighting, curtains, comfort, entertainment and everyday scenes into one coherent experience.",
    audience: "residential",
    body: [
      "A well-planned smart home feels simple because the complexity has been resolved behind the scenes. The controls are clear, daily routines are easy to recall, and the system responds in ways that make sense to everyone in the home.",
      "Synchro Spaces begins with the rooms, routines and project constraints, then coordinates the infrastructure and control intent needed for a composed result."
    ],
    outcomes: ["Consistent room controls", "Purposeful scenes and schedules", "A clear plan for connected systems"],
    image: audioTouchscreen,
    relatedServiceSlugs: ["architectural-lighting", "residential-networking"],
    seoTitle: "Whole-Home Automation",
    seoDescription: "Explore whole-home automation planned around lighting, curtains, comfort, entertainment and everyday routines.",
    published: true
  },
  {
    id: "service-lighting",
    title: "Lighting & curtain control",
    slug: "architectural-lighting",
    eyebrow: "Atmosphere, simplified",
    summary: "Shape light, privacy and mood with clearly named scenes and controls that belong in the room.",
    audience: "both",
    body: [
      "Lighting and curtain control work best when they are considered alongside the interior. Thoughtful keypad locations and plainly named scenes keep daily use immediate while reducing visual clutter.",
      "The practical details—loads, power, curtain provision, device locations and manual overrides—are reviewed against the project before equipment is selected."
    ],
    outcomes: ["Clear scene-based control", "Coordinated curtain provision", "Simple local control and overrides"],
    image: control4TouchscreenHallway,
    relatedServiceSlugs: ["whole-home-automation", "integrated-security"],
    seoTitle: "Smart Lighting & Curtain Control",
    seoDescription: "Plan integrated lighting, curtain control and intuitive scenes around the way each room is used.",
    published: true
  },
  {
    id: "service-av",
    title: "Audio, video & entertainment",
    slug: "audio-video",
    eyebrow: "Technology you enjoy, not manage",
    summary: "Coordinate music, television and media so every source is easy to reach and every room remains visually calm.",
    audience: "both",
    body: [
      "Speakers, displays, source equipment and control become part of the space when they are planned early. Sightlines, sound, ventilation and cable routes all influence the finished experience.",
      "The goal is straightforward operation: choose what you want to watch or hear, select the room, and let the supporting system handle the sequence."
    ],
    outcomes: ["Simple source selection", "Discreet equipment planning", "Consistent room-to-room control"],
    image: homeTheatre,
    relatedServiceSlugs: ["whole-home-automation", "residential-networking"],
    seoTitle: "Integrated Audio, Video & Entertainment",
    seoDescription: "Plan integrated audio, video and entertainment with simple control and discreet infrastructure.",
    published: true
  },
  {
    id: "service-network",
    title: "Networking & infrastructure",
    slug: "residential-networking",
    eyebrow: "The quiet foundation",
    summary: "Give connected spaces the cabling, coverage and organised equipment foundation they rely on.",
    audience: "both",
    body: [
      "Reliable connected living starts with infrastructure: cable pathways, equipment space, power, ventilation and network coverage. These decisions deserve the same care as the visible controls.",
      "A considered rack and a legible installation make the system easier to commission, understand and support as needs change."
    ],
    outcomes: ["Planned wired and wireless coverage", "Organised equipment infrastructure", "Clearer service access"],
    image: integrationRack,
    relatedServiceSlugs: ["whole-home-automation", "audio-video"],
    seoTitle: "Smart-Home Networking & Infrastructure",
    seoDescription: "Build a considered network, cabling and equipment foundation for a connected home or commercial space.",
    published: true
  },
  {
    id: "service-security",
    title: "Integrated security",
    slug: "integrated-security",
    eyebrow: "Awareness, considered",
    summary: "Bring compatible cameras, video door stations, locks, gates, sensors and selected alarm controls into one considered interface.",
    audience: "both",
    body: [
      "Integrated security begins with clear visibility and deliberate control. Compatible cameras, video door stations, access devices and selected alarm interfaces can be coordinated so useful status is easier to understand without exposing sensitive detail.",
      "Every project is reviewed for compatibility and clear responsibility boundaries. Monitoring, emergency response and life-safety functions remain with the relevant specialist providers; passwords, alarm codes, door codes and detailed security layouts are never requested through this public website."
    ],
    outcomes: ["Coordinated camera and entry views", "Compatibility and privacy reviewed early", "Clear monitoring and life-safety boundaries"],
    image: exteriorSecurityCamera,
    relatedServiceSlugs: ["whole-home-automation", "residential-networking"],
    seoTitle: "Integrated Home Security",
    seoDescription: "Plan compatible cameras, entry devices and selected security interfaces with clear integration, privacy and life-safety boundaries.",
    published: true
  },
  {
    id: "service-comfort",
    title: "Comfort & daily routines",
    slug: "comfort-energy",
    eyebrow: "Responsive by design",
    summary: "Turn repeated actions into calm, memorable scenes while keeping manual control close at hand.",
    audience: "both",
    body: [
      "Useful automation is often a small set of routines that match real life: Welcome, Away, Entertain or Goodnight. Each scene can coordinate compatible systems while keeping the interaction familiar.",
      "Every routine is shaped around the occupants and tested with clear manual overrides, so automation remains helpful rather than intrusive."
    ],
    outcomes: ["Memorable everyday scenes", "Straightforward manual overrides", "Controls shaped around real routines"],
    image: control4KeypadWall,
    relatedServiceSlugs: ["architectural-lighting", "whole-home-automation"],
    seoTitle: "Smart-Home Scenes & Daily Routines",
    seoDescription: "Design useful Welcome, Away, Entertain and Goodnight scenes around the routines of a connected space.",
    published: true
  }
];

export const projects: Project[] = [
  {
    id: "project-residence-after-dark",
    title: "Residence after dark",
    slug: "residence-after-dark",
    location: "Private residence",
    propertyType: "Residential showcase",
    summary: "Warm exterior light gives a contemporary home presence after sunset while the technology stays out of sight.",
    brief: "This visual story explores the relationship between architecture, landscape and the connected details that support daily life. The client-supplied photography moves from the illuminated exterior to the controls and infrastructure within.",
    approach: [
      "Let architectural lighting reveal form and circulation instead of flattening the façade.",
      "Keep everyday actions close to hand through clearly labelled local controls.",
      "Bring control, audio and network equipment together in an organised central location."
    ],
    systems: ["Exterior lighting", "Scene control", "Curtain control", "Connected access", "Integrated infrastructure"],
    image: residenceNight,
    gallery: [residenceNight, residenceTwilight, sceneKeypadSix, sceneKeypadThree, smartLock, integrationRack],
    relatedServiceSlugs: ["whole-home-automation", "architectural-lighting", "residential-networking"],
    seoTitle: "Residence After Dark | Smart-Home Visual Story",
    seoDescription: "A visual story of warm architectural lighting, intuitive scene controls and organised smart-home infrastructure.",
    published: true
  },
  {
    id: "project-scenes-at-a-touch",
    title: "Scenes at a touch",
    slug: "scenes-at-a-touch",
    location: "Residential control",
    propertyType: "Interface detail",
    summary: "Welcome, Curtain and Away: controls named for the moment, not the equipment behind it.",
    brief: "The strongest smart-home interfaces use familiar language. Instead of asking people to remember circuits or device groups, a small number of clear scenes can coordinate the intended response.",
    approach: [
      "Name controls around actions people already understand.",
      "Keep essential local control available without relying on a phone.",
      "Review each scene with the people who will use it every day."
    ],
    systems: ["Scene keypads", "Lighting control", "Curtain control", "Daily routines"],
    image: control4TouchscreenHallway,
    gallery: [control4TouchscreenHallway, control4KeypadWall, control4TouchscreenEvening, sceneKeypadThree, sceneKeypadSix],
    relatedServiceSlugs: ["whole-home-automation", "architectural-lighting", "comfort-energy"],
    seoTitle: "Scenes at a Touch | Intuitive Smart-Home Control",
    seoDescription: "Explore scene-led smart-home controls built around clear actions such as Welcome, Curtain and Away.",
    published: true
  },
  {
    id: "project-hidden-backbone",
    title: "The hidden backbone",
    slug: "hidden-backbone",
    location: "Smart-home infrastructure",
    propertyType: "Systems detail",
    summary: "Control, audio and networking brought together in an organised rack behind the finished experience.",
    brief: "A calm room depends on decisions that are rarely seen. Centralised equipment needs considered power, ventilation, cabling, labelling and access so the visible experience can remain simple.",
    approach: [
      "Plan the equipment location and cable routes before finishes close access.",
      "Separate visible interactions from the technical backbone that supports them.",
      "Leave room for clear labelling, ventilation and practical service access."
    ],
    systems: ["Central control", "Audio distribution", "Managed network", "Equipment rack"],
    image: integrationRack,
    gallery: [integrationRack, sceneKeypadSix, smartLock],
    relatedServiceSlugs: ["residential-networking", "audio-video", "whole-home-automation"],
    seoTitle: "The Hidden Backbone | Smart-Home Infrastructure",
    seoDescription: "See how organised control, audio and network infrastructure supports a simple smart-home experience.",
    published: true
  }
];

export const articles: Article[] = [
  {
    id: "article-planning",
    title: "When to plan a smart home",
    slug: "when-to-involve-an-automation-integrator",
    summary: "The decisions that become easier—and less visible—when technology planning starts before electrical work is finalised.",
    category: "Planning",
    body: [
      { heading: "Earlier creates better options", paragraphs: ["The best time to discuss connected systems is while architectural and electrical drawings can still change. Keypad locations, curtain provision, equipment space, wireless coverage and cable pathways can then be resolved cleanly.", "Early involvement does not require every product choice to be final. It creates a coordinated foundation so later decisions remain practical."] },
      { heading: "Bring the right information", paragraphs: ["Floor plans, electrical drawings, room use, finish intent and the project programme are useful starting points. Never send passwords, alarm codes, door codes or detailed security layouts through a public enquiry form."] }
    ],
    image: residenceTwilight,
    publishedAt: "2026-08-31",
    updatedAt: "2026-09-05",
    reviewedAt: "2026-09-05",
    seoTitle: "When to Plan a Smart Home",
    seoDescription: "Learn when smart-home planning should begin and which design decisions benefit from early coordination.",
    published: true
  },
  {
    id: "article-network",
    title: "Why infrastructure belongs in the design conversation",
    slug: "network-in-the-design-conversation",
    summary: "A practical look at cabling, equipment space, coverage and the hidden backbone of reliable connected living.",
    category: "Infrastructure",
    body: [
      { heading: "Coverage is architectural", paragraphs: ["Concrete, metal, mirrors, service spaces and large floor plates all affect wireless performance. Access-point locations should be coordinated with ceilings and cabinetry instead of added wherever a signal happens to be weak after move-in."] },
      { heading: "Plan for the equipment", paragraphs: ["A rack needs power, ventilation, working clearance and clear labelling. An organised foundation makes commissioning and future service more focused."] }
    ],
    image: integrationRack,
    publishedAt: "2026-08-31",
    updatedAt: "2026-09-05",
    reviewedAt: "2026-09-05",
    seoTitle: "Smart-Home Network & Infrastructure Planning",
    seoDescription: "Understand how cabling, coverage and equipment space influence a reliable connected-home foundation.",
    published: true
  },
  {
    id: "article-control",
    title: "Designing controls everyone understands",
    slug: "designing-controls-for-guests",
    summary: "Why a successful smart space still needs obvious, local and forgiving controls.",
    category: "Experience",
    body: [
      { heading: "Local control still matters", paragraphs: ["A phone can be useful, but it should not be the only way to adjust a room. Clear keypads and sensible defaults help residents and guests use the space confidently."] },
      { heading: "Name scenes by intent", paragraphs: ["Labels such as Welcome, Curtain, Entertain and Away are easier to remember than technical zone names. The right vocabulary comes from the people using the space, not the equipment list."] }
    ],
    image: sceneKeypadSix,
    publishedAt: "2026-08-31",
    updatedAt: "2026-09-05",
    reviewedAt: "2026-09-05",
    seoTitle: "Designing Intuitive Smart-Space Controls",
    seoDescription: "Learn how local controls, scene names and thoughtful defaults make a smart space easier to use.",
    published: true
  }
];

// Location pages stay unpublished until the business confirms its service area.
export const serviceAreas: ServiceArea[] = [];

export const partners: Partner[] = [
  { id: "layer-control", name: "Unified control", category: "Experience", summary: "A consistent interface for the compatible systems selected for the project.", verificationRequired: false },
  { id: "layer-lighting", name: "Lighting & scenes", category: "Atmosphere", summary: "Keypads, dimming and scenes planned around rooms and routines.", verificationRequired: false },
  { id: "layer-network", name: "Network foundation", category: "Infrastructure", summary: "Wired and wireless infrastructure considered as part of the building.", verificationRequired: false },
  { id: "layer-media", name: "Audio & media", category: "Entertainment", summary: "Discreet equipment and straightforward room-to-room control.", verificationRequired: false },
  { id: "layer-access", name: "Access readiness", category: "Entry", summary: "Compatible access devices coordinated with clear security boundaries.", verificationRequired: false }
];

export const faqs: Faq[] = [
  { id: "faq-start", category: "planning", question: "When should smart-home planning begin?", answer: "Ideally before electrical work and interior details are finalised. Early coordination protects keypad locations, curtain provision, cable pathways, network coverage and equipment space." },
  { id: "faq-renovation", category: "planning", question: "Can an existing home be upgraded?", answer: "Often, yes. The practical scope depends on access to cable pathways, the electrical system, existing finishes, network conditions and equipment compatibility. A project review is the right first step." },
  { id: "faq-platform", category: "platform", question: "Can different systems work together?", answer: "Compatible lighting, curtains, comfort, audio, video and selected access devices can often share a consistent control experience. The exact scope is confirmed only after the products and project conditions are reviewed." },
  { id: "faq-credentials", category: "privacy", question: "Should I send passwords or access codes with my enquiry?", answer: "No. Never send automation credentials, alarm codes, door codes, network passwords or sensitive security layouts through this website. The enquiry form only collects the information needed to arrange a conversation." }
];

export const testimonials: Testimonial[] = [];
export const teamMembers: TeamMember[] = [];

export const processSteps = [
  { number: "01", title: "Listen", text: "Start with the people, the rooms, the routines and what the project should feel like." },
  { number: "02", title: "Plan", text: "Translate the brief into a clear scope, device locations, infrastructure and control intent." },
  { number: "03", title: "Coordinate", text: "Resolve interfaces and responsibilities with the design team and relevant trades." },
  { number: "04", title: "Integrate", text: "Install, configure and test the approved systems as one considered experience." },
  { number: "05", title: "Handover", text: "Walk through daily use, confirm the agreed scenes and leave a clear support path." }
];
