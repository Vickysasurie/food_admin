import React, { Component } from 'react';
import api from '../api';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

  import GoogleMapReact from 'google-map-react';
  import StarRatingComponent from 'react-star-rating-component';

 

  const AnyReactComponent = ({ text }) => <div>{text}
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVISURBVGhD1ZpniCVFFEbbnHOOYEJlMSJmMQsKRhRFRVlWEfyhGDGiPxQzKvrHACZ0FcW8Ys6oKKioa8asmAPm7DnVU2z7Xlf3m52aedMfHLZvdU/3rXzrvi0ya2E4AK6C5+Er+BP+gC/gObgc9ob5YdJpabgEfoR/QcdfgnvhargGZsAr8Bf4zPdwFiwGQ9dccDLo1D9wFxwIi0NKVnoqPAxWyF47EuaAociWvA905jHYDEar7cAh6DtuggVgQrUyvA5/w0kWjEH26nlgZaxUU28OrAWhbRL6jB/8DfawIJMOAefPQ2DlmqSP+pHUA/ANXAzrWlCj6WDrHRysvDoWfPelweqXPumbPuprUlvB/eCQ8YVHQFV7guUXBKtdi8Boh8q14MKxebBmSV/8tr7po762anU4E6ovmxtmwkfQNCldfeytZ8GPvgvKoXAD7A9zWpDQkvAdPBmsWdIXfdK3MelQsEVcOlNyaX0cfO5DuBC2B2XvvAXeewR8NqUTwed2DVZm2ULuzqmJuCi4kv0OjnV7UM0zgpoXjgd3e1eqlBaCX+C2YGXUUuAwcZdOyd3bsb1PsIpiL3gBLBOv4yq3NvjOJrm5/gxWPpt0yq5OLbdrghW9IlhFcQL4/CdgmXhtmfeiYq/V6XDw+S2DlUmGIb50rWD16wzw/mowBazUo+Bwi/LaMveKuLR/DMeUl32yAr5zWrAG0BPwbQ8fwEoQZcTqSx27dXJNf6e8LM4Fn10jWP+XDeG9s4NVfuee8rJPNorPnh6sUvrk3/T6ax3CxIzdH7kIqjvnlfBTeVkrw/OnysviZnDDSsl7PqP8m/h3vbLRrMg5wSplmb71+msdBpK7qRM2tWIZyb5WXobec2jVbYRLgO+5LFhF8SakduhlwYqcGqxMOgV86QrB6pcVdUldBnYBn43OVhWH6E6wHDhf3GvqtAH47GHByqTdwZf6b53cdb1/WrCK4lbQvhs8n4hzwbJbQMUFojcUiXKSe3/TYGWSLe2QOD9Y9XJFct1fH1z77SU3R50Rr219720MbngPQkrXwa+QdR9Rz8D7kDrJGQN9DV/CjhYg58kOI8Q547BywvvcKhbUaD4w3rojWLMpg7ajwTN3dQ0/CmxZT3UpbQTuDfae53Xjs03A06PnjRngPeOw9SAlA0u/ZSIjSl/0Sd/0sVFufHa5L3kDtoYoW9Tkwp3BSsuPmFTwLB6HVcQe8wjQlnAwcv4MqsNKX/TJ9+hj48lUBzw72+p1Q8gDj0urrdwmT3E+Z6sa1rtTx+CxSXHVc6XslT7pmz7q62zLSf8D9J4VcsnY61X4FMyRjaviWWHfYOWVaSHf3XTmySZXlPdG8DqXnIOuZC9C0wkyq+wNWy4GfzlkPOeKtm2wJlAefEyNbhisscl9x0o0HdzGTSuCm5Zre9MBqU1GtCYonOBDywPHeKhuqRxUhjK+I2eyb9RyXTczaNbRk+FotQUYAZv0G7o8ybnjG4u1pTqrcsN0pzYCaEoNTahiHDbwSQ3FxHU1nhq6XPc9shrGr2pBiwz1PYjdHqxJpnXAudIWejuvDHEMdVz5JqU8ODlcdgtWvWLq9bhgTVKZuzKt+jbU7S0GgvF+zvBmXGSywBavS6x5hvDeUPeMQeXE99dbg8rq+cNsvAcrU0ed0X5gy5u/jTLDYtk2weqI7BVTqC8Hq7RNYj8drI7JVckeMNG288j1QdA5mfKMuazrwf9UMOG/o+eSed3PwQT4jRZ0VXF4iWnTzsqEXazI8hZ0Ve7eHodNKnRe/ghk+rTzMoVa/S1xHFQU/wFxtEdwoNX4BwAAAABJRU5ErkJggg=="></img>
  </div>;


 class UpdateProvider extends Component {

     constructor(props){
         super(props);
         this.state={
           map: {
                center: {
                  lat: 11.1289786,
                  lng: 77.0675531
                },
                zoom: 9.5
              },
            provider: [],
            items:[],checkedItems: new Set(),
            foodTable:[],
             address:'',
             data:{
"food_id": [
  5,
  10,
  12
],
"provider_name": "Viki",
"zoom": 1584,
"price": [
  75,
  350,
  40
],
"tax": 15,
"today_status": true,
"available": [
  80,
  50,
  35
],
"quantity": [
  1,
  1,
  1
],
"isActive": true,
"__v": 0,
"provider_mobile_number": 9597299278,
"lon": 77.4995815,
"lat": 11.2339707,
"provider_address": "Dontworry Building, Vijayapuri",
"createdAt": "2018-10-23T05:40:22.860Z",
"updatedAt": "2018-10-23T05:40:22.860Z"
},
available:[],
quantity:[],
price:[],rating:5
         }
     }

     componentDidMount = () => {
        api.get('/provider').then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ provider: response.data })
        }).catch(err => { console.log(err) });

        api.get('/providerlist/'+this.props.match.params.PID).then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ data: response.data,available:response.data.available,quantity:response.data.quantity,price:response.data.price,foodTable:response.data.food_id,checkedItems:new Set(response.data.food_id.map(String)) })
        }).catch(err => { console.log(err) });
        api.get('/items').then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ items: response.data })
        }).catch(err => { console.log(err) });


    }
    upProvider(){
        console.log("update provider: ",this.state.data);
        api.put('/updateProvider/'+this.state.data.provider_id,this.state.data).then(response=>{
            console.log(response.data);
            alert("Provider details updated successfully")
            this.props.history.push('/provider')
        }).catch(error=>{
            console.log(error)
        })
    }



    inputval(e, i) {
        if (e.target.id === "quantity") {
            this.state.quantity[i] = parseInt(e.target.value);
            this.setState({});

        }
        if (e.target.id === "available") {
            this.state.available[i] = parseInt(e.target.value);
            this.setState({});
        }
        if (e.target.id === "price") {
            this.state.price[i] = parseInt(e.target.value);
            this.setState({});

        }
    }


     addFood() {
         console.log(this.state.checkedItems);
        setTimeout(()=>{
        var a = [];
        var b=Array.from(this.state.checkedItems);
        this.state.data.food_id=b;
        this.state.data.available=[];
        this.state.data.quantity=[];
        this.state.data.price=[];
        this.setState({});
        console.log(this.state.data);
        b.map(c => {
            console.log(c);
            this.state.items.map(i => {
                if (c === i.food_id.toString()) {
                    a.push(i);

                }

            })
        });
        console.log(a);
        this.setState({ foodTable: a });
    },200);

    }






    handleChange = address => {
        console.log(this.state.available,this.state.price,this.state.quantity);
        this.setState({ address });
      };
     
      handleSelect = address => {
          this.state.data.provider_address=address;
         // this.setState({updateProvider:temp});
         this.setState({});
         console.log(address);
         
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {this.state.data.lat=latLng.lat;
            this.state.data.lon=latLng.lng;
            this.setState({});console.log('Success', latLng);})
          .catch(error => console.error('Error', error));
      };
    


      oncheckChange(e){
        console.log(e.target.value,e.target.checked);
        if(e.target.checked){
            this.addItem(e.target.value);
        }
        else
        {
            this.removeItem(e.target.value);
        }
        console.log(this.state.checkedItems);

    }


    addItem(item) {
        this.setState(({ checkedItems }) => ({
          checkedItems: new Set(checkedItems.add(item))
        }));

        this.addFood();
      }
    
      removeItem(item) {
        this.setState(({ checkedItems }) => {
          const newChecked = new Set(checkedItems);
          newChecked.delete(item);
    
          return {
           checkedItems: newChecked
          };
        });

        this.addFood();
      }

      onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }



  render() {
    const { rating } = this.state;
      {console.log(this.props.match.params.PID)}
    return (

      <div>
     
        <h1>Update Provider</h1>
        {/* <StarRatingComponent 
        name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        /> */}

        <div>
         <form>



<div class="form-group row">
    <label for="inputName" className="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Enter Name" value={this.state.data.provider_name} onChange={event=>this.setState({updateProvider:Object.assign(this.state.data,{"provider_name":event.target.value})})} required/>
    </div>
</div>
<div class="form-group row">
    <label for="inputPhno" className="col-sm-2 col-form-label">Ph No</label>
    <div class="col-sm-10">
        <input type="number" maxLength='10' className="form-control" id="inputPhno" placeholder="Enter Phone number" onChange={event=>this.setState({updateProvider:Object.assign(this.state.data,{"provider_mobile_number":event.target.value})})} value={this.state.data.provider_mobile_number} required />
    </div>
</div>
<div class="form-group row">
    <label for="inputTax" className="col-sm-2 col-form-label">Tax</label>
    <div class="col-sm-10">
        <input type="number" className="form-control" id="inputTax" placeholder="Tax" onChange={event=>this.setState({updateProvider:Object.assign(this.state.data,{"tax":event.target.value})})} value={this.state.data.tax}  required/>
    </div>
</div>
{
}
<PlacesAutocomplete
    value={this.state.address}
    onChange={this.handleChange}
    onSelect={this.handleSelect}
>
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input className="form-control" 
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input form-control',
                    
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
<div class="form-group row">
    <label for="address" className="col-sm-2 col-form-label">Address</label>
    <div class="col-sm-10">
        <input type="text" className="form-control" id="inputName" placeholder="Address" value={this.state.data.provider_address} disabled required/>
    </div>
</div>

<div class="input-group mb-3">
<div class="input-group-prepend">
<span class="input-group-text">Location</span>
</div>
<input type="number" class="form-control" placeholder="Lattitude" value={this.state.data.lat} onChange={(e)=>{this.state.data.lat=e.target.value; this.setState({})}} required/>
<input type="number" class="form-control" placeholder="Longtitude" value={this.state.data.lon} onChange={(e)=>{this.state.data.lon=e.target.value; this.setState({})}} required/>
</div>
<div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
         // bootstrapURLKeys={{ key: 'AIzaSyCrCxjx8jW8RTzoVkx5SPm76V5w5ISooNU' }}
          defaultCenter={{
                  lat:this.state.data.lat,
                  lng:this.state.data.lon
               } }
          defaultZoom={this.state.map.zoom}
        >
          <AnyReactComponent
            lat={this.state.data.lat}
            lng={this.state.data.lon}
            text={'.'}
          />
        </GoogleMapReact>
      </div>
            








<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Select Foods</button>


<div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">

        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
                {/* {this.state.items.map(i=>
            <div className="form-check">
<input className="form-check-input position-static" type="checkbox" id={o.order_id} value={o.order_id} aria-label="..." onChange={e=>this.oncheckChange(e)}/></div> */}


<div id="accordion">
{this.state.items.map(i=>
<div class="card">
<div class="card-header" id="headingOne">

<h5 class="mb-0">
<span>  <div className="form-check">
<input className="form-check-input position-static" type="checkbox" id={i.food_id} value={i.food_id} aria-label="..." onChange={e=>this.oncheckChange(e)} /></div></span>
<button class="btn btn-link" data-toggle="collapse" data-target={'#d'+i.food_id} aria-expanded="true" aria-controls="collapseOne">
{i.food_name}
</button>
</h5>
</div>

<div id={'d'+i.food_id} class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
<div class="card-body">
<img src={i.food_image} alt="..." class="img-thumbnail" />
</div>
</div>
</div>)}
</div>




            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={(e)=>this.addFood(e)}>Add Foods</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
<div className="table-responsive">
<table className="table">
<thead>
<tr>
    
    <th>food_id</th>
    {/* <th>Food Name</th> */}
    <th>quantity</th>
    <th>available</th>
    <th>price</th>
    
</tr>
{console.log(this.state.foodTable)}
</thead>
{this.state.foodTable?(
<tbody>

   { this.state.foodTable.map((o,index) =>
        <tr>
            <td>{index}</td>
            {/* <td>{o.food_name}</td> */}
            <td><input type="number" className="form-control" id="quantity" value={this.state.quantity[index]} onChange={(e)=>this.inputval(e,index)} /></td>
            <td><input type="number" className="form-control" id="available" value={this.state.available[index]} onChange={(e)=>this.inputval(e,index)} /></td>
            <td><input type="number" className="form-control" id="price" value={this.state.price[index]} onChange={(e)=>this.inputval(e,index)} /></td>
           
        </tr>
    )
}
    
</tbody>
):(<div>Loading</div>)}
</table>
</div>
<button type='button' className="btn btn-alert" onClick={()=>this.upProvider()}>Update Provider</button>
</form>
</div>
      </div>
    )
  }
}


export default UpdateProvider;