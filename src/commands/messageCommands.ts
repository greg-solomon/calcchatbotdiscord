/* eslint-disable max-len */
import {Message} from 'discord.js';
import {prefix} from '../config.json';
import {getAnswerImage} from '../scraper';
import books from '../books.json';
import cache from '../cache';

export default async (message: Message) => {
  const {content} = message;
  try {
    /**
     * Show Commands
     */
    if (content.startsWith(`${prefix}help`)) {
      // show help
      let helpStr: string = `\n**Usage**\n`;

      helpStr += '**!a [chapter] [section] [exercise]**\n\t\tRetrieve solution from current textbook.\n';
      helpStr += '**!listbooks**\n\t\tShow Available textbooks and their indices.\n';
      helpStr += '**!setbook [index]**\n\t\tSet book to book at index\n';
      helpStr += '**!currbook**\n\t\tShow current book\n';
      message.channel.send(helpStr);
    }
    /**
     * Get solution image
     */
    if (content.startsWith(`${prefix}a`)) {
      // Get parameters from string
      const withoutCommand = content.replace(`${prefix}a `, '');
      const [chapter, section, exercise] = withoutCommand.split(' ');

      // Let user know that search has commenced
      message.channel.send(
          // eslint-disable-next-line max-len
          `Searching for **${chapter}.${section}.${exercise}**`,
      );

      if (!section || !chapter || !exercise) {
        message.reply('Invalid parameters\n**Usage**\n!a [chapter] [section] [exercise]');
      } else {
        const id = message.guild?.id;

        if (id) {
          getAnswerImage(
              id,
              message,
              chapter,
              section,
              exercise,
          );
        }
      }
    }
    /**
     * List Available Books
     */
    if (content.startsWith(`${prefix}listbooks`)) {
      let replyStr: string = ``;
      for (let i = 0; i < books.length; i++) {
        const strToAdd = `**[${i}]** ${books[i]}\n`;
        if (replyStr.length + strToAdd.length > 2000) {
          message.channel.send(replyStr);
          replyStr = ``;
        }
        replyStr+= strToAdd;
      }
      message.channel.send(replyStr);
    }
    /**
     * Show Current Book
     */
    if (content.startsWith(`${prefix}currbook`)) {
      const id = message.guild?.id;

      if (id) {
        cache.get(id, (err, reply) => {
          if (err) throw err;
          message.channel.send(reply);
        });
      }
    }
    /**
     * SET BOOK
     */
    if (content.startsWith(`${prefix}setbook`)) {
      const id = message.guild?.id;
      const bookIndex =
        Number.parseInt(content.replace(`${prefix}setbook`, ''));
      console.log(bookIndex);
      if (id) {
        cache.set(id, books[bookIndex]);
        message.channel.send(`Current book set to **${books[bookIndex]}**`);
      }
    }
  } catch (err) {
    console.error(err.message);
    message.channel.send(`I had an issue with that.`);
  }
};
