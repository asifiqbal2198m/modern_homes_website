import curtains from "../assets/images/products/curtains.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import wallpaper from "../assets/images/products/wallpaper.jpg";
import livingRoom from "../assets/images/gallery/demo-living-room.png";

export const demoProjects = [
  {
    slug: "warm-living-room",
    type: "Living room",
    title: "Warm, layered living room",
    before: wallpaper,
    after: livingRoom,
    summary: "A calm, collected living space built around balanced light, texture, and a soft contemporary palette.",
    materials: ["Designer wallcovering", "Layered curtains", "Accent lighting"],
    duration: "4–6 days",
  },
  {
    slug: "tailored-window-design",
    type: "Window styling",
    title: "Tailored light and privacy",
    before: wallpaper,
    after: curtains,
    summary: "Custom window treatments add softness, privacy, and a more finished architectural feel to the room.",
    materials: ["Custom curtains", "Premium tracks", "Light-filtering lining"],
    duration: "2–4 days",
  },
  {
    slug: "grounded-flooring",
    type: "Flooring",
    title: "A warmer everyday foundation",
    before: wallpaper,
    after: flooring,
    summary: "Durable flooring gives the whole home a practical upgrade while creating a more cohesive, welcoming look.",
    materials: ["Wood-look flooring", "Underlay", "Precision trims"],
    duration: "3–5 days",
  },
];
