module.exports = async function(ctx, next) {
	ctx.rbody = ctx.request.body; // rbody 代表request body
	Object.defineProperty(ctx, "sbody", { // sbody 代表 response body
		set: (value) => {
			if (value === undefined) {
				ctx.body = undefined;
			} else {
				ctx.body = {
					msg: "ok",
					status: 0,
					data: value
				};
			}
		},
		get: () => {
			return ctx.body instanceof Buffer ? null : ctx.body;
		}
	});
	await next();
};
