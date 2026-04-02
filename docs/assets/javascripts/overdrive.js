/**
 * EmergencyForge Wiki — Overdrive Effects
 * 3D card tilt + View Transitions integration
 */

(function () {
  "use strict";

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ── 3D Tilt Cards ──────────────────────────────
  // Subtle perspective shift following the cursor

  function initTiltCards() {
    var cards = document.querySelectorAll(".grid.cards > ul > li");

    cards.forEach(function (card) {
      // Skip if already initialized
      if (card.dataset.tilt) return;
      card.dataset.tilt = "true";

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        // Max 4 degrees rotation — subtle, not nauseating
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform =
          "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // ── View Transitions ───────────────────────────
  // Hook into MkDocs Material instant navigation

  function initViewTransitions() {
    if (!document.startViewTransition) return;

    // MkDocs Material fires 'DOMContentLoaded' on instant nav,
    // but we can also listen for the content swap
    var content = document.querySelector(".md-content");
    if (content) {
      content.style.viewTransitionName = "content";
    }
  }

  // ── Init ───────────────────────────────────────

  function init() {
    initTiltCards();
    initViewTransitions();
  }

  // Run on initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-init on MkDocs Material instant navigation
  // The 'instant' feature replaces content without full reload
  document.addEventListener("DOMContentLoaded", init);

  // Also observe for dynamically added cards (search results, etc.)
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length) {
        initTiltCards();
        break;
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
