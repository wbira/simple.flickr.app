const {curry} = require('ramda')
const Task = require('data.task')
const {getJSON} = require('jquery')
const {Just, Nothing} = require('data.maybe')

// preventDefault :: Event -> State Event
const preventDefault = (e) => e.preventDefault()

const Http = {
    // get :: Url -> Task Error JSON
    get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
}

// indexOf :: a -> [a] -> Maybe Number
const indexOf = curry((x, xs) => {
    const idx = xs.indexOf(x)
    return idx < 0 ? Nothing() : Just(idx)
})

module.exports = { Http, preventDefault, indexOf }