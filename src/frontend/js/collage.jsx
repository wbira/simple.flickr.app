const React = require('react')
const { append } = require('ramda')

const preventDefault = (e) => e.preventDefault()

module.exports = React.createClass({
    displayName: 'Collage',

    //getInitialState :: {photos :: [Url] }
    getInitialState() { return { photos: [] } },

    //updatePhotos :: [Url] -> State photos
    updatePhotos(urls) { this.setState({ photos: urls }) },

    //onDrop :: Event -> State photos
    onDrop({dataTransfer: dt }) { 
        const url = dt.getData('text')
        this.updatePhotos(append(url, this.state.photos))
    },

    render() {
        const imgs = this.state.photos.map(url => <img src={url}/>)
        return (
            <div id="collage" onDrop={this.onDrop} onDragOver={preventDefault}>
                <div id="photos">{imgs}</div>
            </div>
        );
    }
});