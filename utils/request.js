import {
	baseUrl
} from "@/utils/config.js"

function requests(set) {
	return new Promise((reslove, reject) => {
		let params = {
			dataType: 'json',
			timeout: 60000,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				reslove(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		}
		params = Object.assign(params, set)
		params.url = baseUrl + set.url;
		uni.request(params)
	});
}

export default requests
