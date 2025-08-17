// Test setup file
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key";
process.env.JWT_EXPIRES_IN = "1d";
process.env.COOKIE_EXPIRES_IN = "1";
// Use the same cloud MongoDB but with a test database name
process.env.MONGODB_URI_TEST =
	"mongodb+srv://gofera:gofera@gofera.csopsqi.mongodb.net/gofera_test?retryWrites=true&w=majority&appName=gofera";

// Increase timeout for tests
jest.setTimeout(60000);

// Suppress console logs during tests
// global.console = {
// 	...console,
// 	log: jest.fn(),
// 	debug: jest.fn(),
// 	info: jest.fn(),
// 	warn: jest.fn(),
// 	error: jest.fn(),
// };

// Global test setup
beforeAll(async () => {
	// Wait a bit for any async operations to complete
	await new Promise((resolve) => setTimeout(resolve, 1000));
});

// Global test teardown
afterAll(async () => {
	// Wait a bit for cleanup
	await new Promise((resolve) => setTimeout(resolve, 1000));
});
