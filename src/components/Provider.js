import React, { Component } from 'react'
import api from '../api';
import {a} from './func';


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


class Provider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            provider: [],
            items: [], checkedItems: new Set(),
            foodTable: [],
            address: '', //for giocodeing suggestions
            updateProvider: {
                tax: 0, provider_address: '', available: [],
                quantity: [],
                price: [], lat: 0, lon: 0, zoom: 15
            },
            available: [],
            quantity: [],
            price: []
        }
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.postProvider = this.postProvider.bind(this);
    }
    componentDidMount = () => {
        a();
        if (JSON.parse(localStorage.getItem('user'))) {
        api.get('/provider').then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ provider: response.data })
        }).catch(err => { console.log(err) });
        api.get('/items').then(response => {
            console.log("object");
            console.log(response.data)
            this.setState({ items: response.data })
        }).catch(err => { console.log(err) });
     } else {
         alert("You must login to continue");
         this.props.history.push('/login');
     }
    }
    //to generate the table items
    addFood() {
        setTimeout(()=>{var a = [];
            var b = Array.from(this.state.checkedItems);
            this.state.updateProvider.food_id = b;
            this.setState({});
            console.log(this.state.updateProvider);
            b.map(c => {
                console.log(c);
                this.state.items.map(i => {
                    if (c === i.food_id.toString()) {
                        a.push(i);
    
                    }
    
                })
            });
            console.log(a);
            this.setState({ foodTable: a }); },200);
        


    }

    // add new provider
    postProvider() {
        
        console.log(this.state.updateProvider);
        this.state.updateProvider.available=this.state.available;
        this.state.updateProvider.quantity=this.state.quantity;
        this.state.updateProvider.price=this.state.price;
        console.log(this.state.available,this.state.quantity,this.state.price);
        console.log(this.state.updateProvider);

        // post provider
        api.post('/provider',this.state.updateProvider).then(response =>{
            console.log(response);
            alert("Provider updated successfully");
        }).catch(error =>{
            console.log(error);
        })
    }

    //for set of items
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


    oncheckChange(e) {
        console.log(e.target.value, e.target.checked);
        if (e.target.checked) {
            this.addItem(e.target.value);
        }
        else {
            this.removeItem(e.target.value);
        }
        console.log(this.state.checkedItems);

    }

    //geo coding
    handleChange = address => {
        console.log(this.state.available, this.state.price, this.state.quantity);
        this.setState({ address });
    };

    handleSelect = address => {
        this.state.updateProvider.provider_address = address;
        // this.setState({updateProvider:temp});
        this.setState({});
        console.log(address);
        console.log(this.state.updateProvider.provider_address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.state.updateProvider.lat = latLng.lat;
                this.state.updateProvider.lon = latLng.lng;
                this.setState({}); console.log('Success', latLng);
            })
            .catch(error => console.error('Error', error));
    };


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

    render() {

        return (
            <div>
                <h2>ℙ𝕣𝕠𝕧𝕚𝕕𝕖𝕣</h2>


                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="pill" href="#home">Provider</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#newprovider">New Provider</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#updateprovider">Update Provider</a>
                    </li>
                </ul>


                <div className="tab-content">
                    <div id="home" className="container tab-pane active"><br />



                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th>Id</th>
                                        <th>Provider Name</th>
                                        <th>Mobile Number</th>
                                        <th>Provider Address</th>
                                        <th>Today Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.provider.map(o =>
                                        <tr>
                                            <td>{o.provider_id}</td>
                                            <td>{o.provider_name}</td>
                                            <td>{o.provider_mobile_number}</td>
                                            <td>{o.provider_address}</td>
                                            <td>{(o.today_status)?("✔"):("✘")}	</td>

                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>


                        </div>
                    </div>
                    <div id="newprovider" className="container tab-pane fade"><br />
                    <div>

                        <form>



                            <div class="form-group row">
                                <label for="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" className="form-control" id="inputName" placeholder="Enter Name" value={this.state.updateProvider.provider_name} onChange={event => this.setState({ updateProvider: Object.assign(this.state.updateProvider, { "provider_name": event.target.value }) })} required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPhno" className="col-sm-2 col-form-label">Ph No</label>
                                <div class="col-sm-10">
                                    <input type="number" maxLength='10' className="form-control" id="inputPhno" placeholder="Enter Phone number" onChange={event => this.setState({ updateProvider: Object.assign(this.state.updateProvider, { "provider_mobile_number": parseInt(event.target.value) }) })} required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputTax" className="col-sm-2 col-form-label">Tax</label>
                                <div class="col-sm-10">
                                    <input type="number" className="form-control" id="inputTax" placeholder="Tax" onChange={event => this.setState({ updateProvider: Object.assign(this.state.updateProvider, { "tax": parseInt(event.target.value) }) })} required />
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
                                    <input type="text" className="form-control" id="inputName" placeholder="Address" value={this.state.updateProvider.provider_address} disabled required />
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Location</span>
                                </div>
                                <input type="number" class="form-control" placeholder="Lattitude" value={this.state.updateProvider.lat} onChange={(e) => { this.state.updateProvider.lat = e.target.value; this.setState({}) }} required />
                                <input type="number" class="form-control" placeholder="Longtitude" value={this.state.updateProvider.lon} onChange={(e) => { this.state.updateProvider.lan = e.target.value; this.setState({}) }} required />
                            </div>









                            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Select Foods</button>


                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">

                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>&nbsp;&nbsp;
                                            <h4 className="modal-title">Select Foods</h4>
                                        </div>
                                        <div className="modal-body">
                                            {/* {this.state.items.map(i=>
                                    <div className="form-check">
  <input className="form-check-input position-static" type="checkbox" id={o.order_id} value={o.order_id} aria-label="..." onChange={e=>this.oncheckChange(e)}/></div> */}


                                            <div id="accordion">
                                                {this.state.items.map(i =>
                                                    <div class="card">
                                                        <div class="card-header" id="headingOne">

                                                            <h5 class="mb-0">
                                                                <span>  <div className="form-check">
                                                                    <input className="form-check-input position-static" type="checkbox" id={i.food_id} value={i.food_id} aria-label="..." onChange={e => this.oncheckChange(e)} /></div></span>
                                                                <button class="btn btn-link" data-toggle="collapse" data-target={'#d' + i.food_id} aria-expanded="true" aria-controls="collapseOne">
                                                                    {i.food_name}
                                                                </button>
                                                            </h5>
                                                        </div>

                                                        <div id={'d' + i.food_id} class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <img src={i.food_image} alt="..." className="img-thumbnail" />
                                                            </div>
                                                        </div>
                                                    </div>)}
                                            </div>




                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" onClick={(e) => this.addFood(e)}>Add Foods</button>
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
                                            <th>Food Name</th>
                                            <th>quantity</th>
                                            <th>available</th>
                                            <th>price</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.foodTable.map((o, index) =>
                                            <tr>
                                                <td>{o.food_id}</td>
                                                <td>{o.food_name}</td>
                                                <td><input type="number" className="form-control" id="quantity" value={this.state.quantity[index]} onChange={(e) => this.inputval(e, index)} /></td>
                                                <td><input type="number" className="form-control" id="available" value={this.state.available[index]} onChange={(e) => this.inputval(e, index)} /></td>
                                                <td><input type="number" className="form-control" id="price" value={this.state.price[index]} onChange={(e) => this.inputval(e, index)} /></td>

                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <button type='button'className="btn btn-alert" onClick={() => this.postProvider()} > Add Provider</button>
                            <div>&times;</div>


                        </form>
                        </div>
                    </div>
                    <div id="updateprovider" className="container tab-pane fade"><br />

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th>provider_id</th>
                                        <th>provider_name</th>
                                        <th>provider_mobile_number</th>
                                        <th>provider_address</th>
                                        <th>today_status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.provider.map((o, index) =>
                                        <tr onClick={() => this.props.history.push('updateProvider/' + o.provider_id)} key={o.provider_id} >
                                            <td value={o.provider_id}>{o.provider_id}</td>
                                            <td value={o.provider_id}>{o.provider_name}</td>
                                            <td value={o.provider_id}>{o.provider_mobile_number}</td>
                                            <td value={o.provider_id} >{o.provider_address}</td>
                                            <td value={o.provider_id}>{o.today_status}</td>

                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>


                        </div>

                    </div>
                </div>


            </div>
        )
    }
}

export default Provider;
