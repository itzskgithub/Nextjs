📘 Note 2: ! (Non-null Assertion) in TypeScript
🔥 What is !?
process.env.mongo_url!

👉 Means:

“I’m sure this is NOT null or undefined”

🤔 Why we need it?

TypeScript treats:

process.env.mongo_url

as:

string | undefined

But this:

mongoose.connect()

expects:

string

👉 So TypeScript throws error

✅ What ! does
process.env.mongo_url!

👉 Forces type:

string
⚠️ Problem with !

If value is actually undefined:
👉 App crashes at runtime 💥

✅ Better & safer approach
const mongoUrl = process.env.mongo_url;

if (!mongoUrl) {
    throw new Error("MongoDB URL is not defined");
}

mongoose.connect(mongoUrl);
🧠 Simple understanding
Concept	Meaning
!	Trust me, it's there
if (!value)	Let’s verify first
💡 Best Practice

👉 Avoid overusing !
👉 Always validate environment variables