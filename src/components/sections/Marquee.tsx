type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  // Duplicate the list so the linear translate can loop seamlessly.
  const stream = [...items, ...items];

  return (
    <div
      aria-label="Aktuelle Themen"
      className="overflow-hidden bg-paper-100 font-brand uppercase text-navy-700"
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-subtle)",
        fontSize: 11,
        letterSpacing: "0.14em",
      }}
    >
      <div className="marquee-track flex gap-10 py-3 whitespace-nowrap will-change-transform">
        {stream.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{item}</span>
            <span aria-hidden="true" className="text-azure-600">
              ·
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes df-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: df-marquee var(--dur-marquee, 40s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
