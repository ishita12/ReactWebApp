
import React, { Component } from 'react';
import PropTypes from 'prop-types';




export class Map extends React.Component {

constructor(props) {
  super(props);
}

  componentDidUpdate(prevProps, prevState) {
    //  if (prevProps.google !== this.props.google) {
        this.loadMap();
    //  }
    }

    loadMap() {
      if (this.props && this.props.google) {
        // google is available
        const {google} = this.props;

  const mapRef = this.refs.map;
       const node = ReactDOM.findDOMNode(mapRef);

        let zoom = this.props.zoom;
        let lat = this.props.initialCenter.lat;
        let lng = this.props.initialCenter.lng;
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig);
      }
    }

    render() {
      // ...
    }
}
Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object
}
