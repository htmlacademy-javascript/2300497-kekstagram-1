import {photos} from "./data.js";

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const similarPhotos = photos; // функция из блока генерации фотографий

const pictureListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  const pictureComments = pictureElement.querySelector('.picture__comments');
  pictureComments.textContent = comments.length;
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureLikes.textContent = likes;
  picturesList.appendChild(pictureElement);
})

picturesList.appendChild(pictureListFragment);

export {picturesList};
