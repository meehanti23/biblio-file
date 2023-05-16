import cheerio from 'cheerio';
import express from 'express';
import got from 'got';

const url = "https://www.goodreads.com/shelf/show/trending"

const goodreadsTrendingRouter = new express.Router();

goodreadsTrendingRouter.get("/", async (req, res) => {
    try {
        const apiResponse = await got(url);
        const responseBody = apiResponse.body;
        const $ = cheerio.load(responseBody);
        const $repos = $('body').find('.elementList');
        const repoData = [];
        $repos.each((index, element) => {
            const $element = $(element);
            const $title = $element.find('a.bookTitle');
            const $author = $element.find('div.authorName__container');
            const $image = $element.find('img');
            const $link = $element.find('a.bookTitle');
         
            const repo = {
                title: $title.text().trim(),
                author: $author.text().trim(),
                image: $image.attr('src'),
                link: $link.attr('href'),
            };
            console.log(repo.image)
            repoData.push(repo);
        });
        res.status(200).set({ 'content-type': 'application/json' }).json({ repos: repoData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: [err] });
    }
});

export default goodreadsTrendingRouter;