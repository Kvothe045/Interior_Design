"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Award,
  Users,
  Home,
  Palette,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";
import Link from "next/link";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [ratingsVisible, setRatingsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [ratingsAnimatedValues, setRatingsAnimatedValues] = useState([0, 0, 0]);
  const [statsAnimatedValues, setStatsAnimatedValues] = useState([0, 0, 0, 0]);
  const ratingsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Home, label: "Projects Completed", value: 150, suffix: "+" },
    { icon: Users, label: "Happy Clients", value: 120, suffix: "+" },
    { icon: Award, label: "Years Experience", value: 10, suffix: "+" },
    { icon: Palette, label: "Design Awards", value: 15, suffix: "+" },
  ];

  const ratings = [
    { icon: Users, label: "Happy Clients", value: 100, suffix: "+" },
    { icon: Star, label: "Average Rating", value: 4.8, suffix: "/5" },
    { icon: Award, label: "Projects Completed", value: 50, suffix: "+" },
  ];

  const achievements = [
    "Featured in Architectural Digest",
    "Winner of Interior Design Excellence Award 2024",
    "Certified by International Interior Design Association",
  ];

  // Enhanced easing functions
  const easeOutBack = (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easeOutElastic = (x: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  };

  // Enhanced counter animation with multiple easing options
  const animateValue = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void,
    delay: number = 0,
    easingType: "elastic" | "back" | "bounce" = "elastic"
  ) => {
    setTimeout(() => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let easedProgress;
        switch (easingType) {
          case "elastic":
            easedProgress = easeOutElastic(progress);
            break;
          case "back":
            easedProgress = easeOutBack(progress);
            break;
          case "bounce":
            easedProgress =
              progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            break;
          default:
            easedProgress = easeOutElastic(progress);
        }

        const currentValue = start + (end - start) * easedProgress;

        // Handle decimal values for ratings
        if (end < 10 && end % 1 !== 0) {
          callback(Math.round(currentValue * 10) / 10);
        } else {
          callback(Math.floor(currentValue));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);
  };

  // Separate observer for ratings section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !ratingsVisible) {
            setRatingsVisible(true);

            ratings.forEach((rating, index) => {
              animateValue(
                0,
                rating.value,
                2500,
                (value) => {
                  setRatingsAnimatedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = value;
                    return newValues;
                  });
                },
                index * 300,
                index === 1 ? "back" : "elastic" // Different easing for rating
              );
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ratingsRef.current) {
      observer.observe(ratingsRef.current);
    }

    return () => {
      if (ratingsRef.current) {
        observer.unobserve(ratingsRef.current);
      }
    };
  }, [ratingsVisible]);

  // Separate observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);

            stats.forEach((stat, index) => {
              animateValue(
                0,
                stat.value,
                3000,
                (value) => {
                  setStatsAnimatedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = value;
                    return newValues;
                  });
                },
                index * 200,
                "bounce"
              );
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [statsVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="relative bg-gray-50 overflow-hidden">
      {/* RATINGS Section */}
      {/* <div
        ref={ratingsRef}
        className={`relative bg-white py-16 overflow-hidden transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      > */}

        {/* Content Container */}
        {/* <div className="relative z-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 gap-16 max-w-6xl mx-auto">
            {ratings.map((stat, index) => (
              <div
                key={index}
                className={`group relative bg-white/10 backdrop-blur-xl p-8 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-white/30 hover:bg-white/15 hover:shadow-2xl hover:shadow-white/10 ${
                  ratingsVisible ? "animate-bounce-in" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
                onMouseEnter={() => setActiveCard(100 + index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                      ratingsVisible
                        ? "group-hover:scale-110 group-hover:rotate-12"
                        : ""
                    }`}
                  >
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div
                      className={`text-4xl font-bold text-white mb-2 transition-all duration-300 ${
                        ratingsVisible ? "transform scale-110" : ""
                      }`}
                    >
                      <span className="inline-block tabular-nums">
                        {ratingsAnimatedValues[index] || 0}
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-white/80 text-sm font-medium uppercase tracking-wider group-hover:text-white/70 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white via-white/80 to-white transition-all duration-300 ${
                    activeCard === 100 + index ? "w-full" : "w-0"
                  }`}
                ></div>

                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div> */}

      {/* </div> */}

      <div className="relative container mx-auto px-6 py-20 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-xs sm:text-sm font-medium rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            FOUNDER
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-black mb-4 tracking-tight leading-tight"  style={{ fontFamily: "DM Serif Text" }}>
            Teeksha
            <span className="block font-bold">Gupta</span>
          </h2>

          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div
            className={`lg:col-span-7 space-y-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-8">
              <div className="relative px-4 sm:px-6 md:px-8">
                <Quote className="absolute -top-4 -left-4 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-black/20" />

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-black leading-relaxed pl-8 sm:pl-10"  style={{ fontFamily: "DM Serif Text" }}>
                  Creating spaces that tell stories, evoke emotions, and
                  transform the way people experience their environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/10"  style={{ fontFamily: "DM Serif Text" }}>
                <div>
                  <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider">
                    Philosophy
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    With over 10 years of experience, I believe great design
                    transcends aesthetics—it's about creating functional art
                    that enhances daily life and reflects individual
                    personality.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wider">
                    Approach
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every project begins with understanding your story. I blend
                    contemporary innovation with timeless principles to craft
                    spaces that are both striking and deeply personal.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative bg-white p-8 transition-all duration-500 cursor-pointer border-2 border-transparent transform ${
                    activeCard === index
                      ? "border-white shadow-2xl scale-105"
                      : "hover:shadow-xl hover:scale-102"
                  } ${statsVisible ? "animate-bounce-in" : ""}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="text-center space-y-4">
                    <div
                      className={`w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                        statsVisible
                          ? "group-hover:scale-110 group-hover:rotate-12"
                          : ""
                      }`}
                    >
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className={`text-3xl font-bold text-black transition-all duration-300 ${
                          statsVisible ? "transform scale-110" : ""
                        }`}
                      >
                        <span className="inline-block tabular-nums">
                          {statsAnimatedValues[index] || 0}
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-2">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
                      activeCard === index ? "w-full bg-black" : "w-0 bg-black"
                    }`}
                  ></div> */}
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-white p-8 border-l-4 border-black"  style={{ fontFamily: "DM Serif Text" }}>
              <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wider">
                Recognition
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-2 h-2 bg-black rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 font-light">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-8 bg-black/5 rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                <div className="relative bg-white p-4 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:-rotate-1">
                  <img
                    src="/TeekshaGupta.png"
                    alt="Teeksha Gupta - Interior Designer"
                    className="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-black text-white px-6 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 fill-current" />
                    <div>
                      <div className="text-sm font-bold">Award Winner</div>
                      <div className="text-xs opacity-80">2024</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-black/20 rotate-45"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-black/10 rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/about">
            <button className="group relative inline-flex items-center px-8 py-4 bg-black text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-gray-800 hover:shadow-xl active:scale-95">
              <span className="mr-4 transition-all duration-300 group-hover:tracking-widest"  style={{ fontFamily: "DM Serif Text" }}>
                Learn More About Us
              </span>
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .scale-102 {
          transform: scale(1.02);
        }

        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </section>
  );
};

export default About;
