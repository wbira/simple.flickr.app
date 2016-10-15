const { compose, replace, map, prop } = require('ramda')
const {getJSON} = require('jquery')
const Task = require('data.task')
const Url = String;

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

const Http = {
    // get :: Url -> Task Error JSON
    get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
}

// makeUrl :: String -> Url
const makeUrl = (term) => replace("{TAGS}", term, baseUrl)

// extractUrls :: JSON -> Url
const extractUrls = compose(map(prop('url_s')),prop('photo'),prop('photos'));

// flickerSearch :: String -> Task Error Url
const flickrSearch = compose(map(extractUrls),Http.get, makeUrl)

module.exports = { flickrSearch }