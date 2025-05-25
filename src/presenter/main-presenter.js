import {remove, render} from '../framework/render.js';
import SortingView from '../view/sort-view.js';
import EventsListView from '../view/points-list-view.js';
import NoWaypointsView from '../view/empty-point-list-view.js';
import WaypointPresenter from './point-presenter.js';
import {FilterType, NewWaypointButtonMode, SortType, UpdateType, UserAction} from '../const.js';
import {sortByDate, sortByPrice, sortByTime} from '../utils/route-point-util.js';
import { filter } from '../utils/filter-util.js';
import NewWaypointPresenter from './next-point-presenter.js';
import NewWaypointButton from '../view/point-button-view.js';

export default class EventsPresenter {
  #container = null;
  #tripModel = null;
  #filterModel = null;
  #newWaypointButtonContainer = null;

  #sortingComponent = null;
  #noWaypointsComponent = null;
  #eventsListComponent = new EventsListView();
  #newWaypointButtonComponent = null;

  #NewWaypointButtonMode = NewWaypointButtonMode.ENABLED;

  #waypointPresenters = new Map();
  #newWaypointPresenter = null;

  #currentSort = SortType.DAY;
  #currentFilter = FilterType.EVERYTHING;

  constructor({eventsContainer: container, tripModel, filterModel, newWaypointButtonContainer}) {
    this.#container = container;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;
    this.#newWaypointButtonContainer = newWaypointButtonContainer;

    this.#renderNewWaypointPresenter();

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderEvents();
  }

  #createWaypoint () {
    this.#currentSort = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newWaypointPresenter.init();
  }

  get waypoints() {
    this.#currentFilter = this.#filterModel.filter;
    const waypoints = this.#tripModel.waypoints;
    const filteredWaypoints = filter[this.#currentFilter](waypoints);

    switch (this.#currentSort) {
      case SortType.TIME:
        return filteredWaypoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredWaypoints.sort(sortByPrice);
      default:
        return filteredWaypoints.sort(sortByDate);
    }
  }

  #updateWaypointsData = (updatedPoint) => {
    const destinationsList = this.#tripModel.destinations;
    const destination = this.#tripModel.getDestinationById(updatedPoint.destination);
    const offersList = this.#tripModel.getOffersByType(updatedPoint.type);
    this.#waypointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination,
      offersList,
      destinationsList
    });
  };

  #handleViewAction = (actionType, updateType, updatedWaypoint) => {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#tripModel.updateWaypoint(updateType, updatedWaypoint);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#tripModel.addWaypoint(updateType, updatedWaypoint);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#tripModel.deleteWaypoint(updateType, updatedWaypoint);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedWaypoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#updateWaypointsData(updatedWaypoint);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#renderEvents();
        break;
    }
  };

  #resetWaypointsMode = () => {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.resetToDefaultWaypoint());
  };

  #clearEvents({resetSortType = false} = {}) {
    this.#waypointPresenters.forEach((waypointPresenter) => waypointPresenter.destroy());
    this.#waypointPresenters.clear();

    this.#NewWaypointButtonMode = NewWaypointButtonMode.ENABLED;

    remove(this.#sortingComponent);
    remove(this.#noWaypointsComponent);

    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }
  }

  #updateDestination = (updatedName) => {
    const updatedDestination = this.#tripModel.getDestinationByName(updatedName);

    return updatedDestination;
  };

  #updateOffers = (updatedType) => {
    const updatedOffers = this.#tripModel.getOffersByType(updatedType);

    return updatedOffers;
  };

  #changeNewWaypointButtonMode = () => {
    this.#NewWaypointButtonMode = NewWaypointButtonMode.ENABLED;
    this.#renderNewWaypointButton();
  };

  #renderNewWaypointPresenter() {
    this.#newWaypointPresenter = new NewWaypointPresenter({
      eventsListContainer: this.#eventsListComponent,
      updateWaypointsData: this.#handleViewAction,
      offers: this.#tripModel.getOffersByType('flight'),
      destinationsList: this.#tripModel.destinations,
      updateDestination: this.#updateDestination,
      updateOffers: this.#updateOffers,
      changeNewWaypointButtonMode: this.#changeNewWaypointButtonMode
    });
  }

  #renderNewWaypointButton() {
    if (this.#newWaypointButtonComponent !== null) {
      remove(this.#newWaypointButtonComponent);
    }

    this.#newWaypointButtonComponent = new NewWaypointButton({
      mode: this.#NewWaypointButtonMode,
      onClick: this.#onNewWaypointButtonClick
    });

    render(this.#newWaypointButtonComponent, this.#newWaypointButtonContainer);
  }

  #renderWaypoint(point, destinationsList, destination, offersList) {
    const waypointPresenter = new WaypointPresenter({
      eventsListComponent: this.#eventsListComponent.element,
      updateWaypointsData: this.#handleViewAction,
      resetWaypointsMode: this.#resetWaypointsMode,
      updateDestination: this.#updateDestination,
      updateOffers: this.#updateOffers,
    });

    waypointPresenter.init({point, destinationsList, destination, offersList});
    this.#waypointPresenters.set(point.id, waypointPresenter);
  }

  #renderWaypoints() {
    const destinationsList = this.#tripModel.destinations;

    this.waypoints.map((point) => {
      const destination = this.#tripModel.getDestinationById(point.destination);
      const offersList = this.#tripModel.getOffersByType(point.type);

      this.#renderWaypoint(point, destinationsList, destination, offersList);
    });
  }

  #renderNoWaypoints() {
    this.#noWaypointsComponent = new NoWaypointsView({filterType: this.#currentFilter});

    render(this.#noWaypointsComponent, this.#container);
  }

  #applySort = (sortType) => {
    if (sortType === this.#currentSort) {
      return;
    }

    this.#currentSort = sortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSort: this.#currentSort,
      applySort: this.#applySort
    });

    render(this.#sortingComponent, this.#container);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#container);
  }

  #renderEvents() {
    this.#renderNewWaypointButton();

    if (!this.waypoints.length) {
      this.#renderNoWaypoints();
      return;
    }

    this.#renderSorting();
    this.#renderEventsList();
    this.#renderWaypoints();
  }

  #onNewWaypointButtonClick = (evt) => {
    evt.preventDefault();

    this.#createWaypoint();
    this.#NewWaypointButtonMode = NewWaypointButtonMode.DISABLED;
    this.#renderNewWaypointButton();
  };
}
