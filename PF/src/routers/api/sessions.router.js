import { Router } from "express";
import passport from "passport";
const router = Router();

router.post(
  "/sessions/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  async (req, res) => {
  res.redirect("/api/profile");
  }
);

router.post(
  "/sessions/register",
  passport.authenticate("register", { failureRedirect: "/register" }),
  async (req, res) => {
    res.redirect("/login");
  }
);



router.get(
  "/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/sessions/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/profile");
  }
);


export default router;
