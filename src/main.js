import Presenter from './presenter/main-presenter.js';
import DestinationModel from './model/destination-model.js';
import PointsModel from './model/point-model.js';
import OffersModel from './model/offer-model.js';
import { points} from './mock/points-mock.js';
import { destinations } from './mock/destinations-mock.js';

const filterContainer = document.body.querySelector('.trip-controls__filters');
const eventsContainer = document.body.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
pointsModel.init(points);
destinationModel.init(destinations);

const presenter = new Presenter({eventsContainer, filterContainer, pointsModel, destinationModel, offersModel});
presenter.init();
