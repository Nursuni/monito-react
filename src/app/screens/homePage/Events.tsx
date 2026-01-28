import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <Stack className="max-w-7xl mx-auto space-y-8">
        <Box className="text-center">
          <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Pet Events & Workshops
          </span>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </Box>

        <Swiper
          className="!pb-12 w-full"
          slidesPerView="auto"
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
            <SwiperSlide key={index} className="!w-[380px]">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-[520px] flex flex-col">
                <div className="relative h-[240px] overflow-hidden flex-shrink-0">
                  <img
                    src={value.img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={value.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                <Box className="p-6 flex flex-col flex-grow">
                  <Box className="flex flex-col h-full justify-between">
                    <Box className="space-y-3">
                      <div className="space-y-2">
                        <strong className="text-xl font-bold text-gray-900 block leading-tight line-clamp-2">
                          {value.title}
                        </strong>
                        <div className="flex items-center gap-2 text-gray-500">
                          <img
                            src="/icons/speaker.svg"
                            alt="organizer"
                            className="w-4 h-4 opacity-60"
                          />
                          <p className="text-sm font-medium">{value.author}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                        {value.desc}
                      </p>
                    </Box>

                    <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <img
                            src="/icons/calendar.svg"
                            alt="date"
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {value.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                          <img
                            src="/icons/location.svg"
                            alt="location"
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {value.location}
                        </span>
                      </div>
                    </div>
                  </Box>
                </Box>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </div>
  );
}
