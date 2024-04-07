import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
  .option("--mode <mode>", "backend execution mode ", "development")
  .parse();

const mode = program.opts().mode;
let path;

if (mode === "production") {
  path = "./.env.production";
} else {
  path = "./.env.development";
}
console.log("Running in mode: ", mode);
dotenv.config({ path });
export default {
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  email_tipe: process.env.EMAIL_TIPE,
  email_port: process.env.EMAIL_PORT,
  env: process.env.MODE_ENV,
  port: process.env.PORT || 3000,
  mongodbUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/ecommerce",
};
