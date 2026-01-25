import React from "react";

const MarqueeLogos = () => {
  const companyLogos = [
    "sheba",
    "whiskas",
    "bakers",
    "felix",
    "goodboy",
    "bakers",
    "butcher",
    "pedigree",
  ];

  return (
    <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none h-auto py-2 mt-4">
      {/* Left Gradient */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      {/* Logos */}
      <div
        className="marquee-inner flex will-change-transform min-w-[200%]"
        style={{ animationDuration: "15s" }}
      >
        <div className="flex items-end">
          {[...companyLogos, ...companyLogos].map((company, index) => (
            <img
              key={index}
              src={`/img/logos/brand_${company}.svg`}
              alt={company}
              className="h-16 md:h-20 object-contain mx-6"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Right Gradient */}
      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

const SellersSection = () => {
  return (
    <div className="bg-white py-3">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Left part */}
        <div className="flex items-center gap-2">
          <p
            style={{
              color: "#000",
              fontFamily: "SVN-Gilroy",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "31px",
              margin: 0,
            }}
          >
            Proud to be part of
          </p>
          <h2
            style={{
              color: "var(--Primary-Color-Dark-Blue, #003459)",
              fontFamily: "SVN-Gilroy",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "36px",
              textTransform: "capitalize",
              margin: 1,
            }}
          >
            Pet Sellers
          </h2>
        </div>

        {/* Right part */}
        <a
          href="/sellers"
          style={{
            display: "flex",
            padding: "12px 28px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "57px",
            border: "1.5px solid var(--Primary-Color-Dark-Blue, #003459)",
            textDecoration: "none",
            color: "var(--Primary-Color-Dark-Blue, #003459)",
            fontFamily: "SVN-Gilroy",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          View all our sellers
        </a>
      </div>

      {/* Marquee Logos */}
      <MarqueeLogos />
    </div>
  );
};

export default SellersSection;
