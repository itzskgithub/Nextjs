📘 Note: Mongoose .on() vs Without .on()
🧩 1. Without .on()
🔥 Code
await mongoose.connect(process.env.mongo_url!);
✅ What it does
Connects to MongoDB
Returns success/failure once
❌ Limitations
Cannot detect disconnection later
Cannot track runtime errors
No visibility after initial connection
🧠 Behavior
try {
    await mongoose.connect(mongoUrl);
    console.log("DB connected");
} catch (err) {
    console.log("Connection failed");
}

👉 Only handles initial connection

🧩 2. With .on()
🔥 Code
await mongoose.connect(process.env.mongo_url!);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB connected');
});

connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
✅ What it does
Connects to DB
Tracks events continuously
🚀 Extra tracking
connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});
🧠 Behavior
Initial connection ✅
Runtime errors ❌ → now tracked ✅
Disconnection ❌ → now tracked ✅
⚖️ Comparison
Feature	Without .on()	With .on()
Initial connection	✅	✅
Catch initial error	✅	✅
Detect runtime errors	❌	✅
Detect disconnection	❌	✅
Detect reconnection	❌	✅
Production ready	❌	✅
🧠 Simple Analogy
Without .on() → Start a call 📞 and hang up
With .on() → Stay on call and monitor everything 👂
✅ What is Preferred?

👉 Best Practice (Recommended)

const mongoUrl = process.env.mongo_url;

if (!mongoUrl) {
    throw new Error("MongoDB URL not defined");
}

await mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB connected');
});

connection.on('error', (err) => {
    console.error(err);
});
💡 Final Takeaway
.connect() → required
.on() → optional but strongly recommended

👉 For:

Learning → use .on()
Production → MUST use .on()