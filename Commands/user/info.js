const samp = require("samp-query");

const { MessageEmbed } = require("discord.js");

const { SAMPIP } = require("../../config.json");

module.exports = {

  name: "serverinfo",

  aliases: ["sinfo", "info", "si", "server"],

  run: async (client, message, args) => {

    if(!SAMPIP) return message.reply(`IP ayarlanmamış.`);

    

    const color = "YELLOW";

    const ip = SAMPIP.split(':');

        const options = {

            host: ip[0],

            port: ip[1] || 7777

        };

    

        await samp(options, (error, query) => {

            if(error){

                const embed = new MessageEmbed()

                .setColor(color)

                .setTitle(`${options.host}:${options.port}`)

                .setDescription('Server is offline');

        

                return message.channel.send({ embeds: [embed] });

            }

            else{

                const pass = (query['passworded']) ? 'yes' : 'no';

                const embed = new MessageEmbed()

                    .setColor(color)

                    .setTitle(`**${query['hostname']}**`)

                    .addFields(

                        {name: 'IP:PORT', value: `${options.host}:${options.port}`, inline: true},

                        {name: 'PLAYERS', value: `${query['online'] || 0}/${query['maxplayers'] || 0}`, inline: true},

                        {name: 'GAMEMODE', value: query['gamemode'] || '-', inline: true},

                        {name: 'MAP', value: query['rules']['mapname'] || '-', inline: true},

                        {name: 'LANGUAGE', value: query['language'] || '-', inline: true},

                        {name: 'TIME - WEATHER', value: query['rules']['worldtime']+' - '+query['rules']['weather'], inline: true},

                        {name: 'VERSION', value: query['rules']['version'] || '-', inline: true},

                        {name: 'PASSWORD', value: pass, inline: true},

                        {name: 'URL', value: `[${query['rules']['weburl']}](https://${query['rules']['weburl'] || 'https://sa-mp.com'})`, inline: true}

                    );

    

                return message.channel.send({ embeds: [embed] });

            }

        });

    

  }

}
