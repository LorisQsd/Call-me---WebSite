import axios from 'axios';

// === YEAR GENERATION === //
const yearElement = document.getElementById('year');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

if (yearElement) yearElement.textContent = currentYear.toString();

// === NAVBAR === //
let isNavbarOpen = false;

const navbarBtn = document.getElementById('navbarBtn');
const navLinks = document.querySelectorAll('#navlink');

const handleNavbar = () => {
  // Elements
  const firstBar = document.getElementById('firstBar');
  const secondBar = document.getElementById('secondBar');
  const thirdBar = document.getElementById('thirdBar');

  const headerElement = document.getElementById('header');

  // Toggler
  headerElement?.classList.toggle('translate-x-full');
  isNavbarOpen = !isNavbarOpen;

  firstBar?.classList.toggle('rotate-45');
  firstBar?.classList.toggle('translate-y-[10px]');
  secondBar?.classList.toggle('opacity-0');
  thirdBar?.classList.toggle('-rotate-45');
  thirdBar?.classList.toggle('-translate-y-[9px]');
};

navLinks.forEach((link) => {
  link.addEventListener('click', handleNavbar);
});

navbarBtn?.addEventListener('click', handleNavbar);

// === CONTACT FORM === //
const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const messageElement = document.getElementById('requestMessage');

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const form = Object.fromEntries(formData);

  try {
    const response = await axios.post('http://localhost:8080/send', form);

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
const watchInfoIcon = document.getElementById("watchInfo");
const watchInfoToast = document.getElementById("watchInfoToast");

const relayInfoIcon = document.getElementById("relayInfo");
const relayInfoToast = document.getElementById("relayInfoToast");

const showToast = (e: any) => {
  switch(e.target.id) {
    case "watchInfo" :
      watchInfoToast?.classList.remove("hidden");
      break;
    case "relayInfo" :
      relayInfoToast?.classList.remove("hidden");
      break;
    default :
      break;
  }
}

const hideToast = (e: any) => {
  switch(e.target.id) {
    case "watchInfo" :
      watchInfoToast?.classList.add("hidden");
      break;
    case "relayInfo" :
      relayInfoToast?.classList.add("hidden");
      break;
    default :
      break;
  }
}

watchInfoIcon?.addEventListener('mouseenter', showToast)
watchInfoIcon?.addEventListener('mouseleave', hideToast)

relayInfoIcon?.addEventListener('mouseenter', showToast)
relayInfoIcon?.addEventListener('mouseleave', hideToast)