export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 px-4 py-16 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-xl font-bold text-white">BlueCaller</h3>
          <p className="text-sm">
            The social network and marketplace for skilled trades.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Product</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/terms">Terms</a>
            </li>
            <li>
              <a href="/privacy">Privacy</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-xs">
        © {year} BlueCaller Clone. All rights reserved.
      </p>
    </footer>
  );
}
