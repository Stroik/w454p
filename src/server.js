import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { json } from "body-parser";
import cors from "cors";

import auth from "./api/auth/auth";
import chats from "./api/chats/chats";
import contacts from "./api/contacts/contacts";
import messages from "./api/messages/messages";
import helper from "./api/helper/helper";
import getQR from "./api/auth/get-qr";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware(),
    json(),
    cors()
  )
  // Authenticantion endpoints
  .get("/api/auth/get-qr", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({hola: 'mundo'}))
  })
  .post("/api/auth/login", auth.login)
  .post("/api/auth/signup", auth.signup)
  .post("/api/auth/logout", auth.logout)
  // Chats endpoints
  .get("/api/chats/get-all", chats.getAll)
  .post("/api/chats/get-by-id", chats.getById)
  // Contacts endpoints
  .get("/api/contacts/get-all", contacts.getAll)
  .post("/api/contacts/get-by-id", contacts.getById)
  .post("/api/contacts/get-profile-picture", contacts.getProfilePicture)
  // Messages endpoints
  .get("/api/messages/send", messages.send)
  .get("/api/messages/send-bulk", messages.sendBulk)
  // Helper
  .get("/api/helper/validate-number", helper.validateNumber)
  // Serve on http://localhost:3000
  .listen(PORT, (err) => {
    if (err) console.log(err);
  });
