import {OFFER_TITLES} from '../const.js';
import {createId} from '../utils/mock-util.js';
import {getRandomArrayElement, getRandomNumber} from '../utils/main-util.js';

const generateOffers = (pointType) => {
  const generateOffersId = createId();
  return {
    type: pointType,
    offers: Array.from({length: getRandomNumber(1, 5)},() => ({
      id: generateOffersId(),
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomNumber(10, 150),
    }))
  };
};

export {generateOffers};
