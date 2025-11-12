require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ Database connection error:", err));

// Routes
app.get("/", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });
  await newChat.save();
  console.log("💾 Chat saved");
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let newChat = await Chat.findById(id);
  res.render("edit.ejs", { newChat });
});

app.post("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  await Chat.findByIdAndUpdate(id, { msg: newMsg });
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
