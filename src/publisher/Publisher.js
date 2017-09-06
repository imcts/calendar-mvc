export default class Publisher {
	constructor () {
		this._observers = [];
	}

	subscribe (callback) {
		if (typeof callback === 'function') {
			this._observers.push(callback);
		}

		return this;
	}

	unsubscribe (callback) {
		const subscribers = this._observers;

		for (let i = subscribers.length; i--;) {
			if (subscribers[i] === callback) {
				subscribers.splice(i, 1);
				break;
			}
		}

		return this;
	}

	trigger (params) {
		const subscribers = this._observers;

		for (let i = subscribers.length; i--;) {
			const callback = subscribers[i];
			typeof callback === 'function' && callback(params);
		}

		return this;
	}
}
