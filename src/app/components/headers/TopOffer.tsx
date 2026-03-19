import { useHistory } from "react-router-dom";

export default function TopOffer() {
  const history = useHistory();

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-md animate-pulse">
            Launch Offer
          </span>

          <span className="hidden sm:inline">
            Free delivery for orders over
          </span>

          <span className="font-bold">$49.99</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => history.push("/products")}
          className="ml-4 bg-white text-blue-600 font-semibold px-4 py-1.5 rounded-md text-xs sm:text-sm hover:bg-blue-50 transition transform hover:scale-105"
        >
          Shop Now →
        </button>
      </div>
    </div>
  );
}
