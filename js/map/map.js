import { activatedPage } from '../page-activation/activated-page.js';
import { createCustomPopup } from '../popup.js';

const CENTER_MAP_LOCATION = {
  lat: 35.69242,
  lng: 139.77691,
};

const map = L.map('map-canvas')
  .on('load', () => {
    activatedPage();
  })
  .setView({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
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
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
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

const renderOffers = (e) => {
  e.forEach((element) => {
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
};

const resetMap = () => {
  map.setView({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  }, 12);
  marker.setLatLng({
    lat: CENTER_MAP_LOCATION.lat,
    lng: CENTER_MAP_LOCATION.lng,
  });
  map.clearLayers();
  inputAddress();
};
export { resetMap, renderOffers };
