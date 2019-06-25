const Discord = require('discord.js');
const client = new Discord.Client();
const Trello = require('trello');
const trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_USER_TOKEN)
// const request = require('superagent');

client.on('ready', () => {
    console.log('Alred at your service');
});

client.on('message', msg => {
    var cmd = msg.content.substr(0, msg.content.indexOf(' '));
    var ban = msg.content.substr(msg.content.indexOf(' ' ) + 1);

    if (cmd === '!ban') {
        trello.addCard(ban, '', process.env.IDEA_BACKLOG_LIST_ID, (err, card) => {
            if (err) {
                msg.reply("I couldn't create your card. Check your command and make sure it is in the format of !ban [message]");
            } else {
                msg.reply('I have gone ahead and banned that player for you. If they have not automatically been kicked, please kick them.');
            }
        })
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
