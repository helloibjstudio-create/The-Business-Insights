import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: 1,
      name: "Navigating the Opportunities and Challenges of Vogue Minerals in Africa",
      sector: "Mining",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575547/Mask_group_mpvsaf.png",
      description:
        "The surge in demand for vogue minerals, including lithium, graphite, and cobalt has captured the attention of investors and developers.",
      year: "2024",
      link: "/exclusive/1",
      country: "Africa",
      write_up: "Full article content here...",
    },
    {
      id: 2,
      name: "Chile’s Copper Production and Advancements",
      sector: "Mining",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575803/Mask_group_t8asf2.png",
      description: "A deep dive into Chile’s advancements in copper production.",
      year: "2024",
      link: "/exclusive/2",
      country: "Chile",
      write_up: "Full article content here...",
    },
    {
      id: 3,
      name: "Singapore’s Aerospace Industry Looks to Automation and Disruptive Technologies for Growth",
      sector: "Aerospace",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575899/CTA_cy8dov.png",
      description:
        "Automation and disruptive technologies are shaping the next generation.",
      year: "2024",
      link: "/exclusive/3",
      country: "Singapore",
      write_up: "Full article content here...",
    },
    {
      id: 4,
      name: "India’s Pharma Industry: Navigating Beyond Pandemic Triumphs",
      sector: "Healthcare",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575978/CTA_k8o6ka.png",
      description:
        "India’s pharmaceutical sector continues to evolve beyond post-pandemic wins.",
      year: "2024",
      link: "/exclusive/4",
      country: "India",
      write_up: "Full article content here...",
    },
  ];

  return NextResponse.json(data);
}