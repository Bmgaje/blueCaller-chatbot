import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('bluecaller-chatbot/public/avatars/hero-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-3xl px-4 text-center text-white">
        <h1 className="text-5xl font-bold md:text-6xl">
          The social network & marketplace <br /> for skilled trades
        </h1>
        <p className="mt-6 text-lg">
          Build your reputation, find work, and manage projects in one place.
        </p>
        <Link
          to="/auth?mode=signup"
          className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-medium hover:bg-blue-700"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
