/*
  BLK.FX static build of Ben's Lovable site.
  All content is in the HTML; this file only adds behaviour.
  Ported from: SiteChrome.tsx, Marketing.tsx, HeroGlobe.tsx, MotionProvider.tsx,
  services.tsx, insights.index.tsx, contact.tsx.
  Libraries (loaded from CDN in each page head, deferred): GSAP + ScrollTrigger, Lenis.
  The hero globe loads cobe as an ES module only on pages that have [data-globe].
*/
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BOOKING = "https://meetings.hubspot.com/ben-kohler/intro-call-ben";

  /* ---------- toast (replaces sonner) ---------- */
  function toast(title, desc) {
    var t = document.createElement("div");
    t.className = "static-toast";
    t.setAttribute("role", "status");
    t.innerHTML = "<strong></strong><span></span>";
    t.firstChild.textContent = title;
    t.lastChild.textContent = desc || "";
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("is-in"); });
    setTimeout(function () { t.classList.remove("is-in"); setTimeout(function () { t.remove(); }, 400); }, 3800);
  }

  /* ---------- header: dropdowns, scroll state, progress ---------- */
  var header = $(".site-nav");
  var active = null, openTimer, closeTimer;
  function setMenu(label) {
    active = label;
    $$(".site-nav [data-menu]").forEach(function (m) { m.hidden = m.getAttribute("data-menu") !== label; });
    $$(".site-nav .nav-group").forEach(function (g) {
      var m = $("[data-menu]", g), trig = $(".nav-link", g);
      if (m && trig) trig.setAttribute("aria-expanded", String(m.getAttribute("data-menu") === label));
    });
    if (header) header.classList.toggle("has-menu-open", !!label);
  }
  function cancel() { clearTimeout(openTimer); clearTimeout(closeTimer); }
  $$(".site-nav .nav-group").forEach(function (g) {
    var m = $("[data-menu]", g); if (!m) return;
    var label = m.getAttribute("data-menu"), trig = $(".nav-link", g);
    g.addEventListener("pointerenter", function (e) { if (e.pointerType === "touch") return; cancel(); openTimer = setTimeout(function () { setMenu(label); }, 80); });
    g.addEventListener("pointerleave", function (e) { if (e.pointerType === "touch") return; cancel(); closeTimer = setTimeout(function () { setMenu(null); }, 250); });
    g.addEventListener("focusin", function () { cancel(); setMenu(label); });
    g.addEventListener("focusout", function (e) { if (!g.contains(e.relatedTarget)) { cancel(); closeTimer = setTimeout(function () { setMenu(null); }, 250); } });
    if (trig) trig.addEventListener("click", function (e) { e.preventDefault(); cancel(); setMenu(active === label ? null : label); });
  });
  document.addEventListener("pointerdown", function (e) { if (header && !header.contains(e.target)) setMenu(null); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(null); closeMobile(); } });
  var progress = $(".nav-progress");
  function onScroll() {
    if (header && !active) header.classList.toggle("is-scrolled", window.scrollY > 40);
    var h = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- mobile menu ---------- */
  var mobile = $(".mobile-menu");
  function openMobile() { if (!mobile) return; mobile.classList.add("is-open"); mobile.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeMobile() { if (!mobile) return; mobile.classList.remove("is-open"); mobile.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  var mt = $(".mobile-nav-trigger"); if (mt) mt.addEventListener("click", openMobile);
  if (mobile) {
    var close = $(".mobile-top button", mobile); if (close) close.addEventListener("click", closeMobile);
    $$(".mobile-nav-group > button", mobile).forEach(function (b) {
      b.addEventListener("click", function () {
        var sub = b.nextElementSibling, open = !sub.classList.contains("is-open");
        $$(".mobile-submenu", mobile).forEach(function (s) { s.classList.remove("is-open"); s.previousElementSibling.setAttribute("aria-expanded", "false"); });
        if (open) { sub.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); }
      });
    });
    $$("a", mobile).forEach(function (a) { a.addEventListener("click", closeMobile); });
  }

  /* ---------- footer regulatory disclosures ---------- */
  var reg = $("#regulatory");
  if (reg) reg.addEventListener("click", function () {
    var copy = $(".regulatory-copy"), open = copy.hidden;
    copy.hidden = !open; reg.setAttribute("aria-expanded", String(open));
    var svg = $("svg", reg); if (svg) svg.classList.toggle("rotate-180", open);
  });

  /* ---------- WhatsApp widget ---------- */
  var chat = $(".chat-widget");
  if (chat) { var wb = $(".whatsapp", chat); wb.addEventListener("click", function () { var o = !chat.classList.contains("is-open"); chat.classList.toggle("is-open", o); wb.setAttribute("aria-expanded", String(o)); }); }

  /* ---------- cursor dot ---------- */
  var dot = $(".cursor-dot");
  if (dot) addEventListener("pointermove", function (e) { dot.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)"; });

  /* ---------- intro loader (first visit per session, homepage only) ---------- */
  var loader = $(".intro-loader");
  if (loader && !reduced) {
    var seen = false; try { seen = !!sessionStorage.getItem("blk-intro"); sessionStorage.setItem("blk-intro", "1"); } catch (e) { seen = true; }
    if (!seen) { loader.hidden = false; setTimeout(function () { loader.hidden = true; }, 1800); }
  }

  /* ---------- accordions (Radix markup, type="single" collapsible) ---------- */
  $$('[data-orientation="vertical"] > h3 > button[aria-expanded]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement.parentElement, root = item.parentElement;
      var open = btn.getAttribute("aria-expanded") !== "true";
      $$(":scope > [data-orientation]", root).forEach(function (it) { setItem(it, false); });
      setItem(item, open);
    });
  });
  $$('[role="region"][data-state="closed"]').forEach(function (c) { c.hidden = true; });
  function setItem(item, open) {
    var st = open ? "open" : "closed";
    var h = item.querySelector(":scope > h3"), b = h && h.querySelector("button"), c = item.querySelector(':scope > [role="region"]');
    if (!b || !c) return;
    [item, h, b, c].forEach(function (el) { el.setAttribute("data-state", st); });
    b.setAttribute("aria-expanded", String(open));
    if (open) { c.hidden = false; c.style.setProperty("--radix-collapsible-content-height", c.scrollHeight + "px"); }
    else c.hidden = true;
  }

  /* ---------- FX ticker (indicative rates, client-side) ---------- */
  var ticker = $(".ticker");
  if (ticker) {
    fetch("https://open.er-api.com/v6/latest/GBP").then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (!d || !d.rates) return;
      var v = d.rates; v.GBP = 1;
      $$(".ticker-item", ticker).forEach(function (it) {
        var pair = $("span", it).textContent.trim().split("/"), s = $("strong", it);
        var rate = v[pair[1]] / v[pair[0]]; if (!isFinite(rate)) return;
        s.textContent = rate.toFixed(pair.indexOf("JPY") > -1 ? 2 : 4);
        it.classList.add("rate-flash"); setTimeout(function () { it.classList.remove("rate-flash"); }, 1400);
      });
      var lab = $(".indicative strong", ticker);
      if (lab) lab.textContent = "Indicative · Updated " + new Date(d.time_last_update_unix * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    }).catch(function () {});
  }

  /* ---------- savings calculator ---------- */
  var calc = $(".calculator");
  if (calc) {
    var vol = $('[data-calc="volume"]', calc), bank = $('[data-calc="bank"]', calc);
    var upd = function () {
      var V = +vol.value, B = +bank.value, saving = Math.round(V * 12 * ((B - 0.4) / 100));
      var out = $('[data-calc-out="saving"]', calc), sm = $("small", out);
      out.textContent = "£" + saving.toLocaleString("en-GB"); if (sm) out.appendChild(sm);
      $('[data-calc-out="volume"]', calc).textContent = "£" + V.toLocaleString("en-GB");
      $('[data-calc-out="bank"]', calc).textContent = B.toFixed(1) + "%";
      [vol, bank].forEach(function (r) { r.style.setProperty("--fill", ((r.value - r.min) / (r.max - r.min) * 100) + "%"); });
    };
    vol.addEventListener("input", upd); bank.addEventListener("input", upd); upd();
  }

  /* ---------- proposition video: poster first, Vimeo with sound on click ---------- */
  $$(".video-frame button").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.parentElement;
      f.innerHTML = '<iframe src="https://player.vimeo.com/video/1027741242?title=0&byline=0&portrait=0&autoplay=1" title="Experience BLK.FX" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    });
  });

  /* ---------- forms (frontend only, as in Ben's build) ---------- */
  $$(".newsletter form").forEach(function (f) { f.addEventListener("submit", function (e) { e.preventDefault(); toast("You’re on the list.", "Your first Friday update will arrive soon."); f.reset(); }); });
  var INK = "bg-primary text-primary-foreground hover:bg-foreground hover:text-background".split(" ");
  var OUTLINE = "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground".split(" ");
  function variant(btn, ink) { btn.classList.remove.apply(btn.classList, ink ? OUTLINE : INK); btn.classList.add.apply(btn.classList, ink ? INK : OUTLINE); }
  var tabs = $$("[data-tab]");
  if (tabs.length) {
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        var k = t.getAttribute("data-tab");
        tabs.forEach(function (x) { variant(x, x === t); });
        $$("[data-form]").forEach(function (f) { f.hidden = f.getAttribute("data-form") !== k; });
        var dl = $(".brochure-download"); if (dl) dl.hidden = true;
      });
    });
    $$("[data-form]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (f.getAttribute("data-form") === "brochure") { $(".brochure-download", f).hidden = false; toast("Your brochure is ready.", "Use the download link below."); }
        else toast("Thanks — we’ll be in touch.", "A member of the BLK.FX team will respond shortly.");
        f.reset();
      });
    });
  }

  /* ---------- insights filter ---------- */
  var filters = $$("[data-filter]");
  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-filter");
      filters.forEach(function (x) { variant(x, x === b); });
      $$(".post-grid .insight-card[data-category]").forEach(function (c) { c.hidden = !(k === "All" || c.getAttribute("data-category") === k); });
    });
  });

  /* ---------- services page sub-nav ---------- */
  var subnav = $(".service-subnav");
  if (subnav) {
    var chips = $$("a", subnav);
    var go = function (id, smooth) {
      var t = document.getElementById(id); if (!t) return;
      var off = (header ? header.offsetHeight : 64) + subnav.offsetHeight + 28;
      history.replaceState(null, "", "#" + id);
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - off, behavior: smooth ? "smooth" : "auto" });
      t.classList.add("is-targeted"); setTimeout(function () { t.classList.remove("is-targeted"); }, 1400);
    };
    chips.forEach(function (c) { c.addEventListener("click", function (e) { e.preventDefault(); go(c.getAttribute("href").slice(1), true); }); });
    var mark = function () {
      var cur = chips[0].getAttribute("href").slice(1);
      chips.forEach(function (c) { var el = document.getElementById(c.getAttribute("href").slice(1)); if (el && el.offsetTop <= scrollY + 400) cur = el.id; });
      chips.forEach(function (c) { var on = c.getAttribute("href") === "#" + cur; c.classList.toggle("is-active", on); if (on) c.setAttribute("aria-current", "location"); else c.removeAttribute("aria-current"); });
    };
    addEventListener("scroll", mark, { passive: true });
    if (location.hash) setTimeout(function () { go(location.hash.slice(1), false); }, 180); else mark();
  }

  /* ---------- hero globe (cobe) + rotating transaction card ---------- */
  var globeWrap = $("[data-globe]");
  if (globeWrap) {
    var cards = [["Conversion booked", "GBP → EUR · £250,000 · Rate locked"], ["Payment sent", "USD → AED · Same day"], ["Forward booked", "EUR/GBP · 6 months · Budget rate fixed"], ["Payment received", "CAD → GBP · Credited to your account"], ["Conversion booked", "GBP → USD · $1.2m · Settled next day"]];
    var ci = 0, float = $(".payment-float", globeWrap);
    if (float && !reduced) setInterval(function () {
      ci = (ci + 1) % cards.length;
      var n = float.cloneNode(true);
      n.querySelector("span").lastChild.textContent = cards[ci][0];
      n.querySelector("strong").lastChild.textContent = cards[ci][1];
      float.replaceWith(n); float = n;
    }, 3500);
    var canvas = $("canvas", globeWrap), frame = $(".hero-globe-visual", globeWrap);
    var rot = { phi: -0.72, theta: 0.16, vPhi: 0, vTheta: 0, resumeAt: 0 }, hover = { x: 0, y: 0 }, drag = null;
    var locations = [[51.5, -.12], [40.71, -74.01], [25.2, 55.27], [50.11, 8.68], [43.65, -79.38], [-33.87, 151.21], [-26.2, 28.04], [47.38, 8.54], [35.68, 139.69], [22.32, 114.17]];
    import("https://cdn.jsdelivr.net/npm/cobe@0.6.5/+esm").then(function (mod) {
      var createGlobe = mod.default, destroy = null, last = performance.now();
      function render() {
        var rect = frame.getBoundingClientRect(), size = Math.max(1, Math.round(Math.min(rect.width, rect.height))), ratio = Math.min(devicePixelRatio || 1, 2);
        if (destroy) destroy();
        last = performance.now();
        var g = createGlobe(canvas, {
          devicePixelRatio: ratio, width: size * ratio, height: size * ratio, offset: [0, 0], scale: 1.25, phi: rot.phi, theta: rot.theta,
          dark: 1, diffuse: 2.2, mapSamples: size < 420 ? 24000 : 40000, mapBrightness: 9, mapBaseBrightness: .025,
          baseColor: [.78, .78, .78], markerColor: [1, .278, 0], glowColor: [.55, .22, .08],
          markers: locations.map(function (l, i) { return { location: l, size: i === 0 ? .07 : .036 }; }),
          onRender: function (state) {
            var now = performance.now(), dt = Math.min((now - last) / 1000, .05); last = now;
            if (!reduced && drag === null) {
              rot.phi += rot.vPhi * dt; rot.theta = Math.max(-1.05, Math.min(1.05, rot.theta + rot.vTheta * dt));
              var damp = Math.exp(-3.7 * dt); rot.vPhi *= damp; rot.vTheta *= damp;
              if (now > rot.resumeAt) rot.phi += .17 * dt;
            }
            state.phi = rot.phi + (reduced ? 0 : hover.x * .045);
            state.theta = Math.max(-1.1, Math.min(1.1, rot.theta + (reduced ? 0 : hover.y * .035)));
            state.width = size * ratio; state.height = size * ratio;
          }
        });
        destroy = function () { g.destroy(); };
      }
      render();
      var rt; new ResizeObserver(function () { clearTimeout(rt); rt = setTimeout(render, 100); }).observe(frame);
    }).catch(function () {});
    var finish = function (id) { if (!drag || drag.id !== id) return; rot.resumeAt = performance.now() + 2000; drag = null; globeWrap.classList.remove("is-dragging"); };
    globeWrap.addEventListener("pointerdown", function (e) {
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), touch: e.pointerType === "touch", locked: e.pointerType !== "touch" };
      if (e.pointerType !== "touch") { globeWrap.setPointerCapture(e.pointerId); globeWrap.classList.add("is-dragging"); }
    });
    globeWrap.addEventListener("pointermove", function (e) {
      if (!drag || drag.id !== e.pointerId) { if (e.pointerType === "mouse") { var r = globeWrap.getBoundingClientRect(); hover = { x: (e.clientX - r.left) / r.width * 2 - 1, y: (e.clientY - r.top) / r.height * 2 - 1 }; } return; }
      var tx = e.clientX - drag.x, ty = e.clientY - drag.y;
      if (drag.touch && !drag.locked) { if (Math.abs(tx) < 7 && Math.abs(ty) < 7) return; if (Math.abs(ty) > Math.abs(tx)) { drag = null; return; } drag.locked = true; globeWrap.setPointerCapture(e.pointerId); globeWrap.classList.add("is-dragging"); }
      var dt = Math.max((performance.now() - drag.t) / 1000, .008);
      rot.phi += tx / 180; rot.theta = Math.max(-1.05, Math.min(1.05, rot.theta - ty / 180));
      rot.vPhi = (tx / 180) / dt; rot.vTheta = (-ty / 180) / dt;
      drag.x = e.clientX; drag.y = e.clientY; drag.t = performance.now();
    });
    ["pointerup", "pointercancel"].forEach(function (ev) { globeWrap.addEventListener(ev, function (e) { finish(e.pointerId); }); });
    globeWrap.addEventListener("pointerleave", function (e) { hover = { x: 0, y: 0 }; if (e.pointerType === "mouse" && !globeWrap.hasPointerCapture(e.pointerId)) finish(e.pointerId); });
  }

  /* ---------- motion (port of MotionProvider.tsx) ---------- */
  if (reduced) return;
  function startMotion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);
    if (window.Lenis) {
      var lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      lenis.on("scroll", function () { ST.update(); });
    }
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: .85, ease: "power3.out", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
    gsap.utils.toArray("[data-stagger]").forEach(function (g) {
      gsap.fromTo(g.children, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .07, ease: "power3.out", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: g, start: "top 88%", once: true } });
    });
    gsap.utils.toArray(".team-grid img,.insight-card>div,.article-hero>img").forEach(function (el) {
      gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)", scale: 1.06 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1, ease: "power3.inOut", clearProps: "transform,filter,willChange", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var end = +el.dataset.count, dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || "", s = { v: 0 };
      el.textContent = "0" + suf;
      gsap.to(s, { v: end, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true }, onUpdate: function () { el.textContent = s.v.toLocaleString("en-GB", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; } });
    });
    gsap.utils.toArray("[data-grow]").forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });
    var hero = $("[data-hero]");
    if (hero) gsap.to(hero, { scale: .94, y: 70, opacity: .5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    gsap.utils.toArray(".image-hero").forEach(function (el) { gsap.to(el, { backgroundPositionY: "58%", ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } }); });
    var track = $("[data-service-track]"), pin = $("[data-service-pin]");
    if (track && pin) gsap.matchMedia().add("(min-width: 1024px)", function () {
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth + 96); };
      return gsap.to(track, { x: function () { return -dist(); }, ease: "none", scrollTrigger: { trigger: pin, start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: .7, invalidateOnRefresh: true } });
    });
    gsap.utils.toArray("[data-scramble]").forEach(function (el) {
      var tn = Array.prototype.find.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (!tn) return; var orig = tn.textContent;
      ST.create({ trigger: el, start: "top 92%", once: true, onEnter: function () {
        var step = 0, ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var timer = setInterval(function () {
          tn.textContent = orig.split("").map(function (c, i) { return c === " " || i < step ? c : ch[Math.floor(Math.random() * ch.length)]; }).join("");
          step += Math.max(1.8, orig.length / 22); if (step >= orig.length) { tn.textContent = orig; clearInterval(timer); }
        }, 24);
        setTimeout(function () { clearInterval(timer); tn.textContent = orig; }, 580);
      } });
    });
    $$("button,a.arrow-link,.hero-actions a").filter(function (el) { return !el.closest("[data-orientation]") && !el.classList.contains("regulatory-toggle"); }).forEach(function (el) {
      el.addEventListener("pointermove", function (e) { var b = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - b.left - b.width / 2) * .12, y: (e.clientY - b.top - b.height / 2) * .12, duration: .25 }); });
      el.addEventListener("pointerleave", function () { gsap.to(el, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.4)" }); });
    });
    $$("img,video").forEach(function (m) { if (!m.complete) m.addEventListener("load", function () { ST.refresh(); }, { once: true }); });
    setTimeout(function () { ST.refresh(); }, 120);
  }
  if (document.readyState === "complete") setTimeout(startMotion, 400);
  else addEventListener("load", function () { setTimeout(startMotion, 400); });
})();
