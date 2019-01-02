import React, { Component } from 'react';
import Geocode from "react-geocode";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import api from '../api';
  import {Map, InfoWindow, Marker, GoogleApiWrapper,Circle} from 'google-maps-react';

  import SimpleMarker from './SimpleMarker';

   
  
  
  const apiKey = 'AIzaSyCrCxjx8jW8RTzoVkx5SPm76V5w5ISooNU'
  const taipeiLocation = {lat:25.0329694, lng:121.5654177}
  const WIDTH = 400, HEIGHT = 900
  const defaultZoom = 11

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  Geocode.setApiKey("AIzaSyCrCxjx8jW8RTzoVkx5SPm76V5w5ISooNU ");

class Map1 extends Component {



    constructor(props) {
        super(props);
        this.state = { address: '',Items:[],
      Provi:[],lat:0,lng:0,distance:0,disArray:[],
      
     
      
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    
    };
      }

      onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

      showPosition(position) {
        // console.log(position.coords.latitude,position.coords.longitude);
       this.setState({lat: position.coords.latitude,lng:position.coords.longitude}); 
        console.log(this.state.lat,this.state.lng);
        this.transform(this.state.Provi,10);
    }
   getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{this.showPosition(position)});
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

   
     
      handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            this.state.lat = latLng.lat;
            this.state.lng = latLng.lng;
            this.setState({}); console.log('Success', latLng);
           let a= this.transform(this.state.Provi,15);
           console.log(this.state.Items);
          console.log(a);
        this.setState({disArray:a})})
          .catch(error => console.error('Error', error));
      };


    componentDidMount = () => {

        api.get('/provider').then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ Provi: response.data })
        }).catch(err => { console.log(err) });
      
    }
    
    transform(Provi, distance) {
      var Items=[];
      var dist=[];
        if(!Provi) return [];
        if(!distance) return Provi;
    //searchTex = searchTex.toLowerCase();
  if( Provi.filter((it) => {
          var a= this.isShow(distance,this.state.lat,this.state.lng,it.lat,it.lon);
          console.log(a);
          if(a[0]==true){
          var b=Object.assign({},it,{distance:a[1]});
          dist.push(b);
          }
          return a[0];
        })){
          dist.map(a=>console.log(a.distance));
        if(dist.sort((a,b)=>{
            return(a.distance-b.distance)
          })){
            console.log("sorted")
      if(dist.map((a)=>{console.log(a.distance);
        Items.push.apply(Items,a.food_id);
      })){
        this.setState({
          Items:new Set(Items)
        })
      }
        return dist;}}
       }
    
       isShow(distance,clat,clng,lat,lng){
           console.log("map Filter");
           console.log(distance+' '+clat+' '+clng+' '+lat+' '+lng);
    
    
           var R = 6371; // Radius of the earth in km
           var dLat = this.deg2rad(lat-clat);  // deg2rad below
           var dLon = this.deg2rad(lng-clng); 
           var a = 
             Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(this.deg2rad(clat)) * Math.cos(this.deg2rad(lat)) * 
             Math.sin(dLon/2) * Math.sin(dLon/2)
             ; 
           var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
        console.log(d);
    
        if(d<distance)
        {console.log(true);
        return [true,d];
        
        }
        else{
        console.log(false);
           return [false,d];
        }
       }
       deg2rad(deg) {
        return deg * (Math.PI/180)
      }
  render() {
//     const mark=this.state.Provi.map( (p, index) => {    

// return <AnyReactComponent
// lat={p.lat}
// lng={p.lon}
// text={'Kreyser Avrora'}
// />
//     })
//     const {cinList} = this.props
//     const {zoom} = this.state

//     const onChange= (e) => {
//         console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
//         console.log('e : ', e)
//         console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
        
//         const {center, zoom} = e
//         const {lat, lng} = center

//         this.setState({
//             cenSqure: {lat, lng},
//             zoom,
//             nwSpot: {...e.bounds.nw},
//         })
//     }

//     const onClick= (e) => {
//       console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
//       console.log('e : ', e)
//       console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
      
//       const {lat, lng} = e

//       this.setState({
//           center: {lat, lng},
//           zoom: this.state.zoom+1,
//       })
//   }




    return (
      <div>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>


      <button onClick={()=>this.getLocation()}>@</button>

{}
<Map google={this.props.google}
initialCenter={{
            lat: 11.2172508,
            lng: 77.48955569999998
          }}
 zoom={10}
 onClick={this.onMapClicked}
 >

 {/* <Circle center={{lat: 11.2172508,
            lng: 77.48955569999998}} radius={5}
            
            strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />  */}
 {
   this.state.disArray.map(m=>
    <Marker
   // title={'The marker`s title will appear as a tooltip.'}
    name={m.provider_name}
    ph_no={m.provider_mobile_number}
    address={m.provider_address}
    addressL={Geocode.fromLatLng(""+m.lat, ""+m.lon).then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address,m);
    return address;
  },
  error => {
    console.error(m.provider_address,error);
    return "m.provider_address";
  }
)}
    position={{lat: m.lat, lng: m.lon}} 
    key={m.provider_id}
    onClick={this.onMarkerClick}
    />)

 }


 <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
        
    <div style={{backgroundColor:"#DEEAF6"}}>
      
        <h1>{this.state.selectedPlace.name}   Store</h1>
          <h2>Address:{this.state.selectedPlace.address}</h2>  
          <h3>Ph_no:{this.state.selectedPlace.ph_no}</h3>   
              </div>
  
           
        </InfoWindow>
 
 

</Map>
        
      </div>
    )
  }
  
}


export default GoogleApiWrapper({
  apiKey: ('')
}) (Map1);
 {/* <SimpleMarker
                lat={p.lat}
                lng={p.lon}
                text={p.provider_name}
                zoom={11}
                key={index}
              /> */}