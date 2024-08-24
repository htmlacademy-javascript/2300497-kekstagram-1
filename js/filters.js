import { renderPicturesList } from './template-photos.js';

let photosData = [];

const RANDOM_PHOTOS_COUNT = 10;


const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const filterPictures = (filterType) => {
  let filteredPhotos = photosData.slice();

  switch (filterType) {
    case 'default':

      break;
    case 'random':

      filteredPhotos = filteredPhotos.sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);
      break;
    case 'discussed':

      filteredPhotos = filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  return filteredPhotos;
};

const picturesContainer = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');

// Функция для обработки нажатия на фильтр
const handleFilterClick = debounce((filterType) => {
  const filteredPhotos = filterPictures(filterType);
  picturesContainer.innerHTML = '';
  renderPicturesList(filteredPhotos);
}, 500);

filterButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    const filterType = button.dataset.filter;
    handleFilterClick(filterType);
  });
});

const setPhotoData = (photo) => {
  photosData = photo;
};

export { filterPictures, setPhotoData };
