import { Router } from "express";
import { faker } from "@faker-js/faker";
import UserService from "../services/user.service.js";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Hi" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Hi" });
});

router.get("/logout", async (req, res) => {
  try {
    const userID = req.user._id.toJSON();
    if (!req.session) {
      return res.status(401).json({ message: "You have to login to access" });
    }

    const user = await UserService.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.last_conection = new Date();
    await user.save();

    req.session.destroy((error) => {
      if (error) {
        console.error("Session destroy error:", error);
        return res.status(500).json({ message: "Error while logging out" });
      }

      res.render("login", { title: "Ingresar" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Error while logging out" });
  }
});

router.get("/faker", (req, res) => {
  res.status(200).json({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: 18,
    email: faker.internet.email(),
    password: 123,
  });
});

export default router;
