const client = require("../../index.js")

const samp = require("samp-query");

const { SAMPIP } = require("../../config.json");

const sleep = require('util').promisify(setTimeout);

client.on("ready", async (client) => {

  const ip = SAMPIP.split(':');

  const options = {

    host: ip[0],

    port: ip[1] || 7777

  }

  

  setInterval(() => {

    samp(options, (error, query) => {

      if(!SAMPIP || error){

        const statusText = `WARN: Server IP not set.`

        client.user.setStatus("idle");

        client.user.setActivity({name: statusText, type: "PLAYING"});

        

      } else {

        const statusText = `${query["online"]}/${query["maxplayers"]} player(s) in the game!`

        client.user.setStatus("idle");

        client.user.setActivity({name: statusText, type: "PLAYING"});

      }

    });

  }, 10000);

  

});
