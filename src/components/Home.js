import React, { Component } from 'react'
import './Home.css';
import api from '../api';
import {a} from './func';
import { classNames } from 'classnames';

var QRCode = require('qrcode.react');


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={ 
           UserData:JSON.parse(localStorage.getItem('user')),
           allDbData:{"totalOrderDeliverd":300,"totalOrderDispatched":100,"totalOrderCancelled":80,"todayOrderDeliverd":30,"todayOrderDispatched":40,"todayOrderCancelled":10,"totalUsers":100,"activeUsers":50,"todayCollections":0,"paidForProviders":0,"profit":0,"loss":0,"totalProviders":30,"activeProviders":28,"usedProviders":25}
        }
    }
    componentDidMount(){
        a();
        if(this.state.UserData){
        console.log(this.state.UserData);}
        // console.log(this.props.location.pathname);
        api.get('/count').then(response => {
            console.log(response.data);
            this.setState({allDbData:response.data.total});
            console.log("order data: ",this.state.allDbData);
         
           
        })
    }
  render() {

    if(this.state.UserData){
        return (
            <div>𝔀𝓮𝓵𝓬𝓸𝓶𝓮 𝓪𝓭𝓶𝓲𝓷
            {/* <QRCode value="http://www.google.co.in" /> */}

                {/* orders and providers */}
                <div className="row" style={{minHeight:"150px"}}>
                       {/* space between divs */}
                       <div className="col-sm-1">

                        </div>
                    {/* provider details */}
                    <div className="col-sm-4" style={{border:"1px solid black",backgroundColor:"#E6E6FA"}}>
                        <h2>Today Orders</h2>
                        <div classNames="border border-dark">
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Delivered</label>
                                    <label className="col-sm-6">{this.state.allDbData.todayOrderDeliverd}</label>
                                </div>
                            </div>
                        </div>

                       <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Dispatched</label>
                                    <label className="col-sm-6">{this.state.allDbData.todayOrderDispatched}</label>
                                </div>
                            </div>
                        </div>

                           <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Cancelled</label>
                                    <label className="col-sm-6"><span className="badge badge-pill badge-success">{this.state.allDbData.todayOrderCancelled}</span></label>
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>
                    {/* space between divs */}
                    <div className="col-sm-2">

                    </div>

                    {/* order details */}
                    <div className="col-sm-4"  style={{border:"1px solid black", backgroundColor:"#FFE4E1"}}>
                    <h2>Total Orders(monthly)</h2>

                    <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Delivered</label>
                                    <label className="col-sm-6">{this.state.allDbData.totalOrderDeliverd}</label>
                                </div>
                            </div>
                        </div>

                       <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Dispatched</label>
                                    <label className="col-sm-6">{this.state.allDbData.totalOrderDispatched}</label>
                                </div>
                            </div>
                        </div>

                           <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Cancelled</label>
                                    <label className="col-sm-6">{this.state.allDbData.totalOrderCancelled}</label>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
<br/>
<br/>
                {/* users */}

                <div className="row" style={{minHeight:"150px"}}>
                    <div className="col-sm-1">

                    </div>
                    {/* user details */}
                    <div className="col-sm-4" style={{border:"1px solid black", backgroundColor:"#B0C4DE"}}>
                        <h2>Users</h2>

                        <div className="row">

                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Total Users</label>
                                    <label className="col-sm-6">{this.state.allDbData.totalUsers}</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Active Users</label>
                                    <label className="col-sm-6">{this.state.allDbData.activeUsers}</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* div breaks */}
                    <div className="col-sm-2">

                    </div>

                    {/* funds */}
                    <div className="col-sm-4" style={{border:"1px solid black", backgroundColor:"#B0C4DE"}}>
                        <h2>Transaction</h2>

                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Today collections</label>
                                    <label className="col-sm-6">Rs. {this.state.allDbData.todayCollections}</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Paid for Providers</label>
                                    <label className="col-sm-6">Rs. {this.state.allDbData.paidForProviders}</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Profit</label>
                                    <label className="col-sm-6">Rs. {Number((this.state.allDbData.profit).toFixed(2))}</label> 
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-10">
                                <div className="form-row">
                                    <label className="col-sm-6">Loss</label>
                                    <label className="col-sm-6">Rs. {this.state.allDbData.loss}</label>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
<br/>
<br/>
                {/* provider */}
                <div className="row">
                    {/* div brake */}
                    <div className="col-sm-3">

                    </div>
                    
                    <div className="col-sm-6 border border-dark" style={{border: "1 px solid black", backgroundColor: "#F4A460"}}>
                        <h2>Providers Details</h2>
                        <div className="row">
                            <div className="col-sm-6 border border-dark">
                                <h4>Total Providers</h4>

                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-row">
                                            <label className="col-sm-6">Total:</label>
                                            <label className="col-sm-6">{this.state.allDbData.totalProviders}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-row">
                                            <label className="col-sm-6">Active:</label>
                                            <label className="col-sm-6">{this.state.allDbData.activeProviders}</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-sm-6 border border-dark">
                                <h4>Today Used Providers</h4>

                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-row">
                                            <label className="col-sm-6">Total:</label>
                                            <label className="col-sm-6">{this.state.allDbData.activeProviders}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-row">
                                            <label className="col-sm-6">Used:</label>
                                            <label className="col-sm-6">{this.state.allDbData.usedProviders}</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* div brake */}
                    <div className="col-sm-3">

                    </div>

                </div>
            </div>
        )
    }
    else{
         this.props.history.push('/login');
    }

    return 0;
      
}
    
  
}
