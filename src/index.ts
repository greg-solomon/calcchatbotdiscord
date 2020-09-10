/**
 * CalcChatBot for CalcChat
 * Author: Greg Solomon
 * Github: greg-solomon
 * Author URI: https://gregsolomonwebdev.com
 */
import Discord from 'discord.js';
import {messageCommands} from './commands';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user !== null ? client.user.tag : ''}`);
});

client.on('message', messageCommands);

client.login(process.env.TOKEN);
