import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#twitter" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "Instagram", href: "#instagram" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Speaktra Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">
                Speaktra
              </span>
            </Link>
            <p className="text-base text-slate-400">
              Professional English speaking app for working adults.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <h4 className="text-white font-semibold text-base mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-400 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-400 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-400 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base text-slate-500">
            © {new Date().getFullYear()} Speaktra. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-base text-slate-400 hover:text-brand-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
