/* ==========================================================================
   Odi Anuntelemi Olurotimi — portfolio scripts
   --------------------------------------------------------------------------
   Plain JavaScript, no libraries. Everything is wrapped in an IIFE so nothing
   leaks into the global scope.

   What it does:
     1. Stamps the current year in the footer
     2. Sticky header background + scroll progress bar
     3. Reveals sections as they scroll into view
     4. Mobile menu open / close
     5. Rotating word in the hero headline
     6. Highlights the nav link for the section you're reading
   ========================================================================== */
(function () {
  "use strict";

  /* Users who ask their OS to reduce motion get no animation at all. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------------------------------------------------------------- 1. year */
  var yearEl = document.getElementById("yr");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------------------------------------- 2. sticky header + scroll bar */
  var header = document.getElementById("hdr");
  var bar = document.getElementById("bar");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("stuck", y > 12);
    if (bar) bar.style.transform = "scaleX(" + (scrollable > 0 ? Math.min(y / scrollable, 1) : 0) + ")";

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll); // throttle to one update per frame
    }
  }, { passive: true });

  onScroll();


  /* ------------------------------------------- 3. reveal on scroll into view */
  var revealItems = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Fall back to just showing everything.
    Array.prototype.forEach.call(revealItems, function (el) { el.classList.add("in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target); // animate once, then stop watching
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    Array.prototype.forEach.call(revealItems, function (el) { revealObserver.observe(el); });
  }


  /* ------------------------------------------------------- 4. mobile menu */
  var burger = document.getElementById("burger");
  var sheet = document.getElementById("sheet");

  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    if (sheet) sheet.setAttribute("aria-hidden", "true");
  }

  if (burger && sheet) {
    burger.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", String(isOpen));
      sheet.setAttribute("aria-hidden", String(!isOpen));
    });

    // Any link inside the sheet closes it.
    sheet.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });


  /* ------------------------------------------------- 5. hero word rotator */
  var rot = document.getElementById("rot");

  if (rot) {
    var words = Array.prototype.slice.call(rot.children);
    var index = 0;

    if (!reduceMotion && words.length > 1) {
      window.setInterval(function () {
        words[index].classList.remove("on");
        index = (index + 1) % words.length;
        words[index].classList.add("on");
      }, 2600);
    }
  }


  /* --------------------------------------------- 6. highlight active nav link */
  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = [];

  Array.prototype.forEach.call(navLinks, function (link) {
    var id = link.getAttribute("href").replace("#", "");
    var section = document.getElementById(id);
    if (section) sections.push(section);
  });

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        Array.prototype.forEach.call(navLinks, function (link) {
          var isActive = link.getAttribute("href") === "#" + entry.target.id;
          link.style.color = isActive ? "var(--fg)" : "";
          link.style.background = isActive ? "rgba(255,255,255,.06)" : "";
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

})();
