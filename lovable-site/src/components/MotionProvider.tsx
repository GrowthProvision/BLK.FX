import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider() {
  const routeKey = useRouterState({ select: (state) => `${state.location.pathname}${state.location.hash}` });
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let lenis: Lenis | undefined;
    let contexts: gsap.Context | undefined;
    let frame = 0;
    let refreshTimer = 0;
    const cleanups: Array<() => void> = [];
    const start = window.setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      const instance = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis = instance;
      const raf = (time: number) => { instance.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      const update = () => ScrollTrigger.update();
      instance.on("scroll", update);
      contexts = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children);
        gsap.fromTo(items, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .07, ease: "power3.out", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: group, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".team-grid img,.insight-card>div,.article-hero>img").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 100% 0 0)", scale: 1.06 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1, ease: "power3.inOut", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const end = Number(element.dataset['count'] ?? 0);
        const decimals = Number(element.dataset['decimals'] ?? 0);
        const suffix = element.dataset['suffix'] ?? "";
        const state = { value: 0 };
        element.textContent = `0${suffix}`;
        gsap.to(state, { value: end, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", once: true }, onUpdate: () => { element.textContent = `${state.value.toFixed(decimals)}${suffix}`; } });
      });
      gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((element) => {
        gsap.fromTo(element, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left", scrollTrigger: { trigger: element, start: "top 85%", once: true } });
      });
      const journey = document.querySelector<HTMLElement>("[data-journey-line]");
      if (journey) gsap.fromTo(journey, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "power2.inOut", transformOrigin: "left", scrollTrigger: { trigger: journey, start: "top 80%", once: true } });
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) gsap.to(hero, { scale: 0.94, y: 70, opacity: 0.5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".image-hero").forEach((element) => gsap.to(element, { backgroundPositionY: "58%", ease: "none", scrollTrigger: { trigger: element, start: "top top", end: "bottom top", scrub: true } }));
      const serviceTrack = document.querySelector<HTMLElement>("[data-service-track]");
      const servicePin = document.querySelector<HTMLElement>("[data-service-pin]");
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        if (!serviceTrack || !servicePin) return undefined;
        const distance = () => Math.max(0, serviceTrack.scrollWidth - window.innerWidth + 96);
        return gsap.to(serviceTrack, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: servicePin, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } });
      });
      cleanups.push(() => media.revert());
      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((element) => {
        const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
        const original = textNode?.textContent ?? "";
        if (!textNode || !original.trim()) return;
        ScrollTrigger.create({ trigger: element, start: "top 92%", once: true, onEnter: () => {
          let step = 0; const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
           const timer = window.setInterval(() => { textNode.textContent = original.split("").map((char,index) => char === " " || index < step ? char : chars[Math.floor(Math.random()*chars.length)]).join(""); step += Math.max(1.8,original.length/22); if(step >= original.length){textNode.textContent=original;window.clearInterval(timer)} }, 24);
           const resolveTimer = window.setTimeout(() => { window.clearInterval(timer); textNode.textContent=original; }, 580);
           cleanups.push(() => { window.clearInterval(timer); window.clearTimeout(resolveTimer); textNode.textContent=original; });
        }});
      });
      document.querySelectorAll<HTMLElement>("button,a.arrow-link,.hero-actions a").forEach((element) => {
        const move = (event: PointerEvent) => { const box=element.getBoundingClientRect(); gsap.to(element,{x:(event.clientX-box.left-box.width/2)*.12,y:(event.clientY-box.top-box.height/2)*.12,duration:.25}); };
        const leave = () => gsap.to(element,{x:0,y:0,duration:.5,ease:"elastic.out(1,.4)"});
        element.addEventListener("pointermove",move); element.addEventListener("pointerleave",leave); cleanups.push(()=>{element.removeEventListener("pointermove",move);element.removeEventListener("pointerleave",leave)});
      });
      });
      const refresh = () => ScrollTrigger.refresh();
      document.querySelectorAll("img,video").forEach((media) => { if (!(media as HTMLImageElement).complete) { media.addEventListener("load",refresh,{once:true}); media.addEventListener("loadedmetadata",refresh,{once:true}); cleanups.push(()=>{media.removeEventListener("load",refresh);media.removeEventListener("loadedmetadata",refresh)}); } });
      refreshTimer = window.setTimeout(refresh, 120);
    }, 1600);
    return () => { window.clearTimeout(start); window.clearTimeout(refreshTimer); cleanups.forEach(cleanup=>cleanup()); cancelAnimationFrame(frame); lenis?.destroy(); contexts?.revert(); };
  }, [routeKey]);
  return null;
}
