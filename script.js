(function () {
  function applyPmiSite() {
    var S = window.PMI_SITE;
    if (!S) return;

    var meta = document.getElementById("pmi-meta-description");
    if (meta && S.meta && S.meta.description) {
      meta.setAttribute("content", S.meta.description);
    }

    if (S.hero) {
      var eyebrow = document.getElementById("pmi-hero-eyebrow");
      var hb = document.getElementById("pmi-hero-title-before");
      var ha = document.getElementById("pmi-hero-title-accent");
      var ht = document.getElementById("pmi-hero-tagline");
      var hi = document.getElementById("pmi-hero-instruments");
      var lead = document.getElementById("pmi-hero-lead");
      if (eyebrow && S.hero.eyebrow != null) eyebrow.textContent = S.hero.eyebrow;
      if (hb && S.hero.titleBefore != null) hb.textContent = S.hero.titleBefore;
      if (ha && S.hero.titleAccent != null) ha.textContent = S.hero.titleAccent;
      if (ht) {
        if (S.hero.tagline != null && S.hero.tagline !== "") {
          ht.textContent = S.hero.tagline;
          ht.hidden = false;
        } else {
          ht.hidden = true;
        }
      }
      if (hi) {
        if (S.hero.instruments != null && S.hero.instruments !== "") {
          hi.textContent = S.hero.instruments;
          hi.hidden = false;
        } else {
          hi.hidden = true;
        }
      }
      if (lead) {
        if (S.hero.leadHtml != null && S.hero.leadHtml !== "") {
          lead.innerHTML = S.hero.leadHtml;
          lead.hidden = false;
        } else {
          lead.hidden = true;
        }
      }
    }

    if (S.about) {
      var tb = document.getElementById("pmi-about-title-before");
      var ta = document.getElementById("pmi-about-title-accent");
      var tz = document.getElementById("pmi-about-title-after");
      var body = document.getElementById("pmi-about-body");
      if (tb && S.about.titleBefore != null) tb.textContent = S.about.titleBefore;
      if (ta && S.about.titleAccent != null) ta.textContent = S.about.titleAccent;
      if (tz && S.about.titleAfter != null) {
        tz.textContent = S.about.titleAfter;
        if (S.about.titleAfter === "") tz.style.display = "none";
        else tz.style.display = "";
      }
      if (body && S.about.body != null) body.textContent = S.about.body;

      if (S.about.stats && S.about.stats.length) {
        S.about.stats.forEach(function (row, i) {
          var v = document.getElementById("pmi-stat-" + i + "-value");
          var l = document.getElementById("pmi-stat-" + i + "-label");
          if (v && row.value != null) v.textContent = row.value;
          if (l && row.label != null) l.textContent = row.label;
        });
      }
    }

    if (S.programs) {
      var pint = document.getElementById("pmi-programs-intro");
      if (pint && S.programs.intro != null) pint.textContent = S.programs.intro;
      if (S.programs.items && S.programs.items.length) {
        S.programs.items.forEach(function (item, i) {
          var t = document.getElementById("pmi-prog-" + i + "-title");
          var p = document.getElementById("pmi-prog-" + i + "-text");
          if (t && item.title != null) t.textContent = item.title;
          if (p && item.text != null) p.textContent = item.text;
        });
      }
    }

    if (S.faculty) {
      var fi = document.getElementById("pmi-faculty-intro");
      if (fi && S.faculty.intro != null) fi.textContent = S.faculty.intro;
      if (S.faculty.members && S.faculty.members.length) {
        S.faculty.members.forEach(function (mem, i) {
          var n = document.getElementById("pmi-fac-" + i + "-name");
          var r = document.getElementById("pmi-fac-" + i + "-role");
          var b = document.getElementById("pmi-fac-" + i + "-bio");
          if (n && mem.name != null) n.textContent = mem.name;
          if (r) {
            if (mem.role != null && mem.role !== "") {
              r.textContent = mem.role;
              r.style.visibility = "visible";
            } else {
              r.textContent = " ";
              r.style.visibility = "hidden";
            }
          }
          if (b) {
            if (mem.bioHtml != null) b.innerHTML = mem.bioHtml;
            else if (mem.bio != null) b.textContent = mem.bio;
          }
        });
      }
    }

    if (S.contact) {
      var ci = document.getElementById("pmi-contact-intro");
      var ad = document.getElementById("pmi-contact-address");
      var ph = document.getElementById("pmi-contact-phone");
      var em = document.getElementById("pmi-contact-email");
      var hr = document.getElementById("pmi-contact-hours");
      if (ci && S.contact.intro != null) ci.textContent = S.contact.intro;
      if (ad && S.contact.address != null) ad.textContent = S.contact.address;
      if (ph) {
        if (S.contact.phoneDisplay != null) ph.textContent = S.contact.phoneDisplay;
        if (S.contact.phoneTel != null) {
          var tel = String(S.contact.phoneTel).replace(/\s/g, "");
          if (tel.indexOf("+") === 0) ph.setAttribute("href", "tel:" + tel);
          else ph.setAttribute("href", "tel:" + tel.replace(/[^\d+]/g, ""));
        }
      }
      if (em) {
        var emRow = document.getElementById("pmi-contact-email-row");
        if (S.contact.emailMailto || S.contact.emailDisplay) {
          if (emRow) emRow.style.display = "";
          if (S.contact.emailDisplay != null) em.textContent = S.contact.emailDisplay;
          if (S.contact.emailMailto != null) em.setAttribute("href", "mailto:" + S.contact.emailMailto);
        } else {
          if (emRow) emRow.style.display = "none";
        }
      }
      if (hr && S.contact.hours != null) hr.textContent = S.contact.hours;
    }
  }

  applyPmiSite();

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".hero .reveal").forEach(function (el) {
    el.classList.add("is-visible");
  });
  document.documentElement.classList.add("js-reveal-pending");

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var headerEl = document.querySelector(".site-header");
        var offset = headerEl ? headerEl.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("This demo form does not send yet — hook up email or a form service to go live.");
    });
  }
})();
