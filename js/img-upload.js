const closeButton = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('#upload-file');
const previewImg = document.querySelector('.default-preview-img');
const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для загрузки файла и установки его в preview
const fileLoader = () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
    };
    reader.readAsDataURL(file);
  }
};

// Функция для закрытия оверлея
const closeOverlay = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  document.removeEventListener('keydown', onDocumentKeydown);
};

fileInput.addEventListener('change', () => {
  fileLoader();
  fileInput.value = '';
});
closeButton.addEventListener('click', closeOverlay);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeOverlay();
  }
};

form.addEventListener('submit', (event) => {
  if (!fileInput.files.length) {
    event.preventDefault(); // Предотвращаем отправку формы, если файл не выбран
    alert('Пожалуйста, выберите изображение для загрузки.'); // Сообщение для пользователя
  }
});
