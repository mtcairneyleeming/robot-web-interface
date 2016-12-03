//Load the request module
var request = require('request-json');

var client = request.createClient('https://newsapi.org/v1/articles');
import { config } from '../config';

exports = module.exports = {};

var seenArticles = {
    'bbc-news': [],
    'ars-technica': [],

}; // separated by source, arrays of story urls

export class News {

    getArticles(source, sort, callback) {
        client.get(('?source=' + source + '&sortBy' + sort + "&apiKey=" + config.news.apiKey), function (err, res, body) {
            let data = body.articles;
            callback(null, data);
        });
    }
    getArticle(source, sort, callback) {
        client.get(('?source=' + source + '&sortBy' + sort + "&apiKey=" + config.news.apiKey), function (err, res, body) {
            let data = body.articles[0];
            callback(null, data);
        });
    }
    getNewSince(source, sort, callback) {
        client.get(('?source=' + source + '&sortBy' + sort + "&apiKey=" + config.news.apiKey), function (err, res, body) {
            var unseen = [];
            for (let article of body.articles) {
                if (seenArticles[source].indexOf(article.url) === -1) {
                    seenArticles[source].push(article.url);
                    unseen.push(article);
                }
            }
            //console.log(unseen, seenArticles);
            callback(null, unseen);
        });
    }
}