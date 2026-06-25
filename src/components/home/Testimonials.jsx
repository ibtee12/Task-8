"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa6";
import { FiStar } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    name: "Amelia Rhodes",
    role: "Avid reader",
    quote:
      "Inkwell completely changed how I discover books. The category filters are spot-on and borrowing takes literally one click.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Daniel Okonkwo",
    role: "Software engineer",
    quote:
      "The tech section is a goldmine. I borrowed three architecture books in a week — clean interface, zero friction.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Priya Raman",
    role: "Graduate student",
    quote:
      "I love that there are no late fees and returns are instant. It feels like a library that actually respects my time.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Marcus Bell",
    role: "Book club host",
    quote:
      "Our whole book club switched to Inkwell. The featured picks always spark a great conversation at our meetups.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
];

/**
 * Extra section #3 — Reader testimonials.
 * Uses Swiper.js (the chosen npm package for the challenge) for an
 * auto-playing, swipeable carousel with responsive slides-per-view.
 */
export default function Testimonials() {
  return (
    <section className="bg-base-200/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Loved by readers
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            What Our Readers Say
          </h2>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name} className="h-auto">
                <figure className="flex h-full flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-7 shadow-sm">
                  <FaQuoteLeft className="h-7 w-7 text-secondary/60" />
                  <blockquote className="flex-1 text-base-content/80">
                    “{t.quote}”
                  </blockquote>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="h-4 w-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-base-300 pt-4">
                    {/* Plain img is fine here — small, fixed-size avatars */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-base-content/60">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
