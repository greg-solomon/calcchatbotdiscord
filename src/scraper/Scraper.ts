import puppeteer from 'puppeteer';


/**
 * Context provider for user data from firebase
 *
 * @param {string} chapter
 * @param {string} section
 * @param {string} exercise
 * @return {Object}
 */
export async function getAnswerImage(
    chapter: string,
    section: string,
    exercise: string,
) {
  try {
    const url = `https://www.calcchat.com/book/Calculus-11e/${chapter}/${section}/${exercise}`;
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    if (await page.$(`.dialog-404`)) {
    // Throw error
      console.log(`Could not find page`);
    }
    const imgUrl = await page.evaluate(() => {
      const solutionImage = document.querySelector('img#solutionimg');

      if (solutionImage) {
        return (solutionImage as HTMLImageElement).src;
      }
    });
    return {
      url,
      imgUrl,
    };
  } catch (err) {
    console.error(err.message);
    return {
      url: ``,
      imgUrl: ``,
    };
  }
}
