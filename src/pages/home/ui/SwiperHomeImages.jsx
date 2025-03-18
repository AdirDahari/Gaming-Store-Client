import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

import "../../../style/tailwind-swiper.css";

const baseUrl = import.meta.env.BASE_URL;

const SwiperHomeImages = () => {
  return (
    <div className="w-full my-4">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        className="swiper-container"
      >
        {[
          "imageHomeSwiper1.jpg",
          "imageHomeSwiper5.jpg",
          "imageHomeSwiper7.jpg",
          "imageHomeSwiper4.jpg",
          "imageHomeSwiper3.jpg",
          "imageHomeSwiper2.jpg",
          "imageHomeSwiper6.jpg",
        ].map((img, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={`${baseUrl}/assets/img/swiper/${img}`}
              alt={`Game ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperHomeImages;
