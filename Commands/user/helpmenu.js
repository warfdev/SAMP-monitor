const { MessageEmbed } = require("discord.js");

const { PREFIX } = require("../../config.json");

module.exports = {

  name: "help",

  aliases: ["yardim", "yardım", "h"],

  run: async (client, message) => {

    const embed = new MessageEmbed()

    .setColor("GREEN")

    .setTitle(`${client.user.username} — Help Menu`)

    .addFields(

      { name: `${PREFIX}ip`, value: `Shows server IP.` },

      { name: `${PREFIX}serverinfo`, value: `Shows server details.` },

      { name: `${PREFIX}players`, value: `Shows players playing on the server.` },

      { name: `${PREFIX}ping`, value: `Shows bot latency` }

    )

    .setTimestamp()

    .setThumbnail(client.user.displayAvatarURL())

    message.channel.send({ embeds: [embed] })

  }

}
