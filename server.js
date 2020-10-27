const http = require("http");
const express = require("express");
const app = express();
var adminprefix = "!";

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://broadcast-gt.glitch.me`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { TOKEN, YT_API_KEY, prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const developers = ["612050940035334166", "612050940035334166"];
client.on("message", message => {
  var argresult = message.content
    .split(` `)
    .slice(1)
    .join("BROADCATS-GT");
  if (!developers.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + "setg")) {
    client.user.setGame(argresult);
    message.channel.send(`**✅   ${argresult}**`);
  } else if (message.content === adminprefix + "leave") {
    message.guild.leave();
  } else if (message.content.startsWith(adminprefix + "setw")) {
    client.user.setActivity(argresult, { type: "WATCHING" });
    message.channel.send(`**✅   ${argresult}**`);
  } else if (message.content.startsWith(adminprefix + "setl")) {
    client.user.setActivity(argresult, { type: "LISTENING" });
    message.channel.send(`**✅   ${argresult}**`);
  } else if (message.content.startsWith(adminprefix + "sets")) {
    client.user.setGame(argresult, "https://www.twitch.tv/dream");
    message.channel.send(`**✅**`);
  }
  if (message.content.startsWith(adminprefix + "setname")) {
    client.user.setUsername(argresult).then;
    message.channel.send(`Changing The Name To ..**${argresult}** `);
  } else if (message.content.startsWith(adminprefix + "setava")) {
    client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "banned")) {
    if (!message.guild) return;
    message.guild.fetchBans().then(bans => {
      let b = bans.size;
      let bb = bans.map(a => `${a}`).join(" - ");
      message.channel.send(`**\`${b}\` | ${bb}**`);
    });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "help")) {
    let help = new Discord.RichEmbed().setColor("0x5016f3")
      .setDescription(`** ❤❤ صاحب البوت : 04 ❤❤
             🔴 برودكاست خاص 🔴
         =============================
         ✅&bc     ----- لإرسال برودكاست
         ✅&bco    ----- لإرسال برودكاست
         ✅&clear  ----- لمسح الشات
         =============================
            📛 **SUPPORT_Bot 04** 📛
             📛 https://discord.gg/37HUDbx 📛
              **`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", function(message) {
  let prefix = "!";
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (message.content.startsWith(prefix + "say")) {
    if (!args) return;
    message.channel.send(`** ${args}**`);
  }
});

client.on("message", async message => {
  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (!message.channel.guild) return;
  var args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (command == "bc") {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
    }
    if (!args) {
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    }
    message.channel
      .send(
        `**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`
      )
      .then(m => {
        m.react("✅").then(() => m.react("❌"));

        let yesFilter = (reaction, user) =>
          reaction.emoji.name == "✅" && user.id == message.author.id;
        let noFiler = (reaction, user) =>
          reaction.emoji.name == "❌" && user.id == message.author.id;

        let yes = m.createReactionCollector(yesFilter);
        let no = m.createReactionCollector(noFiler);

        yes.on("collect", v => {
          m.delete();
          message.channel
            .send(
              `:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`
            )
            .then(msg => msg.delete(5000));
          message.guild.members.forEach(member => {
            let bc = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setThumbnail(message.author.avatarURL)
              .setTitle("Broadcast")
              .addField("Server", message.guild.name)
              .addField("Sender", message.author.username)
              .addField("Message", args);

            member.sendEmbed(bc);
          });
        });
        no.on("collect", v => {
          m.delete();
          message.channel
            .send("**Broadcast Canceled.**")
            .then(msg => msg.delete(3000));
        });
      });
  }
  if (command == "bco") {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
    }
    if (!args) {
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    }
    message.channel
      .send(
        `**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`
      )
      .then(m => {
        m.react("✅").then(() => m.react("❌"));

        let yesFilter = (reaction, user) =>
          reaction.emoji.name == "✅" && user.id == message.author.id;
        let noFiler = (reaction, user) =>
          reaction.emoji.name == "❌" && user.id == message.author.id;

        let yes = m.createReactionCollector(yesFilter);
        let no = m.createReactionCollector(noFiler);

        yes.on("collect", v => {
          m.delete();
          message.channel
            .send(
              `:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${
                message.guild.members.filter(
                  r => r.presence.status !== "offline"
                ).size
              } Members`
            )
            .then(msg => msg.delete(5000));
          message.guild.members
            .filter(r => r.presence.status !== "offline")
            .forEach(member => {
              let bco = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.author.avatarURL)
                .setTitle("Broadcast")
                .addField("Server", message.guild.name)
                .addField("Sender", message.author.username)
                .addField("Message", args);

              member.sendEmbed(bco);
            });
        });
        no.on("collect", v => {
          m.delete();
          message.channel
            .send("**Broadcast Canceled.**")
            .then(msg => msg.delete(3000));
        });
      });
  }
});

client.on("message", message => {
  //clear
  var args = message.content.substring(prefix.length).split(" ");
  if (message.content.startsWith(prefix + "clear")) {
    if (!message.channel.guild)
      return message.reply("**? اسف لكن هذا الامر للسيرفرات فقط **");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**?  لا يوجد لديك صلاحية لمسح الشات**");
    var msg;
    msg = parseInt();

    message.channel
      .fetchMessages({ limit: msg })
      .then(messages => message.channel.bulkDelete(messages))
      .catch(console.error);
    message.channel
      .sendMessage("", {
        embed: {
          title: "``تــم مسح الشات ``",
          color: 0x5016f3,
          footer: {}
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

console.log("==================================");
console.log("1");
console.log("2");
console.log("3");
console.log("=========> Bot Online <=========");
console.log("========> GT <========");
console.log("=======> https://discord.gg/37HUDbx <=======");
console.log("3");
console.log("2");
console.log("1");
console.log("====================================");
console.log("Bot Online 24/7");
///
//الاكواد
