
import React, { Component } from 'react'
import api from '../api';
import $ from 'jquery';


import Tbl from './Tbl';

 class Orders extends Component {

    constructor(props){
        super(props);
        this.state={
            orders:[]
        }
    }
componentDidMount = () => {
   











        // $('#example').DataTable( {
        //     "ajax": {
        //         "url": this.state.orders,
        //         "dataSrc": ""
        //     },
        //     "columns": [
        //         { "data": "order_id" },
        //         { "data": "delivery_address" },
        //         { "data": "total_price" },
        //         { "data": "payment_option" },
        //         { "data": "invoice_number" },
        //         { "data": "user_mobile_number" }
        //     ]
        // } );
}




















  render() {
    if(this.state.orders){
    return (
<div>

      {/* <div>

          <script>
      $(document).ready(function() {
    $('#example').DataTable( {
        "ajax": {
            "url": "data/objects_root_array.txt",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    } )
} );
      </script>

        <table id="example" className="display">
        <thead>
            <tr>
                <th>order_id</th>
                <th>delivery_address</th>
                <th>total_price</th>
                <th>payment_option</th>
                <th>invoice_number</th>
                <th>user_mobile_number</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Extn.</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </tfoot>
    </table> */}



        <h1>Orders</h1>
       
 <Tbl ></Tbl>

      </div>
      
    )
  }
  else{
    return(  <div>Loading</div>) 
  }
}
 }



export default Orders;