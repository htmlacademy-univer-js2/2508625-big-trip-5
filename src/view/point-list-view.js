import AbstractView from '../framework/view/abstract-view.js';

const createPointListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class PointListEdit extends AbstractView{

  get template(){
    return createPointListTemplate();
  }
}
