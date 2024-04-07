import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import inicio from "./routers/api/inicio.router.js";
import productRouterApi from "./routers/api/products.router.js";
import cartRouterApi from "./routers/api/carts.router.js";
import cookieParser from "cookie-parser";
import userLogin from "./routers/api/sessions.router.js";
import email from "./routers/api/email.router.js";
import users from "./routers/api/users.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { URI } from "./db/mongodb.js";
import passport from "passport";
import { init as initPassport } from "./config/passportConfig.js";
import auth from "./routers/auth.router.js";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";
import { addLogger } from "./config/logger.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(express.json());

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      description: "Documentation on the Ecommerce API.",
    },
  },
  apis: [path.join(__dirname, "docs", "**", "*.yaml")],
};

const specs = swaggerJSDoc(swaggerOpts);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const SECRET = ",9O1z?Vq2yV0";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 60 * 30,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(addLogger);
app.use(cookieParser());
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userLogin);
app.use("/", auth);
app.use("/api", productRouterApi, cartRouterApi, inicio, email, users);
app.use(errorHandlerMiddleware);

export default app;
