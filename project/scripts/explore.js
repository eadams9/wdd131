const places = [
  {
    id: "cape-coast-castle",
    name: "Cape Coast Castle",
    category: "destination",
    region: "Central Region",
    description: "A former slave-trade fortress on Ghana's Atlantic coast, now a UNESCO World Heritage museum honoring those who passed through its “Door of No Return.”",
    image: "images/cape-coast-castle.webp",
    alt: "A stone coastal fortress overlooking the sea"
  },
  {
    id: "kakum-canopy-walk",
    name: "Kakum National Park",
    category: "destination",
    region: "Central Region",
    description: "Home to Africa's first canopy walkway, a series of suspended bridges strung 40 meters above the rainforest floor.",
    image: "images/kakum-canopy-walk.webp",
    alt: "A wooden suspension bridge through a forest canopy"
  },
  {
    id: "kwame-nkrumah-mausoleum",
    name: "Kwame Nkrumah Mausoleum",
    category: "destination",
    region: "Greater Accra",
    description: "The memorial park and resting place of Ghana's first president, set in downtown Accra.",
    image: "images/kwame-nkrumah-mausoleum.webp",
    alt: "Kwame Nkrumah Mausoleum and Memorial Park in Accra"
  },
  {
    id: "wli-waterfalls",
    name: "Wli Waterfalls",
    category: "destination",
    region: "Volta Region",
    description: "The tallest waterfall in West Africa, reached by a forest trail from the town of Hohoe.",
    image: "images/wli-waterfalls.webp",
    alt: "A tall waterfall in a tropical forest"
  },
  {
    id: "mole-national-park",
    name: "Mole National Park",
    category: "destination",
    region: "Savannah Region",
    description: "Ghana's largest wildlife refuge, where walking and jeep safaris bring visitors close to elephants and antelope.",
    image: "images/mole-national-park.webp",
    alt: "An elephant crossing a road"
  },
  {
    id: "black-star-square",
    name: "Black Star Square",
    category: "destination",
    region: "Greater Accra",
    description: "Independence Arch and the surrounding plaza in Accra, the ceremonial heart of Ghana's 1957 independence.",
    image: "images/black-star-square.webp",
    alt: "Independence Arch at Black Star Square in Accra, flanked by Ghanaian flags"
  },
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    category: "cuisine",
    region: "National dish",
    description: "A smoky, tomato-and-pepper rice dish cooked with onions and spices, central to celebrations across West Africa.",
    image: "images/jollof-rice.webp",
    alt: "A plate of Ghanaian jollof rice"
  },
  {
    id: "waakye",
    name: "Waakye",
    category: "cuisine",
    region: "Breakfast & lunch staple",
    description: "Rice and beans cooked with dried millet or sorghum leaves, giving the dish its distinctive reddish-brown color.",
    image: "images/waakye.webp",
    alt: "A bowl of rice with vegetables"
  },
  {
    id: "banku-tilapia",
    name: "Banku and Tilapia",
    category: "cuisine",
    region: "Coastal favorite",
    description: "Fermented corn and cassava dough served alongside grilled tilapia and a fiery pepper sauce.",
    image: "images/banku-tilapia.webp",
    alt: "Grilled fish on a plate"
  },
  {
    id: "kelewele",
    name: "Kelewele",
    category: "cuisine",
    region: "Street food",
    description: "Cubes of ripe plantain fried with ginger, chili, and warm spices, sold hot from roadside stalls.",
    image: "images/kelewele.webp",
    alt: "Fried food in a pan"
  },
  {
    id: "fufu-light-soup",
    name: "Fufu with Light Soup",
    category: "cuisine",
    region: "Comfort food",
    description: "Pounded cassava and plantain served in a spicy, tomato-based soup, traditionally eaten by hand.",
    image: "images/fufu-light-soup.webp",
    alt: "A bowl of soup with meat"
  },
  {
    id: "red-red",
    name: "Red Red",
    category: "cuisine",
    region: "Vegetarian-friendly",
    description: "Black-eyed peas stewed in red palm oil, served with fried ripe plantain.",
    image: "images/red-red.webp",
    alt: "A bowl of beans"
  }
];

const container = document.getElementById('explore-container');
const filterButtons = document.querySelectorAll('.filters button');
const wishlistSummary = document.getElementById('wishlist-summary');

let currentFilter = 'all';

function getWishlist() {
  return JSON.parse(localStorage.getItem('ghanaWishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('ghanaWishlist', JSON.stringify(wishlist));
}

function toggleWishlist(id) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(id);

  if (index === -1) {
    wishlist.push(id);
  } else {
    wishlist.splice(index, 1);
  }

  saveWishlist(wishlist);
  updateWishlistSummary();
}

function updateWishlistSummary() {
  const wishlist = getWishlist();

  wishlistSummary.textContent = wishlist.length > 0
    ? `You have saved ${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} to your trip.`
    : `You haven't saved anything yet — click "Save to My Trip" on a card below.`;
}

function categoryLabel(category) {
  return category === 'destination' ? 'Destination' : 'Cuisine';
}

function renderPlaces(filter) {
  const wishlist = getWishlist();
  const filtered = filter === 'all'
    ? places
    : places.filter((place) => place.category === filter);

  container.innerHTML = filtered.map((place) => {
    const saved = wishlist.includes(place.id);
    const buttonLabel = saved ? '★ Saved to My Trip' : '☆ Save to My Trip';

    return `
      <article class="card">
        <img src="${place.image}" alt="${place.alt}" loading="lazy" width="500" height="350">
        <div class="card-body">
          <span class="card-tag">${categoryLabel(place.category)}</span>
          <h3>${place.name}</h3>
          <p class="card-region"><em>${place.region}</em></p>
          <p>${place.description}</p>
          <button type="button" class="wishlist-btn${saved ? ' saved' : ''}" data-id="${place.id}">${buttonLabel}</button>
        </div>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.wishlist-btn').forEach((button) => {
    button.addEventListener('click', () => {
      toggleWishlist(button.dataset.id);
      renderPlaces(currentFilter);
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderPlaces(currentFilter);
  });
});

updateWishlistSummary();
renderPlaces(currentFilter);
