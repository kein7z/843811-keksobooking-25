let currentIndex = 0;
const getImagePath = () => {
  currentIndex++;
  const numImage = (currentIndex.toString()).padStart(2, '0');
  return `img/avatars/user${numImage}.png`;
};

export { getImagePath };
