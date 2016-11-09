const React = require('react');
const { flickrSearch  } = require('./model')
const DragImage = require('./drag_image')

module.exports = React.createClass({
    displayName: 'Flickr',

    // getInitialState :: { term :: String, results :: [Photo]}
    getInitialState() { return { term: "", results: [] } },

    // termChanged :: Event -> State Term
    termChanged({ currentTarget: t}) { this.setState({ term: t.value }) },

    // updateResult :: Event -> State Result
    updateResult(photos) { this.setState({ results: photos }) },

    // searchClicked :: Event -> Task
    searchClicked(e) { flickrSearch(this.state.term).fork(this.props.showError, this.updateResult) },

    render() {
        const imgs = this.state.results.map((photo) => <DragImage src={photo.src} />)
        return (
            <div id="flickr">
                <input onChange={this.termChanged} />
                <button onClick={this.searchClicked}>Search</button>
                <div id="results">{imgs}</div>
            </div>
        );
    }
});

