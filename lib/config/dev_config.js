module.exports = {
	rootPath: process.env.ROOT_PATH || "http://localhost:3000/admin",
	host: "127.0.0.1",
	port: 3000,
	maxConnections: 2000, // 最大链接数
	timeout: 600000, // 闲置超时时间
	secret: "self secret",
	uploadDir: 'src/uploads',
	storeDir: 'src/store',
	debug: true,
	session: {
		ttl: 3600 // ss
	},
	cors: {
		allowoOrigins: ["http://127.0.0.1:8000", "http://0.0.0.0:8000", "http://127.0.0.1:8082"],
		allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Set-Cookie", "Pragma", "Accept", "Cache-Control", "Authorization", "x-site-id"],
		allowMethods: ["PUT", "POST", "GET", "DELETE", "PATCH", "OPTIONS"]
	},
	mongo: {
		port: 27017,
		host: "127.0.0.1"
	},
	redis: {
		host: "127.0.0.1",
		port: 6366,
		pass: "password"
	},
	smpt: {
		connStr: "smpt connection string",
		from: "username"
	}
};