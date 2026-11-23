const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding users");

    // Admin user
    let admin = await User.findOne({ email: "laibahanif0909@gmail.com" });
    if (!admin) {
      admin = await User.create({
        name: "laiba hanif",
        email: "laibahanif0909@gmail.com",
        phone: "03017810816",
        password: "password123",
        isAdmin: true,
      });
      console.log("👑 Admin user created with password: password123");
    } else {
      admin.name = "laiba hanif";
      admin.phone = "03017810816";
      admin.password = "password123";
      admin.isAdmin = true;
      await admin.save();
      console.log("👑 Admin user updated (password reset to: password123)");
    }

    // Test user
    let user = await User.findOne({ email: "user@test.com" });
    if (!user) {
      user = await User.create({
        name: "Test User",
        email: "user@test.com",
        password: "password123",
        isAdmin: false,
      });
      console.log("👤 Test user created with password: password123");
    } else {
      user.password = "password123";
      await user.save();
      console.log("👤 Test user updated (password reset to: password123)");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Seeding users error:", error.message);
    process.exit(1);
  }
};

seedUsers();
