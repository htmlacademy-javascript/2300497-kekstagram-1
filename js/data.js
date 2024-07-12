import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Анна', 'Сергей', 'Иван', 'Елена', 'Дмитрий', 'Ольга', 'Максим', 'Алексей', 'Мария', 'Павел', 'Виктор', 'Екатерина', 'Николай', 'Юлия', 'Михаил', 'Игорь'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Закат на берегу моря', 'Горный пейзаж', 'Городские огни ночью', 'Зелёный лес весной', 'Водопад в горах',
  'Пляж с белым песком', 'Цветущие сады', 'Уличные художники за работой', 'Старый город', 'Ночной рынок'
];

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENTS)}`,
  name: `${getRandomArrayElement(NAMES)}`
    });

const createPhoto = (id) => {
  const numberOfComments = getRandomInteger(1, 1000);
  const comments = Array.from({ length: numberOfComments }, (_, index) => createComment(id * 10 + index + 1));

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 20000),
    comments: comments
  };


};


const generatePhotos = (count) => Array.from({ length: count }, (_, index) => createPhoto(index + 1));

const photos = generatePhotos(25);

export { photos };
