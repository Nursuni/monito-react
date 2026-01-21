import React from "react";

export default function Advertisement() {
  return (
    <div className="ads-frame homepage">
      <video
        className="ads-video"
        autoPlay
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source src="video/monito-ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
