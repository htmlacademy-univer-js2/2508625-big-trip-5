import FilterView from './view/filters-view.js';
import Presenter from './presenter/main-presenter.js';
import PointsModel from './model/main-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/points-mock.js';
import { render } from './render.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const newPresenter = new Presenter(tripContainer);

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();
const pointsModel = new PointsModel();

render(new FilterView(), filterContainer);

pointsModel.init(points, destinations, offersByType);
newPresenter.init(pointsModel);
