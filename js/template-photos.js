import { openBigPicture } from './big-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderPicturesList = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;


    pictureElement.addEventListener('click', () => {
      openBigPicture(picture);
    });

    fragment.appendChild(pictureElement);
  });


  clearPictures();
  picturesContainer.appendChild(fragment);
};

export { renderPicturesList };
