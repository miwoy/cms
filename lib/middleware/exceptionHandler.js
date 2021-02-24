/**
 * @middleware handle exception
 * 异常处理中间件，主要处理400客户端错误和500服务器错误
 */
module.exports = async function (ctx, next) {
	try {
		await next();
	} catch (e) {
		// 服务器引起的异常或未知异常
		if (e.name == "SequelizeUniqueConstraintError") {
			ctx.status = 422;
			ctx.body = e.errors.reduce((total, error) => {
				total[error.path.split(".").pop()] = error.message;
				return total;
			}, {})
		} else if (e.name == "SequelizeValidationError") {
			ctx.status = 422;
			ctx.body = e.errors.reduce((total, error) => {
				total[error.path] = error.message;
				return total;
			}, {})
		} else if (e instanceof GeneralityError) {
			if (e instanceof RequiredDataGeneralityError || e instanceof RequiredArgsGeneralityError) {
				ctx.status = 200;
			} else {
				ctx.status = 200;
			}

			ctx.body = {
				status: e.errno,
				msg: e.message
			}

		} else if (e instanceof AbstractError) {
			ctx.status = 200
			ctx.body = {
				status: e.errno,
				msg: e.message
			}

		} else {
			ctx.status = 500;
			ctx.body = {
				status: e.errno || 500,
				errmsg: process.env.NODE_ENV == "production" ? "服务器错误" : e.message
			};
			console.log("Application Error:", e);
		}
	}
};