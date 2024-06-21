const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const renderTemplate = ({ url, comments, likes }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  const pictureComments = pictureElement.querySelector('.picture__comments');
  pictureComments.textContent = comments.length;
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureLikes.textContent = likes;

  return pictureElement;
};


const renderPictures = (photos) => {
  const pictureListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureCard = renderTemplate(photo);
    pictureListFragment.appendChild(pictureCard);
  });

  picturesList.appendChild(pictureListFragment);
};


export { renderPictures };
