const TRIP_POINTS_COUNT = 20;

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATION = ['Amsterdam', 'Chamonix', 'Geneva', 'London','Helsinki','Oslo','Den Haag','Moscow'];

const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];

const ElementsCount = {
  MIN: 1,
  MAX: 4
};

const PictureNumber = {
  MIN: 0,
  MAX: 10
};

const Price = {
  MIN: 100,
  MAX: 1000
};
export{TRIP_POINTS_COUNT, TYPES, DESTINATION, DESCRIPTIONS, ElementsCount, PictureNumber, Price};
