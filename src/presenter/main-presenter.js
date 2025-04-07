import FilterView from '../view/filters-view';
import FormCreation from '../view/form-create-view';
import FormEdit from '../view/form-edite-view';
import PointListEdit from '../view/point-list-view';
import PointEdit from '../view/point-view';
import Sort from '../view/sorting-view';
import { render } from '../render.js';

const ROUTE_POINT_COUNT = 3;

export default class Presenter {
  RoutePointListComponent = new PointListEdit();

  constructor() {
    this.tripEvents = document.querySelector('.trip-events');
    this.tripControlFilters = document.querySelector('.trip-controls__filters');
  }

  init() {
    render(new FilterView(), this.tripControlFilters);
    render(new Sort(), this.tripEvents);
    render(this.RoutePointListComponent, this.tripEvents);
    render(new FormEdit(), this.RoutePointListComponent.getElement());

    for (let i = 0; i < ROUTE_POINT_COUNT; i++) {
      render(new PointEdit(), this.RoutePointListComponent.getElement());
    }

    render(new FormCreation(), this.RoutePointListComponent.getElement());
  }
}
