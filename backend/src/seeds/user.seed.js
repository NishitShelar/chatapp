import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    {
      email: "aisha.kapoor@example.com",
      fullName: "Aisha Kapoor",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      email: "priya.sharma@example.com",
      fullName: "Priya Sharma",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      email: "tanvi.iyer@example.com",
      fullName: "Tanvi Iyer",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      email: "ananya.verma@example.com",
      fullName: "Ananya Verma",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      email: "meera.nair@example.com",
      fullName: "Meera Nair",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/13.jpg",
    },
    {
      email: "sanya.chopra@example.com",
      fullName: "Sanya Chopra",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      email: "rhea.menon@example.com",
      fullName: "Rhea Menon",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      email: "isha.patel@example.com",
      fullName: "Isha Patel",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/16.jpg",
    },
  
    // Male Users
    {
      email: "arjun.sharma@example.com",
      fullName: "Arjun Sharma",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      email: "rohit.verma@example.com",
      fullName: "Rohit Verma",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      email: "karan.malhotra@example.com",
      fullName: "Karan Malhotra",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      email: "vivek.iyer@example.com",
      fullName: "Vivek Iyer",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      email: "rahul.nair@example.com",
      fullName: "Rahul Nair",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      email: "abhishek.chopra@example.com",
      fullName: "Abhishek Chopra",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
      email: "siddharth.menon@example.com",
      fullName: "Siddharth Menon",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      email: "nishant.patel@example.com",
      fullName: "Nishant Patel",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
    },
  ];
  
  

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();