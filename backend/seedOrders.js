const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

dotenv.config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding orders");

    const admin = await User.findOne({ email: "laibahanif0909@gmail.com" });
    const user = await User.findOne({ email: "user@test.com" }) || admin;

    if (!admin) {
      console.error("Admin user not found, run seedUsers.js first");
      process.exit(1);
    }

    const existingOrdersCount = await Order.countDocuments();
    if (existingOrdersCount > 0) {
      console.log(`ℹ️ Orders already exist (${existingOrdersCount}). Skipping order seeding.`);
      process.exit(0);
    }

    const products = await Product.find().limit(5);

    const ordersToSeed = [
      {
        user: admin._id,
        orderItems: [
          {
            name: "Caramel Latte (Medium)",
            qty: 1,
            price: 550,
            product: products[3]?._id,
            img: products[3]?.img || "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
          },
        ],
        shippingAddress: {
          name: "Laiba Haneef",
          phone: "03017810816",
          address: "House 12, Street 3, Officer Colony",
          city: "Mian Channu",
          postalCode: "58000",
        },
        paymentMethod: "Cash on Delivery",
        totalPrice: 690,
        isPaid: true,
        isDelivered: false,
        status: "Confirmed",
      },
      {
        user: user._id,
        orderItems: [
          {
            name: "Cappuccino (Large)",
            qty: 1,
            price: 580,
            product: products[2]?._id,
            img: products[2]?.img || "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80",
          },
          {
            name: "Butter Croissant",
            qty: 1,
            price: 420,
            product: products[4]?._id,
            img: products[4]?.img || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
          },
        ],
        shippingAddress: {
          name: "maryam",
          phone: "03001234567",
          address: "Main Bazar, Near Clock Tower",
          city: "Mian Channu",
          postalCode: "58000",
        },
        paymentMethod: "Online Payment",
        totalPrice: 1053,
        isPaid: true,
        isDelivered: true,
        status: "Delivered",
      },
    ];

    await Order.insertMany(ordersToSeed);
    console.log("📦 Sample orders seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding orders:", error.message);
    process.exit(1);
  }
};

seedOrders();
