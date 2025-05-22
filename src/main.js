import FiltersView from './view/filters-view.js';
import Presenter from './presenter/main-presenter.js';
import PointsModel from './model/main-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/points-mock.js';
import MenuView from './view/main-menu-view.js';
import { generateFilter } from './mock/filters-mock.js';
import { render } from './framework/render.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
const newPresenter = new Presenter(tripContainer);

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();
const pointsModel = new PointsModel();

const filters = generateFilter(points);

pointsModel.init(points, destinations, offersByType);
newPresenter.init(pointsModel);

render(new FiltersView(filters), filterContainer);
render(new MenuView(), menuContainer);
