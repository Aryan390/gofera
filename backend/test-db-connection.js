const mongoose = require("mongoose");

async function testConnection() {
	try {
		console.log("🔍 Testing MongoDB connection...");

		// Use cloud MongoDB for tests
		const uri =
			"mongodb+srv://gofera:gofera@gofera.csopsqi.mongodb.net/gofera_test?retryWrites=true&w=majority&appName=gofera";
		console.log(`📡 Connecting to: ${uri}`);

		await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 10000,
			socketTimeoutMS: 45000,
		});

		console.log("✅ MongoDB connection successful!");
		console.log(`📊 Database: ${mongoose.connection.name}`);
		console.log(`🔌 Host: ${mongoose.connection.host}`);
		console.log(`🚪 Port: ${mongoose.connection.port}`);

		await mongoose.connection.close();
		console.log("🔒 Connection closed successfully");
	} catch (error) {
		console.error("❌ MongoDB connection failed:", error.message);
		console.log("");
		console.log("💡 Troubleshooting tips:");
		console.log("   1. Check your internet connection");
		console.log("   2. Verify the MongoDB Atlas credentials");
		console.log("   3. Check if the cluster is accessible");
		console.log("   4. Verify network access settings in MongoDB Atlas");
		process.exit(1);
	}
}

testConnection();
