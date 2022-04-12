const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const DEFAULT_PREVIEW_AVATAR_SRC = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserHouseImg = document.querySelector('.ad-form__upload input[type=file]');
const previewHouseImg = document.querySelector('.ad-form__photo');

fileChooserAvatar.addEventListener('change', () => {
  const fileAvatar = fileChooserAvatar.files[0];
  const fileNameAvatar = fileAvatar.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileNameAvatar.endsWith(it));
  if (matches) {
    previewAvatar.src = URL.createObjectURL(fileAvatar);
  }
});

const changeSrc = (newSrc, fileHouseImg) => {
  newSrc.src = URL.createObjectURL(fileHouseImg);
};

fileChooserHouseImg.addEventListener('change', () => {
  const fileHouseImg = fileChooserHouseImg.files[0];
  const fileNameHouseImg = fileHouseImg.name.toLowerCase();
  const lengtHouseImgList = previewHouseImg.children.length;
  const matches = FILE_TYPES.some((it) => fileNameHouseImg.endsWith(it));
  if (matches && lengtHouseImgList < 1) {
    const imageHouse = document.createElement('img');
    imageHouse.src = URL.createObjectURL(fileHouseImg);
    imageHouse.alt = 'Фотография жилья';
    imageHouse.width = '70';
    imageHouse.height = '70';
    previewHouseImg.append(imageHouse);
  } else if (matches && lengtHouseImgList > 0) {
    const newSrc = previewHouseImg.querySelector('img');
    changeSrc(newSrc, fileHouseImg);
  }
});

const resetImg = () => {
  previewAvatar.src = DEFAULT_PREVIEW_AVATAR_SRC;
  Array.from(previewHouseImg.children).forEach((element) => element.remove());
};

export { resetImg };
