const qs = require("qs");

module.exports = async (ctx, next) => {
	ctx.q = qs.parse(ctx.querystring); // 使用 qs 解析的 query
	ctx.q.pageSize = ctx.q.perPage * 1 || ctx.q.pageSize * 1 || 15;
	ctx.q.pageIndex = (ctx.q.page * 1 && --ctx.q.page * 1) || ctx.q.pageIndex * 1 || 0;

	if (ctx.q.pageIndex < 0) throw new InvalidArgsGeneralityError("参数 pageIndex 必须是大于0的整数")
	if (ctx.q.pageSize < 0 || ctx.q.pageSize > 1000) throw new InvalidArgsGeneralityError("参数 pageSize 必须是大于0且小于1000的整数")

	ctx.q.offset = ctx.q.pageSize * (ctx.q.pageIndex - 1);
	ctx.q.limit = ctx.q.pageSize;
	await next();
	if (ctx.body && ctx.body.count !== undefined && ctx.body.rows) {
		let body = ctx.body;
		let query = ctx.q;
		let url = ctx.request.origin + ctx.path;


		body = {
			current_page: query.pageIndex, // 可以使用默认配置 conf.restful.default.pageSize
			per_page: query.pageSize,
			last_page: Math.ceil(body.count / query.pageSize),
			total: body.count,
			data: body.rows
		};

		query.pageIndex = body.current_page < body.last_page ? body.current_page + 1 : (body.last_page || 1);
		body.next_page_url = url + "?" + qs.stringify(query);
		query.pageIndex = body.current_page > 1 ? body.current_page - 1 : 1;
		body.pre_page_url = url + "?" + qs.stringify(query);
		ctx.body = body;
	}

};