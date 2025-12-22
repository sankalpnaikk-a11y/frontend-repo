// src/utils/animations.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSiteAnimations() {
  // Respect reduced motion
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  // Hero title & subtitle entrance
  gsap.from(".hero-title", {
    y: 22,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.1,
  });
  gsap.from(".hero-sub", {
    y: 16,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.18,
  });

  // CTA buttons - subtle stagger
  gsap.from(".btn-main, .btn-secondary", {
    y: 8,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.3,
  });

  // Panels: fade/slide when they enter viewport
  gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Soft parallax on the hero heading (very subtle)
  gsap.to(".hero-title", {
    y: "-=6",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-title",
      start: "top top",
      end: "bottom+=200 top",
      scrub: 0.7,
    },
  });

  // Slight float on the logo icon (loop)
  gsap.to(".logo-float", {
    y: -6,
    yoyo: true,
    repeat: -1,
    duration: 3.2,
    ease: "sine.inOut",
    opacity: 0.98,
  });

  // Button hover micro-tilt (optional: add to style only)
  const ctas = document.querySelectorAll(".btn-main, .preset-btn");
  ctas.forEach((btn) => {
    btn.addEventListener("mouseenter", () =>
      gsap.to(btn, { scale: 1.02, duration: 0.18 })
    );
    btn.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.18 })
    );
  });
}
