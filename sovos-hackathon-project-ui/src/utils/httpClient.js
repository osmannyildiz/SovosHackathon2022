export class HttpClient {
	static async _sendRequest(url, options = {}) {
		const resp = await fetch(url, options);
		const respJson = await resp.json();
		return respJson;
	}

	static async get(url) {
		return await this._sendRequest(url);
	}

	static async post(url, body) {
		return await this._sendRequest(url, {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	static async put(url, body) {
		return await this._sendRequest(url, {
			method: "PUT",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	static async delete(url) {
		return await this._sendRequest(url, {
			method: "DELETE",
		});
	}
}
