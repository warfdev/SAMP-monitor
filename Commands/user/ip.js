const samp = require("samp-query");

const { MessageEmbed } = require("discord.js");

const { SAMPIP } = require("../../config.json");

const e = new MessageEmbed()

module.exports = {

  name: "ip",

  run: async (client, message, args) => {

    if(!SAMPIP) return message.reply(`IP not set.`);

    const ip = SAMPIP.split(':');

    const options = {

      host: ip[0],

      port: ip[1] || 7777

    }

    

    await samp(options,(error, query) => {

      if(error){

        

        e.setColor("RED")

        e.setTitle("Server Offline.")

        e.setDescription(`IP: \`${options.host}:${options.port}\` `)

        e.setTimestamp()

        return message.channel.send({ embeds: [e] });

      } else {

        e.setColor("GREEN")

        e.setTitle("Server Online.")

        e.setDescription(`IP: \`${options.host}:${options.port}\` `)

        e.addTimestamp()

        return message.channel.send({ embeds: [e] });

      }

      

    });

  }

}
