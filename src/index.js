// src/index.js
require('dotenv').config();
const { SapphireClient } = require('@sapphire/framework');
const { IntentsBitField } = require('discord.js');

const client = new SapphireClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages
  ],
  defaultPrefix: '!' // البريفكس للأوامر النصية
});

client.once('ready', () => {
  console.log(`${client.user.tag} — جاهز!`);
});

client.login(process.env.TOKEN);
