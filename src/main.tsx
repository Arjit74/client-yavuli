import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// this is to fix the console warning it was due to spline robot trying to throw a warning to browser that it needs to check user moovement and it should not scroll but this function filters that 
const defaultAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  if (type === 'wheel' || type === 'touchmove' || type === 'touchstart') {
    // If Spline asks to block the scroll, we say No, keep scrolling smooth passive: true
    if (typeof options === 'object' && options) {
      (options as any).passive = true;
    } else {
      options = { passive: true } as any;
    }
  }
  // Call the original browser function
  defaultAddEventListener.call(this, type, listener, options);
};

// Prevent caching by adding cache-busting query parameter
if ("caches" in window) {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });
}

// Force reload if there's a new version
window.addEventListener("load", () => {
  fetch(window.location.href, {
    cache: "no-store",
  }).then((response) => {
    if (response.headers.get("content-type")?.includes("text/html")) {
      response.text().then((html) => {
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, "text/html");
        const newVersion = newDoc.querySelector('meta[name="version"]')?.getAttribute("content");
        const currentVersion = document.querySelector('meta[name="version"]')?.getAttribute("content");

        // Force reload if version changed
        if (newVersion && currentVersion && newVersion !== currentVersion) {
          window.location.reload();
        }
      });
    }
  });
});

createRoot(document.getElementById("root")!).render(<App />);

