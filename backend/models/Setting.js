const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    cafeName: { type: String, default: "Dripster" },
    location: { type: String, default: "Mian Channu, Punjab, Pakistan" },
    phone: { type: String, default: "+92 300 0000000" },
    email: { type: String, default: "hello@dripster.pk" },
    openingHours: { type: String, default: "7:00 AM – 9:00 PM (Daily)" },
    established: { type: String, default: "2026" },
    tagline:  { type: String, default: "Where Every Sip Hits The Spot" },
    website:  { type: String, default: "https://dripster.pk" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
