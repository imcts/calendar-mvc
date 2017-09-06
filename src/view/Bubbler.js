import _ from 'lodash';

export default class Bubbler {
	constructor (element) {
		if (typeof element === 'string') {
			this._element = document.getElementById(element);
		} else {
			this._element = element;
		}
		this._listeners = {};

		this._eventBubbler = this._eventBubbler.bind(this);
	}

	_eventBubbler (e) {
		let element = e.target;
		let tagName = element.tagName.toLowerCase();

		while (tagName !== 'body' && tagName !== 'html') {
			if (/(_\w*)/i.test(element.className)) {
				this._trigger(`.${RegExp.$1}`, e);
				break;
			}

			element = element.parentNode;
			tagName = element.tagName.toLowerCase();
		}
	}

	_trigger (className, e) {
		const eventType = e.type || 'click';

		if (!(this._hasEventTypeInListeners(eventType) && this._hasClassNameInEventType(eventType, className))) {
			return;
		}

		this._listeners[eventType][className].forEach(listener => listener(e));
	}

	/**
	 * 버블러에 이벤트를 등록 합니다. 인자로 이벤트키(이벤트명과 클래스명으로 구성된)와 이벤트 핸들러로 구성된 이벤트
	 * 객체를 받아서 이벤트 청취를 시작합니다
	 * eg:
	 *   // _date 클래스명을 지닌 엘리먼트에서 발생하는 클릭 이벤트를 청취합니다.
	 *   bubbler.on({'click _date': hander})
	 *
	 * @param {Object} events
	 * @param {Function} events['eventName className'] - 이벤트명과 클래스명으로 구성된 키와 핸들러
	 */
	on (events) {
		for (const eventKey in events) {
			const matches = this._delegateEventSplitter(eventKey);

			if (!matches) {
				continue;
			}

			const eventType = matches[1];
			const className = matches[2];
			const listener = events[eventKey];

			this._appendEventInListeners(eventType, className, listener);
		}
	}

	_delegateEventSplitter (eventKey) {
		return /^(\S+)\s(\S+)$/.exec(eventKey);
	}

	_appendEventInListeners (eventType, className, listener) {
		if (!this._hasEventTypeInListeners(eventType)) {
			this._addEventTypeOnListeners(eventType);
			this._addEventListener(eventType);
		}

		if (!this._hasClassNameInEventType(eventType, className)) {
			this._addClassNameInEventType(eventType, className);
		}

		this._listeners[eventType][className].push(listener);
	}

	_hasEventTypeInListeners (eventType) {
		return Boolean(this._listeners[eventType]);
	}

	_addEventTypeOnListeners (eventType) {
		this._listeners[eventType] = {};
	}

	_addEventListener (eventType) {
		this._element.addEventListener(eventType, this._eventBubbler);
	}

	_hasClassNameInEventType (eventType, className) {
		return Boolean(this._listeners[eventType][className]);
	}

	_addClassNameInEventType (eventType, className) {
		this._listeners[eventType][className] = [];
	}

	/**
	 * 버블러에 등록된 이벤트를 제거 합니다. 인자로 등록시 사용했던 이벤트키(이벤트명과 클래스명으로 구성된)와 이벤트 핸들러로
	 * 구성된 이벤트 객체를 받아서 이벤트 삭제를 시작합니다
	 * eg:
	 *   // _date 클래스명을 지닌 엘리먼트에서 발생하는 클릭 이벤트를 제거합니다.
	 *   bubbler.off({'click _date': hander})
	 *
	 * @param {Object} events
	 * @param {Function} events['eventName className'] - 이벤트명과 클래스명으로 구성된 키와 핸들러
	 */
	off (events) {
		for (const eventKey in events) {
			const matches = this._delegateEventSplitter(eventKey);

			if (!matches) {
				continue;
			}

			const eventType = matches[1];
			const className = matches[2];
			const listener = events[eventKey];

			this._removeEventInListeners(eventType, className, listener);

			if (!this._hasListenerInClassName(eventType, className)) {
				this._removeClassNameInEventType(eventType, className);
			}

			if (!this._hasListenerByEvent(eventType)) {
				this._removeEventListener(eventType);
			}
		}
	}

	_removeEventInListeners (eventType, className, removeListener) {
		if (!this._hasEventTypeInListeners(eventType)) {
			return;
		}

		if (!this._hasClassNameInEventType(eventType, className)) {
			return;
		}

		this._listeners[eventType][className].forEach((listener, i, listeners) => {
			if (listener === removeListener) {
				listeners.splice(i, 1);
			}
		});
	}

	_hasListenerInClassName (eventType, className) {
		return this._listeners[eventType][className].length !== 0;
	}

	_removeClassNameInEventType (eventType, className) {
		delete this._listeners[eventType][className];
	}

	_hasListenerByEvent (eventType) {
		const listeners = this._listeners[eventType];

		if (!listeners) {
			return;
		}

		return listeners && _.keys(listeners).length !== 0;
	}

	_removeEventListener (eventType) {
		this._element.removeEventListener(eventType, this._eventBubbler);
	}

	/**
	 * 등록된 모든 이벤트를 제거 합니다.
	 */
	destroy () {
		for (const eventType in this._listeners) {
			this._element.removeEventListener(eventType, this._eventBubbler);
		}
		this._listeners = {};
	}
}
