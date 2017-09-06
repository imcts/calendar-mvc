import expect, { createSpy } from 'expect';
import Publisher from '../../src/publisher/Publisher';

describe('Publisher', () => {
	it('subscribe/trigger(): 이벤트를 청취할 수 있어야 합니다.', () => {
		// Given
		const publisher = new Publisher();
		const callback = createSpy();

		publisher.subscribe(callback);

		// When
		publisher.trigger();

		// Then
		expect(callback).toHaveBeenCalled();
	});

	it('unsubscribe/trigger(): 청취자를 삭제 후에는 이벤트를 청취할 수 없어야 합니다.', () => {
		// Given
		const publisher = new Publisher();
		const callback = createSpy();

		publisher.subscribe(callback);
		publisher.unsubscribe(callback);

		// When
		publisher.trigger();

		// Then
		expect(callback).toNotHaveBeenCalled();
	});
});
