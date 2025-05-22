import { render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/info-view.js';

const tripContainer = document.querySelector('.trip-main');

export default class TripInfoPresenter {
  init() {
    render(new TripInfo(), tripContainer, RenderPosition.AFTERBEGIN);
  }
}
