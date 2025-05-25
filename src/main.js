import {render} from './framework/render.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/main-presenter.js';
import TripModel from './model/main-model.js';
import {generateFilters} from './mock/filters-mock.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const tripModel = new TripModel();
const eventsPresenter = new EventsPresenter(eventsContainer, tripModel);
const filters = generateFilters(tripModel.waypoints);

render(new FiltersView({filters}), filtersContainer);
eventsPresenter.init();
