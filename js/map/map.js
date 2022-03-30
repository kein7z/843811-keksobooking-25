import { activatedPage } from '../page-activation/activated-page.js';
import { createOffers } from '../create-offers.js';
import { createCustomPopup } from '../popup.js';

const createOfferss = createOffers(7);
const map = L.map('map-canvas')
  .on('load', () => {
    activatedPage();
  })
  .setView({
    lat: 35.69242,
    lng: 139.77691,
  }, 12);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const marker = L.marker(
  {
    lat: 35.69242,
    lng: 139.77691,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);
marker.addTo(map);

const inputAddress = document.querySelector('#address');
marker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  inputAddress.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
});

const offerPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

createOfferss.forEach((element) => {
  const markerOffer = L.marker({
    lat: element['location']['lat'],
    lng: element['location']['lng'],
  },
  {
    icon: offerPinIcon,
  });
  markerOffer
    .addTo(map)
    .bindPopup(createCustomPopup(element));
});
