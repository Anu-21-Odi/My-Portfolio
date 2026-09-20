(() => {
  "use strict";
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  let reduceMotion = motionQuery.matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  // Nigeria local time, independent of animation preferences.
  $("#year").textContent = new Date().getFullYear();
  const updateClock = () => {
    $("#local-time").textContent =
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Lagos",
      }).format(new Date()) + " WAT";
  };
  updateClock();
  setInterval(updateClock, 60000);

  // Mobile drawer: backdrop, focus trap, Escape, inert background, and scroll lock.
  const header = $(".header"),
    menu = $(".menu-toggle"),
    nav = $("#navigation");
  const backdrop = $(".menu-backdrop");
  const backgroundRegions = [
    $("main"),
    $(".footer"),
    $(".logo", header),
    $(".nav-cta"),
  ];
  let menuOpen = false;
  function setMenu(open, restoreFocus = false) {
    menuOpen = open;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav.classList.toggle("open", open);
    backdrop.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    backgroundRegions.forEach((region) => {
      region.inert = open;
    });
    if (open) $("a", nav).focus({ preventScroll: true });
    else if (restoreFocus) menu.focus({ preventScroll: true });
  }
  menu.addEventListener("click", () => setMenu(!menuOpen, menuOpen));
  backdrop.addEventListener("click", () => setMenu(false, true));
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !menuOpen) return;
    setMenu(false);
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    }
  });
  document.addEventListener("keydown", (event) => {
    if (!menuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setMenu(false, true);
    }
    if (event.key === "Tab") {
      const items = [...$$("a", nav), menu];
      const index = items.indexOf(document.activeElement);
      event.preventDefault();
      items[
        (index + (event.shiftKey ? -1 : 1) + items.length) % items.length
      ].focus();
    }
  });
  mobileQuery.addEventListener("change", () => {
    if (!mobileQuery.matches) setMenu(false);
  });

  // One rAF-throttled scroll handler for the header, navigation, and parallax.
  const navLinks = $$("a[href^='#']", nav);
  const trackedSections = navLinks
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);
  const orbLayers = $$(".orb-layer");
  let scrollScheduled = false;
  function updateScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 50);
    let current = trackedSections[0];
    const position = y + Math.min(window.innerHeight * 0.35, 260);
    trackedSections.forEach((section) => {
      if (section.getBoundingClientRect().top + y <= position)
        current = section;
    });
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 10)
      current = $("#contact");
    navLinks.forEach((link) => {
      if (link.hash === "#" + current.id)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    orbLayers.forEach((layer, index) => {
      layer.style.transform = reduceMotion
        ? ""
        : `translate3d(0, ${-(y * [0.035, 0.055, 0.025][index])}px, 0)`;
    });
    scrollScheduled = false;
  }
  const scheduleScroll = () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateScroll);
    }
  };
  window.addEventListener("scroll", scheduleScroll, { passive: true });
  window.addEventListener("resize", scheduleScroll);
  updateScroll();

  // Decorative typing; assistive technology receives one static description.
  const roles = [
    "Full-Stack Developer",
    "Problem Solver",
    "Clean Code Advocate",
    "Lifelong Learner",
    "Web Enthusiast",
  ];
  const roleElement = $("#typing-role");
  let roleIndex = 0,
    characterIndex = roles[0].length,
    deleting = true,
    typingTimer;
  function typeStep() {
    if (reduceMotion || document.hidden) return;
    const role = roles[roleIndex];
    characterIndex += deleting ? -1 : 1;
    roleElement.textContent = role.slice(0, Math.max(0, characterIndex));
    let delay = deleting ? 45 : 85;
    if (!deleting && characterIndex === role.length) {
      deleting = true;
      delay = 1900;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }
    typingTimer = setTimeout(typeStep, delay);
  }
  function resumeTyping() {
    clearTimeout(typingTimer);
    if (reduceMotion) {
      roleElement.textContent = roles[0];
      return;
    }
    if (!document.hidden) typingTimer = setTimeout(typeStep, 1600);
  }
  resumeTyping();
  document.addEventListener("visibilitychange", resumeTyping);

  // All content remains visible without JavaScript or with reduced motion.
  let revealObserver;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed", "progress-active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -25px 0px" },
    );
    $$("[data-reveal]").forEach((element) => revealObserver.observe(element));
  }
  const counters = $$("[data-counter]");
  let counterStarted = false;
  function countUp() {
    if (counterStarted) return;
    counterStarted = true;
    const start = performance.now();
    function frame(now) {
      const progress = reduceMotion ? 1 : Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach((counter) => {
        counter.textContent = String(
          Math.round(Number(counter.dataset.counter) * eased),
        );
      });
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    counters.forEach((counter) => {
      counter.textContent = "0";
    });
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          countUp();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    counterObserver.observe($(".stats"));
  }

  // Fine-pointer cursor glow; no permanent animation loop.
  const cursor = $(".cursor-glow");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let cursorX = 0,
    cursorY = 0,
    cursorScheduled = false;
  document.addEventListener(
    "pointermove",
    (event) => {
      if (reduceMotion || !finePointer.matches || document.hidden) return;
      cursorX = event.clientX;
      cursorY = event.clientY;
      cursor.classList.add("visible");
      if (!cursorScheduled) {
        cursorScheduled = true;
        requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${cursorX - 210}px, ${cursorY - 210}px, 0)`;
          cursorScheduled = false;
        });
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () =>
    cursor.classList.remove("visible"),
  );
  motionQuery.addEventListener("change", () => {
    reduceMotion = motionQuery.matches;
    resumeTyping();
    updateScroll();
    if (reduceMotion) {
      cursor.classList.remove("visible");
      document.documentElement.classList.remove("motion-ready");
      revealObserver?.disconnect();
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.counter;
      });
      roleIndex = 0;
      characterIndex = roles[0].length;
      deleting = true;
    }
  });

  // An explicitly labeled interactive concept, not the live SpendWise app.
  const insight = $("#budget-insight span");
  $$(".budget-category").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      $$(".budget-category").forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      const amount = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(Number(button.dataset.amount));
      insight.textContent = `${button.dataset.category}: ${amount} allocated. ${button.dataset.description}. Sample figures only.`;
    });
  });

  let copyTimer;
  $("#copy-email").addEventListener("click", async () => {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText("anuntelemio@gmail.com");
      $("#copy-status").textContent = "Copied!";
    } catch {
      $("#copy-status").textContent =
        "Select the email address above to copy it.";
    }
    copyTimer = setTimeout(() => {
      $("#copy-status").textContent = "";
    }, 4500);
  });

  // Static-host-safe contact: validation and a prefilled email draft, never fake delivery.
  const form = $("#contact-form");
  const fields = [$("#name"), $("#email"), $("#subject"), $("#message")];
  let formTimer;
  fields.forEach((field) =>
    field.addEventListener("input", () => field.setCustomValidity("")),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.forEach((field) => {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please enter a value, not just spaces.",
      );
    });
    if ($("#message").value.trim().length < 10)
      $("#message").setCustomValidity("Please write at least 10 characters.");
    if (!form.reportValidity()) return;
    const name = $("#name").value.trim(),
      email = $("#email").value.trim(),
      subject = $("#subject").value.trim();
    const body = `${$("#message").value.trim()}\n\nFrom: ${name}\nReply to: ${email}`;
    const href = `mailto:anuntelemio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const fallback = $("#email-draft-link");
    fallback.href = href;
    fallback.hidden = false;
    $("#form-status").textContent =
      "Draft prepared — finish sending it in your email app. If it didn’t open, use the link below or copy your message. Your text is kept here.";
    $("#submit-label").textContent = "Email Draft Prepared";
    $(".submit-button").classList.add("prepared");
    clearTimeout(formTimer);
    formTimer = setTimeout(() => {
      $("#submit-label").textContent = "Prepare Email";
      $(".submit-button").classList.remove("prepared");
    }, 3000);
    fallback.click();
  });
  $(".submit-button").disabled = false;

  console.info(
    "%cOdi.dev%c\nBuilding the future, one commit at a time.\nGitHub: https://github.com/Anu-21-Odi",
    "color:#00d4aa;font-size:24px;font-weight:bold",
    "color:#a0bbd6;font-size:12px",
  );
})();
