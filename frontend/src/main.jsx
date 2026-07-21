import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// Setup global scroll reveal observer
if (typeof window !== "undefined") {
  const initRevealObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRevealObserver);
  } else {
    initRevealObserver();
  }

  // Re-observe dynamically updated DOM nodes on React page transitions
  const mutationObserver = new MutationObserver(() => {
    initRevealObserver();
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);