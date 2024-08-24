import { openBigPicture } from "./big-photo.js";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Функция для рендеринга списка фотографий
const renderPicturesList = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // Добавляем обработчик клика для открытия большой фотографии
    pictureElement.addEventListener('click', () => {
      openBigPicture(picture);
    });

    fragment.appendChild(pictureElement);
  });

  // Очищаем контейнер перед добавлением новых элементов
  clearPictures();
  picturesContainer.appendChild(fragment);
};

// Функция для очистки только фотографий из контейнера
const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

export { renderPicturesList };
