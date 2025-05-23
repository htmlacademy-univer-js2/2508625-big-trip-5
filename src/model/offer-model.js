import {offers} from '../mock/offers-mock.js';

export default class OffersModel {
  constructor() {
    this.offers = [];
  }

  init() {
    this.offers = offers;
  }

  getOffers() {
    return this.offers;
  }
}
