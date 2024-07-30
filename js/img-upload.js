import { isEscapeKey } from './keyboard-keys.js';

const fileInput = document.querySelector('#upload-file');
const previewImg = document.querySelector('.default-preview-img');
const form = document.querySelector('#upload-select-image');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const scaleBigger = overlay.querySelector('.scale__control--bigger');
const scaleSmaller = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');
const hashtagsField = form.querySelector('#hashtags');
const descriptionField = form.querySelector('#description');
const imgPreview = overlay.querySelector('.img-upload__preview img');
const effectsContainer = overlay.querySelector('.effects__list');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const MAX_HASHTAGS = 5;

// Функция для закрытия оверлея
const closeOverlay = function() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = function(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== hashtagsField && document.activeElement !== descriptionField) {
      evt.preventDefault();
      closeOverlay();
    }
  }
};

// Функция для загрузки файла и установки его в preview
const fileLoader = function() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
      fileInput.value = '';
    };
    reader.readAsDataURL(file);
  }
};

fileInput.addEventListener('change', fileLoader);
closeButton.addEventListener('click', closeOverlay);

// Функция для увеличения/уменьшения изображения
function updateScaleValue(value) {
  scaleValue.value = `${value}%`;
  const scale = value / 100;
  previewImg.style.transform = `scale(${scale})`;
}

function bigScale() {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

function smallScale() {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

scaleBigger.addEventListener('click', bigScale);
scaleSmaller.addEventListener('click', smallScale);

// Реализация фильтров
effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    imgPreview.className = 'default-preview-img';
    if (evt.target.value !== 'none') {
      imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    }
  }
});

// Реализация валидации через Pristine
const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateHashTag(value) {
  if (value === '') {
    return true;
  }

  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  return hashtags.every((tag) => hashtagPattern.test(tag));
}

function validateText(value) {
  return value.length <= 140;
}

pristine.addValidator(hashtagsField, validateHashTag, 'неверно введенный хэш-тег');
pristine.addValidator(descriptionField, validateText, 'До 140 символов');

const validateField = (field) => {
  const isValid = pristine.validate(field);
  field.style.borderColor = isValid ? '' : 'red';
};

function updateFieldBorder(field) {
  validateField(field);
}

function onHashtagsFieldInput() {
  updateFieldBorder(hashtagsField);
}

hashtagsField.addEventListener('input', onHashtagsFieldInput);

function onDescriptionFieldInput() {
  updateFieldBorder(descriptionField);
}

descriptionField.addEventListener('input', onDescriptionFieldInput);

form.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (!valid) {
    evt.preventDefault();
  }
});

export { fileLoader, fileInput };
