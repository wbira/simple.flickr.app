const React = require('react')
const { append } = require('ramda')
const { Photo } = require('./model')

const preventDefault = (e) => e.preventDefault()

module.exports = React.createClass({
    displayName: 'Collage',

    //getInitialState :: {photos :: [Photo] }
    getInitialState() { return { photos: [] } },

    //updatePhotos :: [Photo] -> State Photos
    updatePhotos(photos) { this.setState({ photos: photos }) },

    //onDrop :: Event -> State Photos
    onDrop({dataTransfer: dt, clientX: x, clientY: y, currentTarget: t }) {
        const offset = t.getBoundingClientRect().top 
        const src = dt.getData('text')
        const photo = Photo(src, x, y - offset)
        this.updatePhotos(append(photo, this.state.photos))
    },

    render() {
        const imgs = this.state.photos.map(photo => <img src={photo.src} style={{top: photo.y, left: photo.x}}/>)
        return (
            <div id="collage" onDrop={this.onDrop} onDragOver={preventDefault}>
                <div id="photos">{imgs}</div>
            </div>
        );
    }
});