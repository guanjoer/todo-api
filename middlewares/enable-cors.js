function enableCors(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); // 리소스에 접근을 허용 하고자 페이지
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS') // 허용 하고자 하는 HTTP Requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 허용하고자 하는 Headers
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // OPTIONS 요청에 대해 바로 200 응답을 반환
    } else {
        next();
    }
}



module.exports = enableCors;