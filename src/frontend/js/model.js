const {curry, append, remove, compose, replace, prop, map} = require('ramda')

const daggy = require('daggy')
const {fold} = require('pointfree-fantasy')
const { Some, None } = require('fantasy-options')
const { indexOf, Http} = require('./utils')

const Point = Number;
const Url = String;

// Photo :: {src :: Url, x :: Point, y :: Point }
const Photo = daggy.tagged('src', 'x', 'y')

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?';

// mayToOpt :: Maybe a -> Option a
const mayToOpt = (m) => m.cata({Just: Some, Nothing: () => None})

// newPhoto :: Url -> Photo
const newPhoto = (url) => Photo(url, 0, 0);

// makeUrl :: String -> Url
const makeUrl = (term) => replace("{TAGS}", term, baseUrl)

// extractUrls :: JSON -> [Photo]
const toPhoto = compose(map(compose(newPhoto, prop('url_s'))), prop('photo'), prop('photos'));

// flickerSearch :: String -> Task Error [Photo]
const flickrSearch = compose(map(toPhoto), Http.get, makeUrl)

//indexOfPhoto :: Photo -> [Photo] -> Maybe Photo
const indexOfPhoto = curry((p, ps) => indexOf(p.src, ps.map(prop('src'))))

// replacePhoto :: Photo -> [Photo] -> [Photo]
const replacePhoto = curry((p, ps) => compose(fold(append(p), () => append(p, ps)),
                                              mayToOpt,
                                              map(i => remove(i, 1, ps)),
                                              indexOfPhoto(p))(ps))

module.exports = { flickrSearch, Photo, replacePhoto }