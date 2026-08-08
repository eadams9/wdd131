const params = new URLSearchParams(window.location.search);
const summaryList = document.getElementById('summary-list');

const fieldLabels = [
  { key: 'fullname', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'region', label: 'Region of Interest' },
  { key: 'travelers', label: 'Travelers' },
  { key: 'travelDate', label: 'Preferred Travel Date' },
  { key: 'duration', label: 'Trip Duration' },
  { key: 'message', label: 'Message' }
];

fieldLabels.forEach((field) => {
  const value = params.get(field.key);
  if (value) {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${field.label}:</strong> ${value}`;
    summaryList.append(item);
  }
});

const interests = params.getAll('interests');
if (interests.length > 0) {
  const item = document.createElement('li');
  item.innerHTML = `<strong>Interests:</strong> ${interests.join(', ')}`;
  summaryList.append(item);
}

let inquiryCount = parseInt(localStorage.getItem('inquiryCount'), 10) || 0;
inquiryCount += 1;
localStorage.setItem('inquiryCount', inquiryCount);

document.getElementById('inquiry-count').textContent =
  `This is inquiry #${inquiryCount} submitted from this device.`;
