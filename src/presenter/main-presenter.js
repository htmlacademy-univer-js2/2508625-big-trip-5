import WithoutPointView from '../view/without-point-view';
import FormEdit from '../view/form-edite-view';
import PointListEdit from '../view/point-list-view';
import PointEdit from '../view/point-view';
import Sort from '../view/sorting-view';
import { render, replace } from '../framework/render.js';

export default class Presenter {
  #container = null;
  #component = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;
  constructor(container) {
    this.#container = container;
    this.#component = new PointListEdit();
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    if(this.#boardPoints.length === 0){
      render(new WithoutPointView(), this.#container);
    } else{
      render(new Sort(), this.#container);
      render(this.#component, this.#container);
      for(const point of this.#boardPoints){
        this.#renderTripPoint(point);
      }
    }
  }

  #renderTripPoint = (point) => {
    const pointComponent = new PointEdit(point, this.#destinations, this.#offers);
    const editingFormComponent = new FormEdit(point, this.#destinations, this.#offers);

    const replaceComponents = (newComponent, oldComponent) => {
      replace(newComponent, oldComponent);
    };

    const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();
        replaceComponents(pointComponent, editingFormComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceComponents(editingFormComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    });


    editingFormComponent.setPointClickHandler(() => {
      replaceComponents(pointComponent, editingFormComponent);
      document.RemoveEventListener('keydown', onEscKeyDown);
    });

    editingFormComponent.setSubmitHandler(() => {
      replaceComponents(pointComponent, editingFormComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#component.element);

  };
}
