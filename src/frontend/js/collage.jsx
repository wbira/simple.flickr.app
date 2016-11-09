const React = require('react')
const DragImage = require('./drag_image')
const { append } = require('ramda')
const { Photo, replacePhoto } = require('./model')
const { preventDefault } = require('./utils')

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
        this.updatePhotos(replacePhoto(photo, this.state.photos))
    },

    render() {
        const imgs = this.state.photos.map(photo => <DragImage src={photo.src} style={{top: photo.y, left: photo.x}}/>)
        return (
            <div id="collage" onDrop={this.onDrop} onDragOver={preventDefault}>
                <div id="photos">{imgs}</div>
            </div>
        );
    }
});