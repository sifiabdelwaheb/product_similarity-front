import axios from 'axios';
import { BaseURL } from './baseURL';
let authorizationBearer = null;
export const setAuthorizationBearer = (token) => {
	authorizationBearer = token;
};

const instance = (method, baseURL = BaseURL, url, data = null, headers = null) => {
	return new Promise((resolve, reject) => {
		const req = axios.create({
			method,
			baseURL,
			url,
			timeout: 30000,
			headers: headers,
			crossDomain: true
		});
		headers = {};

		headers.Authorization = `Bearer ${JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token}`;
		headers['Content-Type'] = 'application/json';

		axios.get();
		req({
			method,
			baseURL,
			url,
			data,
			headers
		})
			.then((payload) => {
				if (payload) {
					if (payload.status < 400) {
						resolve(payload);
					} else {
						reject(payload);
					}
				} else {
					reject(payload);
				}
			})
			.catch((e) => {
				if (axios.isCancel(e)) {
					console.log('Request canceled', e.message);
				} else {
					// handle error
				}
				reject(e);
			});
	});
};

export default instance;
