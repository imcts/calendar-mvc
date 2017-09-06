import expect from 'expect';

import { classNames } from '../../src/utils/utils';

describe('utils', () => {
	it('classNames(): 클래스명들을 추가 및 삭제할 수 있어야 합니다.', () => {
		// Given
		const element = document.querySelector('body');
		const currentClassName = 'test class name';

		element.className = currentClassName;

		// When
		const classNameData = {
			'test1': true,
			'test2': true,
			'test3': true,
			'class': false,
			'name': false
		};

		classNames(element, classNameData);

		// Then
		const expectClassName = 'test test1 test2 test3';
		expect(element.className).toEqual(expectClassName);
	});
});
