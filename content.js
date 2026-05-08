/**
 * Paid Promo Hider for YouTube
 *
 * This content script removes the "Includes paid promotion" overlay
 * that appears on sponsored YouTube videos.
 */

(function () {
  "use strict";

  // CSS selectors for the paid promotion overlay elements
  const SELECTORS = [
    ".ytp-paid-content-overlay",
    ".ytp-paid-content-overlay-link",
    'a[href*="support.google.com/youtube"][href*="ppp"]',
  ];

  /**
   * Removes all paid promotion overlay elements from the page
   */
  function removePaidPromotion() {
    SELECTORS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });
  }

  /**
   * Initializes the MutationObserver to watch for dynamically added elements
   */
  function initObserver() {
    const target = document.body || document.documentElement;
    if (!target) {
      // Body not ready yet, wait for DOMContentLoaded
      return;
    }

    const observer = new MutationObserver(removePaidPromotion);
    observer.observe(target, {
      childList: true,
      subtree: true,
    });
  }

  // Run immediately in case elements already exist
  removePaidPromotion();

  // Initialize observer when DOM is ready
  if (document.body) {
    initObserver();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      removePaidPromotion();
      initObserver();
    });
  }
})();
