import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Route, Redirect, Link } from 'react-router-dom';
export class MapContainer extends Component {
  constructor(props) {
    super(props);
  this.state = {

       showingInfoWindow: true,
       activeMarker: {},
       selectedPlace: {
         name: "speare hall"
       },
       hallname: '',
       redirect: false

   }
    this.testclick = this.testclick.bind(this);
 }

 onMarkerClick1 = (props, marker, e) => {
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true,
  hallname: props,
  redirect: true,
  val:false
});
console.log('redirect value '+this.state.selectedPlace.name+'        '+this.state.redirect);





}
   onMarkerClick = (props, marker, e) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    hallname: props
  });
console.log('redirect value ');





}

testclick = (name) => {
this.setState({
  val: true
})
console.log("test   "+name);

}
/*


return (

  <Redirect to={{
                pathname: '/dashboard'
            }} />

)
*/


  render() {
    const redirect = this.state.redirect;
    const myhall=this.state.selectedPlace.name;
    if(redirect) {
console.log('inside redirect');
    setTimeout(function() {this.testclick(this.state.selectedPlace.name); }.bind(this), 2000);

    }

const val = this.state.val;
    if(val) {
      console.log('myhall is  '+myhall);
      return (

        <Redirect to={{
                      pathname: '/viewShiftsPerHall',
                      state: { referrerHall: myhall}
                  }} />

      )
    }

    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
            google={this.props.google}
            style={style}
            initialCenter={{
              lat: 42.3406532,
              lng: -71.0900517
            }}
            zoom={15}
          >

          <Marker
        onClick ={this.onMarkerClick1}
        onChildMouseEnter={this.onMarkerClick}
        name={'Speare hall'}
        position={{lat: 42.3406532, lng: -71.0900517}} />

      <Marker
      onClick={this.onMarkerClick1}
      name={'Melvin Hall'}
      position={{lat:42.34287532, lng: -71.0914405}}

      />
      <Marker
      onClick={this.onMarkerClick1}
      name={'Rubenstein Hall'}
      position={{lat:42.3378754, lng:-71.0967184}}

      />
      <Marker
      onClick={this.onMarkerClick1}
      name={'Light Hall'}
      position={{lat:42.3414865, lng: -71.0889405}}

      />

      <Marker
      onClick={this.onMarkerClick1}
      name={'Stetson Hall'}
      position={{lat:42.3409309, lng: -71.090885}}

      />
      <Marker
      onClick={this.onMarkerClick1}
      name={'Kerr Hall'}
      position={{lat:42.3423197, lng:  -71.0914405}}

      />
      <Marker
      onClick={this.onMarkerClick1}
      name={'Burstein Hall'}
      position={{lat:42.3375976, lng:  -71.0944962}}

      />
      <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClick={this.testclick}
            name={this.state.selectedPlace.name}>

              <div>
                <h1 >{this.state.selectedPlace.name}


                </h1>

              </div>


          </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(MapContainer)
