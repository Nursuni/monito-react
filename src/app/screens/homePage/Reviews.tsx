import React from "react";

type Review = {
  name: string;
  text: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    text: "I love shopping at Monito! The pet food quality is excellent and my dog absolutely loves it. Fast delivery and great packaging.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    text: "Monito has the best selection of pet toys and accessories. Prices are reasonable and everything arrived exactly as described.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    text: "The customer service is amazing. I ordered supplies for my rescue dog and everything was high quality and affordable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Wilson",
    text: "I regularly buy food and supplements from Monito. The products are authentic and my senior dog is doing great.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Jessica Taylor",
    text: "Monito is my go-to pet shop online. Delivery is fast and the product descriptions are very accurate.",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Robert Thompson",
    text: "Great quality pet products and very reliable service. Monito made it easy to keep my lab healthy and happy.",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
            Customer Reviews
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by Pet Lovers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            See what our customers say about shopping pet products at Monito.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
            >
              <div className="text-4xl text-orange-400 mb-4">“</div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {review.text}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold text-gray-800">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
