const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

const temperature = 10;
const windSpeed = 5;

const windChillOutput = document.getElementById('windchill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillOutput.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`;
} else {
  windChillOutput.textContent = 'N/A';
}
