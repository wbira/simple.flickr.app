const React = require('react');

module.exports = React.createClass({
    displayName: 'Flickr',

    // getInitialState :: {}
    getInitialState() { return {} },

    // termChanged :: Event -> State Term
    termChanged({ currentTarget: t}) { this.setState({ term: t.value }) },

    // searchClicked :: Event => ?
    serchClicked(_) { console.log(this.state.term) },

    render() {
        return (
            <div id="flickr">
                <input onChange={this.termChanged} />
                <button onClick={this.serchClicked}>Search</button>
                <div id="results"></div>
            </div>
        );
    }
});

