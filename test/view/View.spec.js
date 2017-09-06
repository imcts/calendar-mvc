import expect, { createSpy } from 'expect';
import $ from 'jquery';
import View from '../../src/view/View';
import { getMockModel } from '../.utils/state';

describe('View', () => {
	let view = null;
	let $app = null;

	beforeEach(() => {
		$app = $('#app', document);
	});

	afterEach(() => {
		view.destroy();
	});

	it('View(): 날짜 엘리먼트를 생성해야 합니다.', () => {
		// Given
		const element = $app[0];

		// When
		view = new View(element);

		// Then
		expect($app.find('._date').length).toEqual(42);
	});

	it('update(): 지정한 달의 상태값을 전달받아 화면을 업데이트 합니다.', () => {
		// Given
		const state = getMockModel('201708');
		const element = $app[0];
		view = new View(element);

		// When
		view.update(state);

		// Then
		const $viewElemenr = view.getElement();
		const expectedText = $viewElemenr.text().replace(/\s/g, '');

		expect(expectedText).toMatch(/201781약속1(\d+)31/, '년월일과 약속이 출력되어야 합니다.');
		expect($viewElemenr.find('.date').eq(1).text()).toBe(''); // 8월의 직전일인 7월 31일의 text는 비어있어야 합니다.
		expect($viewElemenr.find('.date').eq(33).text()).toBe(''); // 8월의 직후일인 9월 1일의 text는 비어있어야 합니다.
	});

	it('update(): 한달에 5개주만 표시되어야 하는 경우를 테스트합니다.', () => {
		// Given
		const element = $app[0];
		const state = getMockModel('201708');
		view = new View(element);

		// When
		view.update(state);

		// Then
		const $viewElemenr = view.getElement();
		expect($viewElemenr.find('._date').eq(35).hasClass('hide')).toExist('8월 31일의 다음주인 9월 3일은 숨겨져야 합니다.');
	});

	it('날짜를 클릭하는 경우 이벤트 핸들러 호출을 테스트합니다.', () => {
		// Given
		const element = $app[0];
		const state = getMockModel('201708');
		const controller = {
			updateDialogByAppointment: createSpy()
		};
		view = new View(element, controller);

		view.update(state);

		// When
		const $viewElement = view.getElement();
		$viewElement.find('._date').eq(2).click();

		// Then
		expect(controller.updateDialogByAppointment).toHaveBeenCalled();
	});
});
