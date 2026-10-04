const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenskart_portal';

  try {
    console.log(`[Database] Attempting connection to MongoDB at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
    
    // Set a quick timeout so server starts immediately even if local mongod is not running
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500,
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB connection failed (${error.message}).`);
    console.info(`[Database] Gracefully activating built-in persistent disk JSON datastore (server/data/submissions.json).`);
    return false;
  }
};

const getDBStatus = () => ({
  type: isConnected ? 'MongoDB (Mongoose)' : 'Embedded JSON Persistent Datastore',
  isConnected,
  uri: isConnected ? (process.env.MONGODB_URI ? 'Connected to configured URI' : 'Local MongoDB') : 'Local File Persistence',
});

module.exports = {
  connectDB,
  getDBStatus,
  isMongooseConnected: () => isConnected,
};
