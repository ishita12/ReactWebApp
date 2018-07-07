import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server'
import { Redirect,Link } from 'react-router-dom';

class InfoWindow extends React.Component {


constructor(props){
  super(props);


}




componentDidMount() {
  <Link to="/dashboard">view</Link>
}





  componentDidUpdate(prevProps, prevState) {
     if (this.props.map !== prevProps.map) {
       this.renderInfoWindow();
     }
     if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    if ((this.props.visible !== prevProps.visible) ||
       (this.props.marker !== prevProps.marker)) {
      this.props.visible ?
        this.openWindow() :
        this.closeWindow();
    }
   }

if(this.props.visible) {
  console.log('yes visible');
}

   renderInfoWindow() {
     let {map, google, mapCenter} = this.props;
  console.log('testing');
     const iw = this.infowindow = new google.maps.InfoWindow({
       content: ''
     });
   }
   updateContent() {
      const content = this.renderChildren();
      this.infowindow
        .setContent(content);
    }



    renderChildren() {

      const {children} = this.props;
         return ReactDOMServer.renderToString(children);

    }
    openWindow() {
        this.infowindow
          .open(this.props.map, this.props.marker);

      }
      closeWindow() {
          console.log('yesss');
        this.infowindow.close();

      }

  render() {
    return null;
  }
}
