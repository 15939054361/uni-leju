import request from "@/utils/request.js"

function productList(data) {
	return request({
		url: '/api/leju/front/product/list',
		method: 'GET',
		data
	})
}

function productDetail(data) {
	return request({
		url: '/api/leju/front/product/detail',
		method: 'GET',
		data
	})
}
export { productList, productDetail }
