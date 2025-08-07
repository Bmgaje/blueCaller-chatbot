import { Hammer, Star, ClipboardList } from "lucide-react";

const features = [
  {
    Icon: Hammer,
    title: "Find Jobs",
    desc: "Browse and bid on nearby projects in seconds.",
  },
  {
    Icon: Star,
    title: "Build Reputation",
    desc: "Collect verified reviews and climb search rankings.",
  },
  {
    Icon: ClipboardList,
    title: "Manage Projects",
    desc: "Estimates, invoices & progress tracking built‑in.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        Features built for tradespeople
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="rounded-2xl bg-white p-8 shadow">
            <Icon size={32} className="mb-4 text-blue-600" />
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
