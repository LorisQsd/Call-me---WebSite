import axios from 'axios';

// === YEAR GENERATION === //
// Selector
const yearElement = document.getElementById('year');

// We want to create a new instance of the Date class to get dynamically the full year.
// So for each new year, we will not need to change manually the date.
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

if (yearElement) yearElement.textContent = currentYear.toString();

// === NAVBAR === //
// State
let isNavbarOpen = false;

// Selectors
const navbarBtn = document.getElementById('navbarBtn');
const headerElement = document.getElementById('header');
const navLinks = headerElement?.querySelectorAll('a');

// Handler
const handleNavbar = () => {
  // Select the three bars of the navbar button (mobile version only)
  const firstBar = document.getElementById('firstBar');
  const secondBar = document.getElementById('secondBar');
  const thirdBar = document.getElementById('thirdBar');

  // Toggler
  headerElement?.classList.toggle('translate-x-full');
  isNavbarOpen = !isNavbarOpen;

  // Tailwind CSS changes
  firstBar?.classList.toggle('rotate-45');
  firstBar?.classList.toggle('translate-y-[10px]');
  secondBar?.classList.toggle('opacity-0');
  thirdBar?.classList.toggle('-rotate-45');
  thirdBar?.classList.toggle('-translate-y-[9px]');
};

// We want to close the navbar by toggling the state that the user clicks on a link in the header.
navLinks?.forEach((link) => {
  link.addEventListener('click', handleNavbar);
});

navbarBtn?.addEventListener('click', handleNavbar);

// === CONTACT FORM === //
// Selectors
const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const messageElement = document.getElementById('requestMessage');

// Handler
const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const form = Object.fromEntries(formData);

  // AXIOS -- POST => Send mail
  try {
    const response = await axios.post(
      'https://call-me-bs.netlify.app/.netlify/functions/api/send',
      form
    );

    contactForm?.reset();

    if (messageElement) {
      messageElement.textContent =
        'Votre demande de contact a bien été transmise, nous revenons vers vous au plus vite.';
      messageElement.classList.remove('text-red-600');
    }
    return response.data;
  } catch (error) {
    if (messageElement) {
      messageElement.textContent =
        "Votre demande de contact n'a pas pu être correctement transmise. Nous réglons le problème.";
      messageElement.classList.add('text-red-600');
    }
    throw new Error(`${error}`);
  }
};

contactForm?.addEventListener('submit', handleSubmit);

// === INFO BUBBLE === //
// Selectors
const watchInfoIcon = document.getElementById('watchInfo');
const watchInfoToast = document.getElementById('watchInfoToast');

// Selectors
const relayInfoIcon = document.getElementById('relayInfo');
const relayInfoToast = document.getElementById('relayInfoToast');

// Handlers
const showToast = (e: any) => {
  switch (e.target.id) {
    case 'watchInfo':
      watchInfoToast?.classList.remove('hidden');
      break;
    case 'relayInfo':
      relayInfoToast?.classList.remove('hidden');
      break;
    default:
      break;
  }
};

const hideToast = (e: any) => {
  switch (e.target.id) {
    case 'watchInfo':
      watchInfoToast?.classList.add('hidden');
      break;
    case 'relayInfo':
      relayInfoToast?.classList.add('hidden');
      break;
    default:
      break;
  }
};

// Listeners
watchInfoIcon?.addEventListener('mouseenter', showToast);
watchInfoIcon?.addEventListener('mouseleave', hideToast);

relayInfoIcon?.addEventListener('mouseenter', showToast);
relayInfoIcon?.addEventListener('mouseleave', hideToast);

// === SCROLL TO TOP BUTTON === //
// Selector
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

// Handler
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

// Listener
scrollToTopBtn?.addEventListener('click', scrollToTop);
