const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Events
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;

  if (message.content === "!help") {
    try {
      await message.delete();
    } catch (err) {
      console.log("⚠️ ما قدرت أحذف رسالة المستخدم:", err.message);
    }

    const embed = new EmbedBuilder()
      .setTitle("**୨ৎ المساعدة التلقائية ᯓᡣ𐭩**")
      .setDescription(`**اهلاً بك في نظام المساعدة التلقائية،** 

يمكنك اختيار أحد الخيارات التالية للحصول على إجابة سريعة للأسئلة الشائعة.

> في حال لم تجد سؤالك، يرجى فتح تيكت في https://discord.com/channels/927902122433982534/1368210269129408664/1370614769257545748📩`)
      .setColor("#F9E2FF");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setPlaceholder("اختر سؤالاً")
      .addOptions([
        { label: "كيف اقدم على الإدارة", value: "q1", emoji: "<:number_1:1419287627911266344>" },
        { label: "كيف ابلغ عن مشكلة بالسيرفر", value: "q2", emoji: "<:number_2:1419287745523613716>" },
        { label: "ايش مزايا رتب الداعمين", value: "q3", emoji: "<:number_3:1419287822728171545>" },
        { label: "كيف اغير لوني", value: "q4", emoji: "<:number_4:1419309952832639027>" },
        { label: "كيف أخذ رتبة البنات", value: "q5", emoji: "<:number_5:1419310004669776012>" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "help_menu") return;

  let embed;
  switch (interaction.values[0]) {
    case "q1":
      embed = new EmbedBuilder()
        .setTitle("**كيف اقدم على الأدارة؟**")
        .setDescription("**تقديم الإداره مغلق حالياً. لمعرفة إذا كان تقديم الإدارة مفتوحاً، رجاءً قم بمتابعة القناة** <#1368210262233976832>.")
        .setColor("#F9E2FF");
      break;

    case "q2":
      embed = new EmbedBuilder()
        .setTitle("**كيف أبلغ عن أي مشكلة بالسيرفر؟**")
        .setDescription(`**[اضغط هنا لفتح التذكرة](https://discord.com/channels/927902122433982534/1368210269129408664/1370614769257545748)**  
اكتب مشكلتك أو سؤالك وأرسل المرفقات إذا وجدت (صور & فيديو) وسوف يتم الرد عليك قريبًا.

**صيغة الملفات المدعومة من Discord:**  
- الصور: PNG, JPEG, GIF  
- الفيديو: MP4, MOV, WEBM

إذا لم تكن الصورة أو المقطع الذي لديك من الصيغ المدعومة، يرجى تحويله أولاً باستخدام [CloudConvert](https://cloudconvert.com/) ثم أرسل الملف على الدعم مباشرة.`)
        .setColor("#F9E2FF");
      break;

    case "q3":
      embed = new EmbedBuilder()
        .setTitle("**ايش مزايا رتب الداعمين؟**")
        .setDescription("**تقدر تغير اسمك وتغير اللون الخاص فيك & ينفتح لك رومات صوتيه خاصه للداعمين وتقدر تخفيها عن الأعضاء & ينفتح لك العاب الداعمين & ارسال صور وفيديوهات في الشات العام**")
        .setColor("#F9E2FF");
      break;

    case "q4":
      embed = new EmbedBuilder()
        .setTitle("**كيف اغير لوني؟**")
        .setDescription("لازم تكون عندك احد رتب الداعمين او رتب التفاعل  **[شرح الرتب](https://discord.com/channels/927902122433982534/1368210257037496360)**")
        .setColor("#F9E2FF");
      break;

    case "q5":
      embed = new EmbedBuilder()
        .setTitle("**كيف أخذ رتبة البنات؟**")
        .setDescription("للحصول على هذه الرتبة، يرجى فتح تذكرة وطلب التقديم. سيتم التحقق من قبل أحد المشرفات لدينا للتأكيد.")
        .addFields({
          name: "تحذير مهم!!",
          value: "**يُمنع منعًا باتًا التلاعب بهذه الرتبة. أي شخص يحاول الحصول عليها لأغراض تخريبية سيتم حظره نهائيًا من السيرفر!**"
        })
        .setColor("#F9E2FF");
      break;
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
});

client.login(process.env.TOKEN);
