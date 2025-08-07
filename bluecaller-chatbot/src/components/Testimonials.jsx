import { useEffect, useState } from "react";
import avatar1 from "/avatars/avatar1.jpg";
import avatar2 from "/avatars/avatar2.jpg";
import avatar3 from "/avatars/avatar3.jpg";

const testimonials = [
  {
    quote:
      "BlueCaller unlocked a steady stream of clients — my calendar is packed!",
    author: "Marco P.",
    avatar: avatar1,
    company: "MP Plumbing",
  },
  {
    quote: "The built‑in invoicing alone saves me hours every week.",
    author: "Sophie L.",
    avatar: avatar2,
    company: "Lumi Electric",
  },
  {
    quote: "It feels like LinkedIn, Yelp and QuickBooks rolled into one.",
    author: "Jessie R.",
    avatar: avatar3,
    company: "Ridge Renovations",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      8000
    );
    return () => clearInterval(id);
  }, []);

  const { quote, author, avatar, company } = testimonials[idx];
  return (
    <section id="testimonials" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-xl px-4 text-center">
        <blockquote className="text-2xl italic leading-relaxed md:text-3xl">
          “{quote}”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <img
            src={avatar}
            alt={author}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
