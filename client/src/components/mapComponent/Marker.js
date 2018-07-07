import React, {Component} from 'react';

export class Marker extends React.Component {
    renderMarker() {
      let {
      position,name
      } = this.props;

      let pos = position;
      position = new google.maps.LatLng(pos.lat, pos.lng);

      const pref = {
        position: position
      };
      this.marker = new google.maps.Marker(pref);
  }
  // ...
}
