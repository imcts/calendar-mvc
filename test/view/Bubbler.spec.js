import expect, { createSpy } from 'expect';
import $ from 'jquery';
import Bubbler from '../../src/view/Bubbler';

describe('Bubbler', () => {
	let bubbler = null;
	let $app = $('#app', document);
	let testHtml = (
		'<div class="_dates">' +
			'<div class="_date">' +
				'<div class="_appointment"></div>' +
			'</div>' +
		'</div>'
	);

	beforeEach(() => {
		$app.html(testHtml);
		bubbler = new Bubbler('app');
	});

	afterEach(() => {
		bubbler.destroy();
	});

	it('on(): 지정한 키의 이벤트 리스너를 등록할 수 있어야 합니다.', () => {
		// Given
		const listener = createSpy();

		bubbler.on({ 'click ._date': listener });

		// When
		$app.find('._date').click();

		// Then
		expect(listener).toHaveBeenCalled();
	});

	it('off(): 등록했던 이벤트 리스너를 삭제할 수 있어야 합니다.', () => {
		// Given
		const listener = createSpy();

		bubbler.on({ 'click ._date': listener });
		bubbler.off({ 'click ._date': listener });

		// When
		$app.find('._date').click();

		// Then
		expect(listener).toNotHaveBeenCalled()
	});

	it('부모노드와 자식노드 모두 이벤트가 있을때 클릭된 노드의 이벤트 리스너만 실행되어야 합니다.', () => {
		// Given
		const parentEventListener = createSpy();
		const childEventListener = createSpy();

		bubbler.on({
			'click ._date': parentEventListener,
			'click ._appointment': childEventListener
		});

		// When
		$app.find('._appointment').click();

		// Then
		expect(parentEventListener).toNotHaveBeenCalled();
	});
});
