import { renderPictures } from './template-photos.js';
import { openBigPicture } from './big-photo.js';
let currentPhoto;

const renderGallery = (photos) => {
  renderPictures(photos);

  const photosContainer = document.querySelector('.pictures');

  const onCardsClick = (evt) => {
    const photoElement = evt.target.closest('.picture');

    if (!photoElement) {
      return;
    }

    const id = parseInt(photoElement.dataset.id, 10);
    const cardData = photos.find((photo) => photo.id === id);
    if (cardData) {
      currentPhoto = cardData;
      openBigPicture(cardData);
    }
  };

  photosContainer.addEventListener('click', onCardsClick);
};

export { renderGallery };
