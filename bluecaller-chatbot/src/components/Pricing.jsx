import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 0,
    features: ["Profile & portfolio", "Bid on 3 jobs/mo", "Basic support"],
    cta: { label: "Get Started", url: "/auth?mode=signup" },
  },
  {
    name: "Pro",
    price: 29,
    features: ["Unlimited bids", "Priority ranking", "Invoicing & payments"],
    cta: { label: "Go Pro", url: "/auth?mode=signup" },
    highlighted: true,
  },
  {
    name: "Team",
    price: 79,
    features: ["3 seats", "Job dispatch", "Team analytics"],
    cta: { label: "Contact Sales", url: "mailto:sales@bluecaller.com" },
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        Simple Pricing
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map(({ name, price, features, cta, highlighted }) => (
          <div
            key={name}
            className={`rounded-2xl p-8 shadow ${
              highlighted ? "border-2 border-blue-600" : "bg-white"
            }`}
          >
            <h3 className="mb-4 text-xl font-semibold">{name}</h3>
            <p className="mb-6 text-4xl font-bold">
              {price === 0 ? "Free" : `$${price}`}
              {price !== 0 && <span className="text-lg font-normal">/mo</span>}
            </p>
            <ul className="mb-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={16} className="mt-1 text-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <a
              href={cta.url}
              className="block rounded-lg bg-blue-600 px-5 py-3 text-center text-white hover:bg-blue-700"
            >
              {cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
