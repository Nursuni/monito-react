import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Pet Events & Workshops</span>
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value, index) => (
            <SwiperSlide key={index} className={"events-info-frame"}>
              <div className={"events-img"}>
                <img
                  src={value.img}
                  className={"events-img"}
                  alt={value.title}
                />
              </div>
              <Box className={"events-desc"}>
                <Box className={"events-bott"}>
                  <Box className={"bott-left"}>
                    <div className={"event-title-speaker"}>
                      <strong>{value.title}</strong>
                      <div className={"event-organizator"}>
                        <img src={"/icons/speaker.svg"} alt="organizer" />
                        <p className={"spec-text-author"}>{value.author}</p>
                      </div>
                    </div>

                    <p className={"text-desc"}>{value.desc}</p>

                    <div className={"bott-info"}>
                      <div className={"bott-info-main"}>
                        <img src={"/icons/calendar.svg"} alt="date" />
                        {value.date}
                      </div>
                      <div className={"bott-info-main"}>
                        <img src={"/icons/location.svg"} alt="location" />
                        {value.location}
                      </div>
                    </div>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box className={"prev-next-frame"}>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-prev"}
            alt="prev"
          />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{ transform: "rotate(-180deg)" }}
            alt="next"
          />
        </Box>
      </Stack>
    </div>
  );
}
