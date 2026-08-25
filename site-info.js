/**
 * Prime Music Institute — edit all public copy here
 */
window.PMI_SITE = {
  meta: {
    description:
      "Prime Music Institute is a music school at 89a Wyralla Ave, Epping, NSW 2121 (since 2017) offering violin, viola, cello, piano, flute, clarinet and oboe lessons, plus HSC Music 2 / Extension — led by Founder Sooa Chae (Sydney Conservatorium of Music).",
  },

  hero: {
    eyebrow: "",
    titleBefore: "Prime Music",
    titleAccent: "Institute",
    tagline: "Unlock your musical genius.",
    instruments: "",
    leadHtml: "",
  },

  about: {
    titleBefore: "Nurturing musical growth through",
    titleAccent: "creativity & excellence",
    titleAfter: "",
    body:
      "Prime Music Institute has been teaching in Epping since 2017. Our students range from young beginners through to teens preparing for HSC and AMEB exams, and plenty of adults coming back to an instrument after years away. We teach strings, piano, and woodwinds. Lessons are led by Founder Sooa Chae, a conservatorium-trained musician with a student-centred teaching approach.",
    stats: [
      { value: "2017", label: "Established — serving Epping, NSW" },
      { value: "All ages", label: "Professional music education" },
      { value: "1:1 & ensemble", label: "Individual & group lessons" },
    ],
  },

  programs: {
    intro:
      "Tuition across strings, piano, and woodwinds — with flexible individual and ensemble options.",
    items: [
      {
        title: "Piano",
        text:
          "Classical technique, musicianship, and expressive performance — suitable for beginners through advancing students.",
      },
      {
        title: "Strings",
        text:
          "Violin, viola, and cello. Posture, tone production, and repertoire from foundational studies to performance-ready playing.",
      },
      {
        title: "Woodwinds",
        text:
          "Flute, clarinet, and oboe. Breath control, embouchure, and confident reading skills in a supportive setting.",
      },
      {
        title: "HSC Music 2 / Extension",
        text:
          "Focused preparation for HSC Music 2 and Extension with tailored repertoire, performance coaching, and exam strategy.",
      },
    ],
  },

  founder: {
    members: [
      {
        name: "SOOA CHAE",
        role: "FOUNDER",
        image: "assets/images/faculty-sooa-chae.png",
        imageClass: "",
        profile:
          "Founder of Prime Music Institute, combining professional performance expertise with a student-centred teaching philosophy to nurture confident and expressive musicians.",
        sections: [
          {
            title: "Education & Certification",
            items: [
              "Sydney Conservatorium of Music – Piano Performance Scholarship",
              "Studied under SunYi (Associate Concertmaster, Sydney Symphony Orchestra)",
            ],
          },
          {
            title: "Achievements",
            items: [
              "Gold Prize & Special Award – Piano Division",
              "Grand Prize – Strings Division (Violin)",
              "Multiple Competition Awards (Violin & Piano)",
            ],
          },
          {
            title: "Experience",
            items: [
              "Founder, Prime Music Institute",
              "Head Violin Teacher, SunYi Music",
              "Prac Teacher, James Ruse Agricultural High School",
              "Conductor, Sydney North Public School Symphonic Band",
              "1st Violinist, Korean Orchestra",
              "Music Therapy Volunteer Program",
              "Scholarship & Competition Preparation Specialist",
            ],
          },
        ],
      },
    ],
  },

  /**
   * Official social profile URLs (full https:// links only).
   * Helps Google connect your website, Maps listing, and Instagram.
   * Example: "https://www.instagram.com/your_handle/"
   */
  social: {
    instagram: "https://www.instagram.com/primemusicinstitute_sydney/",
  },

  contact: {
    intro:
      "We’d love to hear from you. Call or send a message to ask about lessons, levels, and availability at our Epping studio.",
    address: "89a Wyralla Ave, Epping NSW 2121",
    phoneDisplay: "0415 344 297",
    /** Use international form for reliable mobile dial */
    phoneTel: "+61415344297",
    hours: "Monday - Friday 3:30 pm - 9:30 pm\nSaturday 9:00 am - 8:00 pm\nSunday 9:00 am - 1:00 pm",

    /**
     * Contact form delivery.
     *
     * 1) Sign up at https://formspree.io (free tier ≈ 50 submissions/month).
     * 2) Create a new form, set the receiving email, then copy the form's ID
     *    (the part after `/f/` in the action URL — looks like "xrgnvlqz").
     * 3) Paste it below as `formspreeId`. The contact form on index.html will
     *    immediately start delivering submissions to your verified email.
     *
     * Until `formspreeId` is filled in, the form falls back to opening the
     * visitor's mail app (mailto) using `formFallbackEmail` below.
     */
    formspreeId: "xgodlbgo",
    formFallbackEmail: "Sooachae1@gmail.com",
  },
};
