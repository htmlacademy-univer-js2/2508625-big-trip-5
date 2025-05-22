import { points } from '../mock/points-mock.js';

export default class PointsModel {
  constructor() {
    this.points = [];
  }

  init() {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }
}
