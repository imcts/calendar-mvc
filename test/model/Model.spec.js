import expect from 'expect';
import Model from '../../src/model/Model';

describe('Model', () => {
	it('Model(): 지정한 날짜로 모델을 생성합니다.', () => {
		// Given
		const date = '2017-3-1';
		const model = new Model(date);

		// When
		const year = model.getCurrentYear();
		const month = model.getCurrentMonth();

		// Then
		expect(year).toEqual(2017);
		expect(month).toEqual(3);
	});

	it('Model(): 지정한 날짜가 없는 경우 현재 날짜로 모델을 생성합니다.', () => {
		// Given
		const now = new Date();
		const model = new Model();

		// When
		const year = model.getCurrentYear();
		const month = model.getCurrentMonth();

		// Then
		expect(year).toEqual(now.getFullYear());
		expect(month).toEqual(now.getMonth() + 1);
	});

	it('getDates(): 현재 달의 날짜 목록을 리턴합니다.', () => {
		// Given
		const date = '2017-7-1';
		const model = new Model(date);

		// When
		const dates = model.getDates();

		// Then
		//  현재 달과 달의 시작일과 같은 주에 속하는 이전달의 날짜 그리고
		//  마지막날과 같은 주에 속하는 다음달의 날이 포함되어야 합니다.
		expect(dates.length).toEqual(42);

		const thirtiethOfJune = dates[5];
		expect(thirtiethOfJune).toNotExsist;

		const firstOfJuly = dates[6].date;
		expect(firstOfJuly).toEqual('2017-7-1');

		const thirtyFirstOfJuly = dates[36].date;
		expect(thirtyFirstOfJuly).toEqual('2017-7-31');

		const firstOfAugust = dates[37];
		expect(firstOfAugust).toNotExsist;
	});

	it('addAppointment/getAppointment() 지정한 날짜에 약속을 등록할 수 있어야 합니다.', () => {
		// Given
		const date = '2017-7-1';
		const model = new Model(date);
		const appointmentContent = '약속 내용';

		// When
		model.addAppointment({
			date: date,
			content: appointmentContent
		});

		// Then
		const appointment = model.getAppointment(date);
		expect(appointment).toExist();
		expect(appointment.content).toEqual(appointmentContent);
	});

	it('addAppointment(): 지정한 날짜에 약속이 등록되어져 있을때, 새로운 약속을 덮어써야 합니다.', () => {
		// Given
		const date = '2017-7-1';
		const oldAppointment = '약속 내용';
		const newAppointment = '새로운 약속 내용';
		const model = new Model(date);

		model.addAppointment({
			date: date,
			content: oldAppointment
		});

		// When
		model.addAppointment({
			date: date,
			content: newAppointment
		});

		// Then
		const appointment = model.getAppointment(date);
		expect(appointment.content).toNotEqual(oldAppointment);
		expect(appointment.content).toEqual(newAppointment);
	});

	it('getAppointments(): 모델에 등록되어 있는 모든 약속들을 반환 합니다.', () => {
		// Given
		const model = new Model();

		model.addAppointment({
			date: '2017-7-1',
			content: '첫 번째 약속'
		});

		model.addAppointment({
			date: '2017-7-2',
			content: '두 번째 약속'
		});

		// When
		const appointments = model.getAppointments();

		// Then
		const keys = Object.keys(appointments);
		const secondAppointment = appointments[keys[1]];

		expect(keys.length).toEqual(2);
		expect(secondAppointment.content).toEqual('두 번째 약속');
	});

	it('removeAppointment(): 지정한 날짜의 약속이 삭제 되어야 합니다.', () => {
		// Given
		const date = '2017-7-1';
		const model = new Model();

		model.addAppointment({
			date: date,
			content: '첫 번째 약속'
		});

		// When
		model.removeAppointment(date);

		// Then
		expect(model.getAppointment(date)).toNotExsist;
	});

	it('setDialog/getDialog(): 다이얼로그의 상태를 설정/해지할 수 있어야 합니다.', () => {
		// Given
		const model = new Model();
		let dialog = {
			content: '다이얼로그 테스트',
			isVisible: true
		};

		// When
		model.setDialog(dialog);

		// Then
		expect(model.getDialog()).toEqual(dialog);

		// Given
		dialog = null;

		// When
		model.setDialog(dialog);

		// Then
		expect(model.getDialog()).toNotExsist;
	});

	it('increaseOneYear(): 지정한 날짜보다 1년 증가해야 합니다.', () => {
		// Given
		const date = '2017-7';
		const model = new Model(date);

		// When
		model.increaseOneYear();

		// Then
		const year = model.getCurrentYear();

		expect(year).toEqual(2018);
	});

	it('decreaseOneYear(): 지정한 날짜보다 1년 감소해야 합니다.', () => {
		// Given
		const date = '2017-7';
		const model = new Model(date);

		// When
		model.decreaseOneYear();

		// Then
		const year = model.getCurrentYear();

		expect(year).toEqual(2016);
	});

	it('increaseOneMonth(): 지정한 날짜보다 1달 증가해야 합니다.', () => {
		// Given
		const date = '2017-7';
		const model = new Model(date);

		// When
		model.increaseOneMonth();

		// Then
		const month = model.getCurrentMonth();

		expect(month).toEqual(8);
	});

	it('decreaseOneMonth(): 지정한 날짜보다 1달 감소해야 합니다.', () => {
		// Given
		const date = '2017-7';
		const model = new Model(date);

		// When
		model.decreaseOneMonth();

		// Then
		const month = model.getCurrentMonth();

		expect(month).toEqual(6);
	});

	it('getState(): 설정된 모델의 상태를 반환할 수 있어야 합니다.', () => {
		// Given
		const date = '2017-7';
		const model = new Model(date);

		model.addAppointment({
			date: '2017-7-4',
			content: '약속1'
		});

		model.addAppointment({
			date: '2017-6-5',
			content: '약속2'
		});

		model.setDialog('등록하신 날짜에 약속이 이미 등록되어 있습니다.');

		// When
		const state = model.getState();

		// Then
		const expectState = {
			year: 2017,
			month: 7,
			dates: [
				null, null, null, null, null, null,
				{date: '2017-7-1', day: 1},
				{date: '2017-7-2', day: 2},
				{date: '2017-7-3', day: 3},
				{date: '2017-7-4', day: 4},
				{date: '2017-7-5', day: 5},
				{date: '2017-7-6', day: 6},
				{date: '2017-7-7', day: 7},
				{date: '2017-7-8', day: 8},
				{date: '2017-7-9', day: 9},
				{date: '2017-7-10', day: 10},
				{date: '2017-7-11', day: 11},
				{date: '2017-7-12', day: 12},
				{date: '2017-7-13', day: 13},
				{date: '2017-7-14', day: 14},
				{date: '2017-7-15', day: 15},
				{date: '2017-7-16', day: 16},
				{date: '2017-7-17', day: 17},
				{date: '2017-7-18', day: 18},
				{date: '2017-7-19', day: 19},
				{date: '2017-7-20', day: 20},
				{date: '2017-7-21', day: 21},
				{date: '2017-7-22', day: 22},
				{date: '2017-7-23', day: 23},
				{date: '2017-7-24', day: 24},
				{date: '2017-7-25', day: 25},
				{date: '2017-7-26', day: 26},
				{date: '2017-7-27', day: 27},
				{date: '2017-7-28', day: 28},
				{date: '2017-7-29', day: 29},
				{date: '2017-7-30', day: 30},
				{date: '2017-7-31', day: 31},
				null, null, null, null, null
			],
			appointments: {
				'2017-7-4': {content: '약속1'},
				'2017-6-5': {content: '약속2'}
			},
			dialog: '등록하신 날짜에 약속이 이미 등록되어 있습니다.'
		};

		expect(state).toEqual(expectState);
	});
});
