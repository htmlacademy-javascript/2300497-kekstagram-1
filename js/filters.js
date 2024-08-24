import { renderPicturesList } from './template-photos.js';

const getRandomPictures = (photos, count) => {
  const randomPhotos = [];
  const photoIds = {};

  while (randomPhotos.length < count) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    if (!photoIds[randomPhoto.id]) {
      randomPhotos.push(randomPhoto);
      photoIds[randomPhoto.id] = true;
    }
  }

  return randomPhotos;
};

const filterPictures = (photos, filterType) => {
  let filteredPhotos = [];

  switch (filterType) {
    case 'default':
      filteredPhotos = photos.slice(); // копируем оригинальный массив
      break;

    case 'random':
      filteredPhotos = getRandomPictures(photos, 10);
      break;

    case 'discussed':
      filteredPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;

    default:
      throw new Error(`Unknown filter type: ${filterType}`);
  }

  return filteredPhotos;
};

const picturesContainer = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filterType = button.dataset.filter;
    const filteredPhotos = filterPictures(photos, filterType);
    picturesContainer.innerHTML = '';
    renderPicturesList(filteredPhotos);
  });
});

export { filterPictures, getRandomPictures };
