module.exports = {
	host: "127.0.0.1",
	port: 8888,
	maxConnections: 2000, // 最大链接数
	timeout: 600000, // 闲置超时时间
	name: "deployment",
	secret: process.env.secret || "mypass123",
	uploadDir: 'src/uploads',
	downloadDir: 'src/downloads',
	deployDir: os.homedir() + "/app",
	storeDir: 'src/store',
	session: {
		ttl: 3600 // ss
	},
	mysql: {
		host: "127.0.0.1",
		port: "8272",
		username: "root",
		password: "voM2KahVApx6",
		database: "test",
		dialect: "mysql",
		timezone: "+08:00",
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
