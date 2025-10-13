const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(async () => {
    console.log("Connected to database");

    const allchats = [
      {
        from: "Rohan",
        to: "Priya",
        msg: "Hey, are you coming to college tomorrow?",
        created_at: new Date("2025-10-10T09:15:00Z")
      },
      {
        from: "Priya",
        to: "Rohan",
        msg: "Yes! I’ll be there by 9 AM. Don’t forget your project file.",
        created_at: new Date("2025-10-10T09:17:00Z")
      },
      {
        from: "Aman",
        to: "Vikas",
        msg: "Did you complete the backend API for login?",
        created_at: new Date("2025-10-11T12:45:00Z")
      },
      {
        from: "Vikas",
        to: "Aman",
        msg: "Almost done. Just need to test a few routes.",
        created_at: new Date("2025-10-11T12:48:00Z")
      },
      {
        from: "Sneha",
        to: "Rahul",
        msg: "Movie tonight? There’s a new Marvel release.",
        created_at: new Date("2025-10-12T18:10:00Z")
      },
      {
        from: "Rahul",
        to: "Sneha",
        msg: "Sounds great! Let’s book the tickets for 8 PM.",
        created_at: new Date("2025-10-12T18:12:00Z")
      },
      {
        from: "Ananya",
        to: "Karan",
        msg: "Happy Birthday! 🎉 Hope you have an amazing day.",
        created_at: new Date("2025-10-12T07:30:00Z")
      },
      {
        from: "Karan",
        to: "Ananya",
        msg: "Thank you so much! That means a lot 😊",
        created_at: new Date("2025-10-12T07:35:00Z")
      }
    ];

    await Chat.insertMany(allchats);
    console.log("✅ Realistic chat data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
