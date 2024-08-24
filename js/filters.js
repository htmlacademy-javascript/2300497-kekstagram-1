import { renderPicturesList } from './template-photos.js';

let photosData = [];

const filterPictures = (filterType) => {
  let filteredPhotos;
  switch (filterType) {
    case 'default':
      filteredPhotos = photosData.slice();
      break;
    case 'discussed':
      filteredPhotos = photosData.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    case 'random':
      filteredPhotos = photosData.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      break;
    default:
      filteredPhotos = photosData.slice();
      break;
  }
  return filteredPhotos;
};

const filterButtons = document.querySelectorAll('.img-filters__button');


filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filterType = button.dataset.filter;
    const filteredPhotos = filterPictures(filterType);
    renderPicturesList(filteredPhotos);
  });
});

const setPhotoData = (photo) => {
  photosData = photo;
};

export { filterPictures, setPhotoData };
