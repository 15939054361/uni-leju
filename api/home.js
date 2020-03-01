import request from "@/utils/request.js"

function bannerList(data) {
	return request({
		url: '/api/leju/admin/home/banners',
		method: 'GET',
		data
	})
}

function brandList(data) {
	return request({
		url: '/api/leju/admin/brand/list',
		method: 'GET',
		data
	})
}
export {
	bannerList,brandList
}
