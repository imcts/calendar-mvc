import expect, { createSpy } from 'expect';
import Controller from '../../src/controller/Controller';

describe('Controller', () => {
	it('updateDialogByAppointment(): 지정한 날짜에 약속이 있을경우 다이얼로그 설정 함수가 실행되는지 테스트 합니다.', () => {
		// Given
		const setDialog = createSpy();
		const model = {
			setDialog,
			getAppointments: () => ({
				'2017-8-1': {content: '약속1'}
			})
		};
		const controller = new Controller(model);
		const appointmentKey = '2017-8-1';

		// When
		controller.updateDialogByAppointment(appointmentKey);

		// Then
		expect(setDialog).toHaveBeenCalled();
	});

	it('increaseOneYear(): 연도를 증가/감소 시키는 함수가 실행되는지 테스트 합니다.', () => {
		// Given
		const increaseOneYear = createSpy();
		const controller = new Controller({ increaseOneYear });

		// When
		controller.increaseOneYear();

		// Then
		expect(increaseOneYear).toHaveBeenCalled();
	});
});
