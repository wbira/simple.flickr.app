const React = require('react')

module.exports = React.createClass({
    displayName: 'Collage',

    //getInitialState :: {photos :: [Url] }
    getInitialState() { return { photos: [] } },

    //updatePhotos :: [Url] -> State photos
    updatePhotos(urls) { this.setState({ photos: urls }) },

    render(){
        const imgs = this.state.photos.map(url => <img src={url}/> )
        return(
            <div id="collage">
                <div id="photos">{imgs}</div>                
            </div>
        );
    }
});