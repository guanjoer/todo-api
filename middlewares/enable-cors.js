function enableCors(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); // 리소스에 접근을 허용 하고자 페이지
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS') // 허용 하고자 하는 HTTP Requests
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // 허용하고자 하는 Headers

	next()
}



module.exports = enableCors;