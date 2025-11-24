import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00a0" : char}
    </span>
  ));
};
const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  console.log(letters);
  const { min, max, default: base } = FONT_WEIGHTS[type];
  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      fontVariationSettings: `'wght' ${weight}`,
      duration,
      ease: "power2.out",
    });
  };
  const handleMouseMove = (e) => {
    const left = container.getBoundingClientRect().left;
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base);
    });
  };
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  useGSAP(() => {
    setupTextHover(subtitleRef.current, "subtitle");
    setupTextHover(titleRef.current, "title");
  }, []);
  return (
    <section id="welcome">
      <p ref={subtitleRef} className="">
        {renderText("Hey I'm Aadit! Welcome to my", "text-3xl", 100)}
      </p>
      <h1 ref={titleRef} className=" mt-7">
        {renderText("Portfolio", "text-9xl italic", 100)}
      </h1>
      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
