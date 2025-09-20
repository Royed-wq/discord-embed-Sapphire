import { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, WebhookClient } from "discord.js";
import "dotenv/config";

// إنشاء العميل
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// عند تشغيل البوت
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// أمر بسيط /sendbuttons
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "sendbuttons") {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("رسالة مع أزرار")
      .setDescription("هذه رسالة تجريبية مع أزرار 🪄");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("زر 1")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("btn1"),
      new ButtonBuilder()
        .setLabel("زر 2")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("btn2")
    );

    // إرسال عبر Webhook
    const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL });
    await webhookClient.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.reply({ content: "✅ تم إرسال الرسالة عبر الويب هوك!", ephemeral: true });
  }
});

// عند الضغط على زر
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "btn1") {
    await interaction.reply({ content: "⚡ ضغطت زر 1", ephemeral: true });
  } else if (interaction.customId === "btn2") {
    await interaction.reply({ content: "🎉 ضغطت زر 2", ephemeral: true });
  }
});

// تسجيل الأوامر (مرة واحدة فقط)
import { REST, Routes, SlashCommandBuilder } from "discord.js";

async function registerCommands() {
  const commands = [
    new SlashCommandBuilder()
      .setName("sendbuttons")
      .setDescription("إرسال رسالة عبر الويب هوك مع أزرار")
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("⏳ تسجيل الأوامر...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ تم تسجيل الأوامر بنجاح!");
  } catch (error) {
    console.error(error);
  }
}

registerCommands();

// تسجيل الدخول
client.login(process.env.TOKEN);
