import Publisher from '../publisher/Publisher';

export default class Model extends Publisher {
	constructor (date) {
		super();
		this._date = (date && new Date(date)) || new Date();
		this._dates = [];
		this._appointments = {};
		this._dialog = null;

		this._buildDateList();
	}

	_buildDateList () {
		const firstDate = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
		const lastDate = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
		const lastDay = lastDate.getDate();
		const firstDayOfWeek = firstDate.getDay();
		const lastDayOfWeek = lastDate.getDay();

		this._dates.length = 0;

		for (let i = 0; i < firstDayOfWeek; i++) {
			this._dates.push(null);
		}

		for (let i = 0; i < lastDay; i++) {
			this._dates.push({
				date: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`,
				day: firstDate.getDate()
			});

			firstDate.setDate(firstDate.getDate() + 1);
		}

		for (let i = 6 - lastDayOfWeek; i--;) {
			this._dates.push(null);
		}
	}

	getCurrentYear () {
		return this._date.getFullYear();
	}

	getCurrentMonth () {
		return this._date.getMonth() + 1;
	}

	addAppointment (params) {
		const date = params.date;
		const content = params.content;

		this._appointments[date] = {
			content: content
		};
		this.trigger(this.getState());
	}

	removeAppointment (date) {
		delete this._appointments[date];
	}

	getAppointment (date) {
		return this._appointments[date];
	}

	increaseOneYear () {
		this._date.setFullYear(this._date.getFullYear() + 1);
		this.trigger(this.getState());
	}

	decreaseOneYear () {
		this._date.setFullYear(this._date.getFullYear() - 1);
		this.trigger(this.getState());
	}

	increaseOneMonth () {
		this._date.setMonth(this._date.getMonth() + 1);
		this.trigger(this.getState());
	}

	decreaseOneMonth () {
		this._date.setMonth(this._date.getMonth() - 1);
		this.trigger(this.getState());
	}

	getState () {
		return {
			year: this.getCurrentYear(),
			month: this.getCurrentMonth(),
			dates: this.getDates(),
			appointments: this.getAppointments(),
			dialog: this.getDialog()
		};
	}

	getDate () {
		return new Date(this._date.valueOf());
	}

	getDates () {
		const dateList = [];
		const size = this._dates.length;

		for (let i = 0; i < size; i++) {
			dateList.push(this._dates[i]);
		}

		return dateList;
	}

	getAppointments () {
		const appointments = {};

		for (let i in this._appointments) {
			appointments[i] = this._appointments[i];
		}

		return appointments;
	}

	setDialog (dialog) {
		this._dialog = dialog;
		this.trigger(this.getState());
	}

	getDialog () {
		return this._dialog;
	}
}
