import {Message} from 'discord.js';
import {prefix} from '../config.json';
import {getAnswerImage} from '../scraper';

export default async (message: Message) => {
  const {content} = message;
  try {
    if (content.startsWith(`${prefix}a help`)) {
      // show help
      message.reply(
          '\n**Usage**:\n`!answer [chapter] [section] [exercise]`',
      );
    }

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
        message.reply('Invalid parameters');
      } else {
        const {imgUrl} = await getAnswerImage(section, chapter, exercise);
        message.channel.send(
            `**${section}.${chapter}.${exercise}**\n${imgUrl}`,
        );
      }
    }
  } catch (err) {
    console.error(err.message);
    message.channel.send(`I had an issue with that.`);
  }
};
