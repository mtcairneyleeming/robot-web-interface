import { News } from '../api/news-api';
import { tts } from '../api/tts-api';

var news = new News();
var prettySource = {
    "ars-technica": "Ars Technica",
    "bbc-news": "BBC News"
};
var prettySort = {
    "latest": "latest",
    "top": "top",
    "popular": "most popular"
};

export class NewsSpeaker {
    sayArticle(source: string, sort: string, callback: Function) {
        news.getArticle(source, sort, function (useless, data) {
            var text = prettySource[source] + "'s " + prettySort[sort] + " story: " + data.description;
            tts(text, callback);
        });
    }
    sayNews(callback: Function) {
        this.sayArticle('bbc-news', "top", callback);
    }
    sayNewArticles(source: string, sort: string, callback: Function) {

        news.getNewSince(source, sort, function (useless, data) {
            var text;
            if (data.length === 1) {
                text = 'There is one new article from' + prettySource[source];
            } else {
                text = 'There are ' + data.length + " new articles from " + prettySource[source];
            }
            tts(text, callback);

        });
    };
}
