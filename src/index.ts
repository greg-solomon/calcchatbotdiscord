/**
 * CalcChatBot for CalcChat
 * Author: Greg Solomon
 * Github: greg-solomon
 * Author URI: https://gregsolomonwebdev.com
 */
import Discord from 'discord.js';
import {messageCommands} from './commands';
import express from 'express';
import path from 'path';

const app = express();

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user !== null ? client.user.tag : ''}`);
});

client.on('message', messageCommands);

client.login(process.env.TOKEN);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('.'));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Web Server listening`);
});

