import _ from 'lodash';
import $ from 'jquery';

const VIEW_SIZE_OF_DATE_LIST = 42;

/**
 * 달력의 DOM과 Event를 관리합니다.
 * 달력의 DOM은 효율성을 위해서 42개의 날짜 엘리먼트를 생성하고 text 값을 변경하여 사용합니다.
 * 달력에서 전체 날짜는 Date라 하고 Date가 날짜를 포함한 경우는 Day라고 합니다.
 * 달력에서 1일 이전의 공백 Date와 마지막일 이후의 공백 Date는 BlankDay라고 합니다.
 * 달력에서 Date가 노출되어질 필요가 없는 경우에는 해당 Date는 EmptyDay라고 합니다.
 */
export default class View {
	constructor (element, controller) {
		if (typeof element === 'string') {
			this._$element = $(`#${element}`);
		} else {
			this._$element = $(element);
		}

		this._controller = controller;
		this._$element.html(this._tempalte());
		this._$year = this._$element.find('._year');
		this._$month = this._$element.find('._month');
		this._$dates = this._$element.find('._date');
		this._$dialog = this._$element.find('._dialog');

		this._clickDate = this._clickDate.bind(this);
		this._addEventListener();
	}

	_tempalte () {
		const dates = '<div class="date _date"></div>'.repeat(VIEW_SIZE_OF_DATE_LIST);
		const compiled = _.template(`
			<div class="_container">
				<div class="_year"></div>
				<div class="_month"></div>
				<div class="_dates"><%= dates %></div>
				<div class="_dialog"></div>
			</div>`
		);
		return compiled({ dates: dates });
	}

	_addEventListener () {
		this._$element.on('click', '._date', this._clickDate);
	}

	_clickDate (e) {
		const $date = $(e.target);
		const date = $date.data('date');
		this._controller.updateDialogByAppointment(date);
	}

	_clickIncreaseYear (e) {
		this._controller.increaseOneYear(increaseValue);
	}

	_clickDecreaseYear (e) {
		this._controller.updateYear(decreaseValue);
	}

	destroy () {
		this._$element.off('click', '._date', this._clickDate);
		this._$element = null;
	}

	update (state) {
		const { year, month, dates, appointments, dialog } = state;

		this._setDates(dates, appointments);
		this._setDialog(dialog);
		this._setMonthHeader(year, month);
	}

	_setDates (dates, appointments) {
		let isHiddenDate = false;

		dates.forEach((date, index) => {
			const $date = this._$dates.eq(index);

			if (!isHiddenDate && index) {
				isHiddenDate = this._isSundayHasNull(date, index);
			}

			if (isHiddenDate) {
				this._drawEmptyDay($date);
				return;
			}

			if (this._isBlankDay(date, isHiddenDate)) {
				this._drawBlankDay($date);
				return;
			}

			this._drawDay($date, appointments, date);
		});
	}

	_isSundayHasNull (date, index) {
		const isSundey = (index) % 7 === 0;
		return isSundey && date === null;
	}

	_drawEmptyDay ($date) {
		$date.removeClass('active').addClass('hide');
	}

	_isBlankDay (date, isHiddenDate) {
		return !(date || isHiddenDate);
	}

	_drawBlankDay ($date) {
		$date.removeClass('active hide');
	}

	_drawDay ($date, appointments, item) {
		const { date, day } = item;
		const appointment = appointments[date];

		if (appointment) {
			this._drawDateWithAppointment($date, appointment, day);
		} else {
			this._drawDateOnly($date, item);
		}

		$date.data('date', date);
	}

	_drawDateWithAppointment ($date, appointment, day) {
		const compiled = _.template(`
			<span class="day"><%= day %></span>
			<span class="appintment"><%= content %></span>
		`);
		const html = compiled({
			day: day,
			content: appointment.content
		});
		$date.addClass('active').removeClass('hide').html(html);
	}

	_drawDateOnly ($date, { date, day }) {
		const compiled = _.template(`<span class="day"><%= day %></span>`);
		const html = compiled({ day: day });
		$date.removeClass('active hide').html(html);
	}

	_setMonthHeader (year, month) {
		this._$year.text(year);
		this._$month.text(month);
	}

	_setDialog (dialog) {
		this._$dialog.toggleClass('active', Boolean(dialog)).html(dialog);
	}

	getElement () {
		return this._$element;
	}
}
