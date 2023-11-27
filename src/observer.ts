/* eslint-disable no-restricted-syntax */
const headerElement = document.getElementById('header');
const navlinks = headerElement?.querySelectorAll('a');

// SECTIONS SELECTORS
const homeSection = document.getElementById('home');
const featureSection = document.getElementById('feature');
const descriptionSection = document.getElementById('description');
const autonomySection = document.getElementById('autonomy');
const usecaseSection = document.getElementById('usecase');
const contactSection = document.getElementById('contact');

// === OBSERVER === //
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      // If we don't observe Home Section, we want to hide the navbar
      if (
        entry.rootBounds &&
        entry.rootBounds.width > 1024 &&
        entry.target === homeSection
      ) {
        if (!entry.isIntersecting)
          headerElement?.classList.add('-translate-y-full');
        else headerElement?.classList.remove('-translate-y-full');
      }

      if (entry.isIntersecting) {
        // If we observe any section, we want to change the style of the mobile navbar
        const sectionId = entry.target.getAttribute('id');

        navlinks?.forEach((navlink) => {
          const hrefAttr = navlink.getAttribute('href')?.slice(1);

          if (sectionId === hrefAttr && sectionId !== 'contact') {
            navlink.classList.add('text-primary-400');
            navlink.classList.add('font-semibold');
          } else {
            navlink.classList.remove('text-primary-400');
            navlink.classList.remove('font-semibold');
          }
        });        
        
      } 

      if(entry.isIntersecting && entry.target !== homeSection) {
        entry.target.classList.add("slide-fade-up__animate")
      }
    }
  },
  { rootMargin: '-100px 0px -200px 0px' }
);

observer.observe(homeSection as HTMLElement);
observer.observe(featureSection as HTMLElement);
observer.observe(descriptionSection as HTMLElement);
observer.observe(autonomySection as HTMLElement);
observer.observe(usecaseSection as HTMLElement);
observer.observe(contactSection as HTMLElement);
