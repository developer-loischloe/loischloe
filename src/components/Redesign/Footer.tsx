import Link from "next/link";

export default function RedesignFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border !max-w-none">
      {/* Guarantee strip */}
      <div className="border-b border-border bg-[color-mix(in_oklch,var(--cream-dark)_60%,transparent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-center text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
          FREE SHIPPING ON ORDERS $75+ &nbsp;·&nbsp; 60% SATISFACTION AND PRIVACY GUARANTEE
        </div>
      </div>

      <div className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link
            href="/"
            className="font-display text-lg sm:text-xl font-bold text-foreground"
          >
            olivia shop
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/products" className="rd-footer-link">
              Categories
            </Link>
            <Link href="/blog" className="rd-footer-link">
              Blog
            </Link>
            <Link href="/about-us" className="rd-footer-link">
              About
            </Link>
            <Link href="/contact" className="rd-footer-link">
              Community
            </Link>
            <Link href="/contact" className="rd-footer-link">
              Contacts
            </Link>
          </nav>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>© {year}</span>
            <span>·</span>
            <span>EN</span>
            <span>·</span>
            <span>$</span>
          </div>
        </div>
      </div>

      <style>{`
        .rd-footer-link {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: hsl(var(--muted-foreground));
          transition: color 160ms ease;
        }
        .rd-footer-link:hover { color: hsl(var(--foreground)); }
        @media (min-width: 640px) {
          .rd-footer-link { font-size: 12px; }
        }
      `}</style>
    </footer>
  );
}
