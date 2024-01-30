import qrcode from "qrcode-terminal";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import { testImage } from "./utils/base64photos";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "!iniciar-bot")
    client.sendMessage(
      message.from,
      "Olá! Seja bem-vindo ao chat bot. \nDigite !ajuda para mais detalhes"
    );
});

client.on("message", (message) => {
  if (message.body === "!ajuda")
    message.reply("!enviar-foto\n!enviar-foto-por-url");
});

client.on("message", (message) => {
  if (message.body === "!enviar-foto") {
    const media = new MessageMedia("image/png", testImage);
    client.sendMessage(message.from, media);
  }
});

client.on("message", async (message) => {
  if (message.body === "!enviar-foto-por-url") {
    const media = await MessageMedia.fromUrl(
      "https://via.placeholder.com/350x150.png"
    );
    client.sendMessage(message.from, media);
  }
});

client.initialize();
