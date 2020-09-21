import {Message} from 'discord.js';
import {parseString} from 'xml2js';
import axios from 'axios';
import urls from '../urls.json';
import Model from '../model';
/**
 * Returns Solution Image
 *
 * @param {string} guildId
 * @param {Message} message
 * @param {string} chapter
 * @param {string} section
 * @param {string} exercise
 */
export async function getAnswerImage(
    guildId: string,
    message: Message,
    chapter: string,
    section: string,
    exercise: string,
) {
  try {
    if (Number.parseInt(exercise) % 2 !== 1) {
      message.channel.send('CalcChat only supports odd-numbered exercises');
      return;
    }

    const guildPair = await Model.findOne({guildId});
    // get current book from cache
    // hit book xml point
    if (guildPair) {
      const {data: bookListXML} = await axios.get(urls.booksUrl);

      parseString(bookListXML, async (err, data) => {
        if (err) throw err.message;
        // find book
        const args = {chapter, section, exercise};
        const books: any[] = data['BOOKS']['BOOK'];
        const xml = books.find((el) => el['$'].NAME === guildPair.book);

        // fetch book's xml
        const {data: textBookXML} = await axios.get(
            urls.base + xml['$']['CHAPTERS'],
        );

        parseString(textBookXML, (err, data) => {
          if (err) throw err.message;
          // Accumulate all the parts of the link that we need
          const FILETYPE = data['CHAPTERS']['$']['FILETYPE'];
          const SOLUTIONART = data['CHAPTERS']['$']['SOLUTIONART'];
          const CHAPTERS: any[] = data['CHAPTERS']['CHAPTER'];

          const _chapter: any = CHAPTERS.find(
              (el) => el['$']['NAME'] === args.chapter,
          );
          if (!_chapter) {
            message.channel.send(`Invalid chapter`);
          }

          const PRE = _chapter.SECTION.find(
              (el: any) => el['$']['NAME'] === args.section,
          );

          if (!PRE) {
            message.channel.send(`Invalid Section`);
          }

          const prefix = PRE['$']['PRE'];

          if (!prefix) {
            message.channel.send(`Invalid Section`);
          }

          const suffix = pad(args.exercise, 3);
          message.channel.send(`${SOLUTIONART}/${prefix}${suffix}.${FILETYPE}`);
        });
      });
    }
  } catch (err) {
    console.error(err.message);
    message.channel.send(err.message);
  }
}

/**
 * 0 Pads Number String
 *
 * @param {string} n
 * @param {number} width
 * @param {string} z
 * @return {Object}
 */
function pad(n: string, width: number, z: string = '0') {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
