const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const products = [
  { id: "fc-1888", name: "flux capacitor" },
  { id: "fc-2050", name: "power laces" },
  { id: "fs-1987", name: "time circuits" },
  { id: "ac-2000", name: "low voltage reactor" },
  { id: "jj-1969", name: "warp equalizer" }
];

function productNameFromId(id) {
  const match = products.find((product) => product.id === id);
  return match ? match.name : id;
}

const params = new URLSearchParams(window.location.search);
const summaryList = document.getElementById('summary-list');

const productId = params.get('product');
if (productId) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Product:</strong> ${productNameFromId(productId)}`;
  summaryList.append(item);
}

const rating = params.get('rating');
if (rating) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Rating:</strong> ${'★'.repeat(Number(rating))}`;
  summaryList.append(item);
}

const installDate = params.get('installDate');
if (installDate) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Date of Installation:</strong> ${installDate}`;
  summaryList.append(item);
}

const features = params.getAll('features');
if (features.length > 0) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Useful Features:</strong> ${features.join(', ')}`;
  summaryList.append(item);
}

const review = params.get('review');
if (review) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Written Review:</strong> ${review}`;
  summaryList.append(item);
}

const username = params.get('username');
if (username) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Submitted by:</strong> ${username}`;
  summaryList.append(item);
}

let reviewCount = parseInt(localStorage.getItem('reviewCount'), 10) || 0;
reviewCount += 1;
localStorage.setItem('reviewCount', reviewCount);

document.getElementById('review-count').textContent =
  `This is review submission #${reviewCount} recorded on this device.`;
