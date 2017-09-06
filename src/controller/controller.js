import _ from 'lodash';

export default class Controller {
	constructor (model) {
		this._model = model;
	}

	updateDialogByAppointment (appointmentKey) {
		const appointments = this._model.getAppointments();
		const appointment = appointments[appointmentKey];

		if (appointment) {
			this._model.setDialog(appointment.content);
		}
	}

	increaseOneYear (variationValue) {
		this._model.increaseOneYear();
	}

	decreaseOneYear () {
		this._model.decreaseOneYear();
	}

	increaseOneMonth () {
		this._model.increaseOneMonth();
	}

	decreaseOneMonth () {
		this._model.decreaseOneMonth();
	}

	addAppointment (date, content) {
		this._model.addAppointment({ date, content });
	}

	removeAppointment (date) {
		this._model.removeAppointment(date);
	}
}
