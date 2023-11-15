/* eslint-disable no-restricted-syntax */
const headerElement = document.getElementById('header');
const homeSection = document.getElementById('home');
const featureSection = document.getElementById('feature');

// === OBSERVER === //
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      // Si je ne suis pas sur la section home, je cache la navbar
      if (
        entry.rootBounds && 
        entry.rootBounds.width > 1024 &&
        entry.target === homeSection
      ) {
        console.log("pouet")
        if (!entry.isIntersecting)
          headerElement?.classList.add('-translate-y-full');
        else headerElement?.classList.remove('-translate-y-full');
      }

      console.log(entry);
    }
  },
  { rootMargin: '-100px 0px 0px 0px' }
);

observer.observe(homeSection as HTMLElement);
observer.observe(featureSection as HTMLElement);
