import { Router } from "express";
import EmailService from "../../services/email.service.js";
import Email from "../../controllers/email.controller.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import authMiddleware from "../../config/auth.validation.jwt.js";

const router = Router();

const generateUserSecret = (userId) => {
  const randomPart = crypto.randomBytes(16).toString("hex");
  return `${userId}_${randomPart}`;
};

router.get(
  "/password-recovery",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res) => {
    try {
      const user = req.user;

      const secret = generateUserSecret(user._id);

      req.session.secret = secret;

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "1h",
      });
      req.session.token = token;
      console.log("token:", token);
      const recoveryLink = `http://localhost:8080/api/recoverView?token=${token}`;

      const emailService = EmailService.getInstance();
      const result = await emailService.sendEmail(
        user.email,
        "Recover password",
        `<div>
          <h1>Recover password</h1>
          <p>Click this link to recover your password:</p>
          <a href="${recoveryLink}" role="button">${recoveryLink}</a>
        </div>`
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error while recovering your password:", error);
      res.status(500).json({ error: "Error while recovering your password" });
    }
  }
);

router.get(
  "/recoverView",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res) => {
    const { token } = req.query;
    console.log("token:", token);
    res.status(200).render("recoverView", { token });
  }
);

router.post(
  "/reset-password",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res) => {
    try {
      const user = req.user;
      const { passwordNew } = req.body;
      const { token } = req.query;
      const secret = req.session.secret;

      console.log("Reset-password token:", token);
      if (!token || !secret) {
        return res.status(400).json({ error: "Invalid session" });
      }

      // Verificar el token
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.error("Error while verifying token:", err);

          return res
            .status(400)
            .json({ error: "The token is invalid or has already expired" });
        }
        console.log("Decoded: ", decoded);
        // Verificar que el usuario del token coincida
        if (decoded.userId !== user.id) {
          console.log("Decoded user: ", decoded);
          console.error(
            "The user of the token doesn't match with the current user or the token has already expired"
          );
          return res.status(400).json({ error: "Invalid token for this user" });
        }

        // Validar y actualizar la contraseña
        Email.passwordRecover(passwordNew, user);

        res.status(200).json("Completed");
      });
    } catch (error) {
      console.error("Error while restablishing password:", error);
      res.status(400).json({ error: "Error while restablishing password" });
    }
  }
);

export default router;
