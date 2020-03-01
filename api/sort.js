import request from "@/utils/request.js"

function sortList(data) {
	return request({
		url: '/api/leju/admin/kind/list',
		method: 'GET',
		data
	})
}


export { sortList }
