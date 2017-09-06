import Controller from '../controller/Controller';
import Model from '../model/Model';
import View from '../view/View';

export default class App {
	constructor (element) {
		this._model = new Model();
		this._controller = new Controller(this._model);
		this._view = new View(element, this._controller);

		this._model.subscribe(this._view.update);
		this._view.update(this._model.getState());
	}
}
