import React from "react";

export default function DiscountHero() {
  return (
    <section className="w-full px-4 mt-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-[#FFF3DB] flex items-stretch min-h-[360px]">
          {/* LEFT IMAGE AREA */}
          <div className="relative w-1/2 flex items-end pl-10">
            <img
              src="/img/products-dogs.png"
              alt="Pets"
              className="max-h-[300px] object-contain self-end"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-1/2 bg-[#062E4F] text-white rounded-[40px] px-14 py-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold leading-tight">Launch Offer</h2>

            <p className="text-xl mt-3 font-medium">
              Free delivery for orders over{" "}
              <span className="text-yellow-300">$49.99</span>
            </p>

            <p className="text-sm text-gray-300 mt-4 max-w-md">
              Limited-time deal! Enjoy fast delivery and premium products for
              your beloved pets.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button className="border border-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white hover:text-[#062E4F] transition">
                View Details
                <span className="border border-white rounded-full w-6 h-6 flex items-center justify-center">
                  ▶
                </span>
              </button>

              <button className="bg-white text-[#062E4F] px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
