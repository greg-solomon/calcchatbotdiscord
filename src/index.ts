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
import books from './books.json';
import Model from './model';
import connectDB from './db';
const app = express();

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
(async () => await connectDB())();
app.listen(process.env.PORT || 5000, async () => {
  console.log(`Web Server listening`);
});

const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user !== null ? client.user.tag : ''}`);
  const ids = client.guilds.cache.map((guild) => guild.id);
  ids.forEach(async (id) => {
    try {
      const bookCheck = await Model.findOne({guildId: id});
      if (!bookCheck) {
        const confirmGuild = new Model({
          guildId: id,
          book: books[2],
        });
        await confirmGuild.save();
      }
    } catch (err) {
      console.error(err.message);
    }
  });
});

client.on('guildCreate', () => {
  const ids = client.guilds.cache.map((guild) => guild.id);

  ids.forEach(async (id) => {
    const guildCheck = await Model.findOne({guildId: id});
    if (!guildCheck) {
      const newGuild = new Model({
        guildId: id,
        book: books[2],
      });
      await newGuild.save();
    }
  });
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


