const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "images/accra-ghana-temple.webp"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl: "images/nauvoo-illinois-temple.webp"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/rome-italy-temple.webp"
  }
];

const heading = document.querySelector('main h1');
const container = document.getElementById('temple-container');

function renderTemples(templeList) {
  container.innerHTML = '';

  templeList.forEach((temple) => {
    const card = document.createElement('div');
    card.classList.add('temple-card');

    const name = document.createElement('h2');
    name.textContent = temple.templeName;

    const location = document.createElement('p');
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedicated = document.createElement('p');
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement('p');
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy';

    card.append(name, location, dedicated, area, img);
    container.append(card);
  });
}

function filterTemples(filter) {
  switch (filter) {
    case 'old':
      return temples.filter((temple) => parseInt(temple.dedicated.split(',')[0], 10) < 1900);
    case 'new':
      return temples.filter((temple) => parseInt(temple.dedicated.split(',')[0], 10) > 2000);
    case 'large':
      return temples.filter((temple) => temple.area > 90000);
    case 'small':
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primary-nav');

hamburger.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
});

const navLinks = document.querySelectorAll('#primary-nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const filter = link.dataset.filter;

    heading.textContent = link.textContent;
    renderTemples(filterTemples(filter));

    primaryNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.innerHTML = '&#9776;';
  });
});

renderTemples(temples);
