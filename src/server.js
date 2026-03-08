require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
// defining port
const PORT = process.env.PORT || 3000;
//starting server after connecting to database
const startServer = async () => {
  try {
    await connectDB();
    // starting server
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};
startServer();
