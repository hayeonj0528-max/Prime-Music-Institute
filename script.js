(function () {
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getInitials(name) {
    if (!name) return "";
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function buildFacultyCard(mem, index) {
    var card = document.createElement("article");
    card.className = "faculty-card reveal";
    if (index === 0) card.classList.add("faculty-card--director");

    var photo = document.createElement("div");
    photo.className = "faculty-photo";
    if (mem.image) {
      photo.classList.add("faculty-photo--has-img");
      if (mem.imageClass) photo.classList.add(mem.imageClass);
      var img = document.createElement("img");
      img.src = mem.image;
      img.alt = mem.name || "Faculty member";
      img.width = 600;
      img.height = 600;
      img.loading = "lazy";
      photo.appendChild(img);
    } else {
      photo.classList.add("faculty-photo--placeholder");
      var initials = document.createElement("span");
      initials.className = "faculty-photo-initials";
      initials.textContent = getInitials(mem.name);
      initials.setAttribute("aria-hidden", "true");
      photo.appendChild(initials);
    }
    card.appendChild(photo);

    var role = document.createElement("p");
    role.className = "faculty-role";
    if (mem.role) {
      role.textContent = mem.role;
    } else {
      role.innerHTML = "&nbsp;";
      role.style.visibility = "hidden";
    }
    card.appendChild(role);

    var name = document.createElement("h3");
    name.textContent = mem.name || "";
    card.appendChild(name);

    var bio = document.createElement("div");
    bio.className = "faculty-bio faculty-bio--rich";

    if (mem.profile) {
      var lead = document.createElement("p");
      lead.className = "faculty-bio-lead";
      lead.textContent = mem.profile;
      bio.appendChild(lead);
    }

    var hasSections = Array.isArray(mem.sections) && mem.sections.length > 0;

    if (hasSections) {
      var details = document.createElement("details");
      details.className = "faculty-details";

      var summary = document.createElement("summary");
      summary.className = "faculty-toggle";
      summary.innerHTML =
        '<span class="faculty-toggle-label faculty-toggle-label--more">Read more</span>' +
        '<span class="faculty-toggle-label faculty-toggle-label--less">Show less</span>' +
        '<span class="faculty-toggle-icon" aria-hidden="true">\u25BE</span>';
      details.appendChild(summary);

      var body = document.createElement("div");
      body.className = "faculty-details-body";
      mem.sections.forEach(function (sec) {
        if (!sec || !sec.title) return;
        var h4 = document.createElement("h4");
        h4.className = "faculty-bio-section";
        h4.textContent = sec.title;
        body.appendChild(h4);
        if (Array.isArray(sec.items) && sec.items.length) {
          var ul = document.createElement("ul");
          ul.className = "faculty-bio-list";
          sec.items.forEach(function (it) {
            var li = document.createElement("li");
            li.textContent = it;
            ul.appendChild(li);
          });
          body.appendChild(ul);
        }
      });
      details.appendChild(body);
      bio.appendChild(details);
    } else if (mem.bioHtml) {
      bio.innerHTML += mem.bioHtml;
    } else if (mem.bio) {
      var p = document.createElement("p");
      p.textContent = mem.bio;
      bio.appendChild(p);
    }

    card.appendChild(bio);
    return card;
  }

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
      var grid = document.getElementById("pmi-faculty-grid");
      if (grid && S.faculty.members && S.faculty.members.length) {
        grid.innerHTML = "";
        S.faculty.members.forEach(function (mem, i) {
          grid.appendChild(buildFacultyCard(mem, i));
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

  var form = document.getElementById("pmi-contact-form") || document.querySelector(".contact-form");
  if (form) {
    var statusEl = document.getElementById("pmi-contact-status");
    var submitBtn = document.getElementById("pmi-contact-submit") || form.querySelector('button[type="submit"]');

    function setStatus(message, kind) {
      if (!statusEl) return;
      statusEl.textContent = message || "";
      statusEl.classList.remove("is-success", "is-error", "is-info");
      if (kind) statusEl.classList.add("is-" + kind);
    }

    function getContactConfig() {
      var S = window.PMI_SITE || {};
      var c = S.contact || {};
      return {
        formspreeId: (c.formspreeId || "").trim(),
        fallbackEmail: (c.formFallbackEmail || c.emailMailto || "").trim(),
      };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot — silently drop bot submissions
      var honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      var cfg = getContactConfig();
      var fd = new FormData(form);

      // Basic client-side required-field check (since we use novalidate)
      var name = (fd.get("name") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var message = (fd.get("message") || "").toString().trim();
      if (!name || !email || !message) {
        setStatus("Please fill in your name, email, and a short message.", "error");
        return;
      }

      // Formspree path
      if (cfg.formspreeId) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.originalLabel = submitBtn.dataset.originalLabel || submitBtn.textContent;
          submitBtn.textContent = "Sending…";
        }
        setStatus("Sending your message…", "info");

        fetch("https://formspree.io/f/" + encodeURIComponent(cfg.formspreeId), {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        })
          .then(function (res) {
            if (res.ok) return res.json().catch(function () { return {}; });
            return res.json().then(
              function (data) { throw new Error((data && data.error) || "Submission failed."); },
              function () { throw new Error("Submission failed. Please try again or call us."); }
            );
          })
          .then(function () {
            form.reset();
            setStatus("Thanks! Your message has been sent — we'll be in touch shortly.", "success");
          })
          .catch(function (err) {
            setStatus(
              (err && err.message) || "Something went wrong. Please try again or call us at " +
                ((window.PMI_SITE && window.PMI_SITE.contact && window.PMI_SITE.contact.phoneDisplay) || "us") + ".",
              "error"
            );
          })
          .then(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitBtn.dataset.originalLabel) submitBtn.textContent = submitBtn.dataset.originalLabel;
            }
          });
        return;
      }

      // Fallback — open the visitor's mail client with a prefilled message
      if (cfg.fallbackEmail) {
        var phone = (fd.get("phone") || "").toString().trim();
        var subject = "Lesson enquiry from " + name;
        var bodyLines = [
          "Name: " + name,
          "Email: " + email,
          "Phone: " + (phone || "—"),
          "",
          message,
        ];
        var mailto =
          "mailto:" + encodeURIComponent(cfg.fallbackEmail) +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(bodyLines.join("\n"));
        window.location.href = mailto;
        setStatus("Opening your mail app — please press Send to finish.", "info");
        return;
      }

      // Nothing configured — be honest
      setStatus(
        "The contact form isn't connected yet. Please call us or email directly while we set this up.",
        "error"
      );
    });
  }
})();
