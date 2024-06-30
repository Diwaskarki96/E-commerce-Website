import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import TypeWriter from "../components/TypeWriter";

export default function Home() {
  return (
    <>
      <TypeWriter />
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            height: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGxhcHRvcHxlbnwwfDB8MHx8fDA%3D)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div
            className="title"
            data-swiper-parallax="-300"
            style={{ color: "black" }}
          >
            Introducing the M3 Air Laptop
          </div>
          <div
            className="subtitle"
            data-swiper-parallax="-200"
            style={{ color: "black" }}
          >
            The Future of Portable Computing
          </div>
          <div
            className="text"
            data-swiper-parallax="-100"
            style={{ color: "black" }}
          >
            <p>
              {`The M3 Air Laptop is a game-changer in the world of portable
              computing. With its sleek design, powerful performance, and
              unmatched portability, it's the perfect companion for both work
              and play.`}
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="title"
            data-swiper-parallax="-300"
            style={{ color: "black" }}
          >
            Unmatched Performance
          </div>
          <div
            className="subtitle"
            data-swiper-parallax="-200"
            style={{ color: "black" }}
          >
            Power at Your Fingertips
          </div>
          <div
            className="text"
            data-swiper-parallax="-100"
            style={{ color: "black" }}
          >
            <p>
              {`The M3 Air Laptop's high-resolution display offers stunning
              visuals, while the advanced M3 processor ensures smooth
              multitasking. Experience the power and performance like never
              before.`}
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="title"
            data-swiper-parallax="-300"
            style={{ color: "black" }}
          >
            Long-lasting Battery Life
          </div>
          <div
            className="subtitle"
            data-swiper-parallax="-200"
            style={{ color: "black" }}
          >
            Stay Productive All Day
          </div>
          <div
            className="text"
            data-swiper-parallax="-100"
            style={{ color: "black" }}
          >
            <p>
              {`The M3 Air Laptop boasts a long-lasting battery, so you can stay
              productive all day. Whether you're a student, a professional, or a
              digital nomad, the M3 Air Laptop is designed to keep up with your
              on-the-go lifestyle.`}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
