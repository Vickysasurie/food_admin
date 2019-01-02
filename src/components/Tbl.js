import React, { Component } from 'react';
import api from '../api';




const delivered="#4286f4";
const cancelled="#4286f4";
const dispatched="#4286f4";





// const $ = require('jquery');
// $.DataTable = require('datatables.net');


export default class Tbl extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            search:'',
            select:'All',
            data:[],orginal:[],checkedItems: new Set()
        }
        this.onSelect=this.onSelect.bind(this);
        this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetch1 = this.fetch1.bind(this);
    }


    getStyle(s){
        if(s==='delivered'){
            return "table-success";
        }
        if(s==='cancelled'){
            return "table-danger";
        }
        if(s==='dispatched'){
            return "table-warning";
        }
    }

    componentDidMount = () => {
        if (JSON.parse(localStorage.getItem('user'))) {
    
        api.get('/order').then(response => {
            console.log(response.data);
            this.setState({ data: response.data ,
           original:response.data });
            console.log("orders:", this.state.data);
        })
            .catch(error => console.log(error));
    }else {
        alert("You must login to continue");
        
    }
}
 async   fetch(a) {
        
   let b=await api.put('/orderStatus',a).then(response=>{
        console.log(response.data);
         return 1;
    }).catch(error=>console.log(error));
    console.log(b);
   

    }
    fetch1(){
       
setTimeout(()=>{ api.get('/order').then(response => {
    console.log(response.data);
    this.setState({ data: response.data ,
   original:response.data });
    console.log("orders:", this.state.data);
}).catch(error => console.log(error));},2000);        
    }
    
async fetchData(a){
    

console.log(this.fetch(a))
 

if(this.fetch(a) ){

 this.fetch1();

}
 }
    
    
    checkDate(date){
        let udate=new Date(date.updatedAt);
        let Today=new Date();
        console.log(udate.getDate(),Today.getDate());
        if((udate.getDate()===Today.getDate())&&(udate.getMonth()===Today.getMonth())){
            console.log(true);
            return true;
        }
        else{
            console.log(false);
            return false;
        }
    }
   
    checkDelivered(a){      
        let str=a.order_status.toLowerCase();
        let str1="delivered"
        console.log(str===str1);
        if(str===str1){
            console.log(true);
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }

    checkDispatched(a){      
        let str=a.order_status.toLowerCase();
        let str1="dispatched"
        console.log(str===str1);
        if(str===str1){
            console.log(true);
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }

    checkNotDelivered(a){      
        let str=a.order_status.toLowerCase();
        let str1="not delivered"
        console.log(str===str1);
        if(str===str1){
            console.log(true);
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }

    checkCancelled(a){      
        let str=a.order_status.toLowerCase();
        let str1="cancelled"
        console.log(str===str1);
        if(str===str1){
            console.log(true);
            return true;
        }
        else{
            console.log('false');
            return false;
        }
    }


    clicked(e){
        let a={"order_status":'',"order_id":Array.from(this.state.checkedItems)};
        if(e.target.value==='dispatched'){
            a.order_status='dispatched';
            console.log(a);
        }
        if(e.target.value==='delivered'){
            a.order_status='delivered';
            console.log(a);
        }
        if(e.target.value==='cancelled'){
            a.order_status='cancelled';
            console.log(a);
        }
       
 
     this.fetchData(a);

      

       

           // this.fetchData();
    }

    search(e) {
        this.setState({search:e.target.value});
    }

    addItem(item) {
        this.setState(({ checkedItems }) => ({
          checkedItems: new Set(checkedItems.add(item))
        }));
      }
    
      removeItem(item) {
        this.setState(({ checkedItems }) => {
          const newChecked = new Set(checkedItems);
          newChecked.delete(item);
    
          return {
           checkedItems: newChecked
          };
        });
      }
    

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

    onSelect(event){
        console.log(event.target.value);
        this.setState({select: event.target.value});
    
       console.log(this.state.data)
       console.log(this.state.select)
        switch(event.target.value)
        {
            case 'Today':
            console.log(new Date().getDate());
            var updated=this.state.original.filter(this.checkDate);
            console.log(updated);
            this.setState({data:updated});
            console.log(this.state.data);
            break ;

            case 'Delivered':
            console.log('Delivered');
            var updated1=this.state.original.filter(this.checkDelivered);
            console.log(updated1);
            this.setState({data:updated1}); 
            break ;

            case 'Not Delivered':
            console.log('Not Delivered');
            var updated1=this.state.original.filter(this.checkNotDelivered);
            console.log(updated1);
            this.setState({data:updated1}); 
            break ;

            case 'Cancelled':
            console.log('cancelled');
            var updated1=this.state.original.filter(this.checkCancelled);
            console.log(updated1);
            this.setState({data:updated1}); 
            break ;

            case 'Dispatched':
            console.log('dispatched');
            var updated1=this.state.original.filter(this.checkDispatched);
            console.log(updated1);
            this.setState({data:updated1}); 
            break ;


            case 'All':
            console.log("all");
            console.log("Original",this.state.original);
            var ori=this.state.original;
            this.setState({data:ori});
            console.log(this.state.data);
            break ;


             default:
             

        }

    }


    render() {
        
       
        
        return (<div>
             <select onChange={(e)=> this.onSelect(e) }  value={this.state.select}>
  <option value="Today">Today Orders</option>
  <option value="Delivered">Delivered</option>
  <option value="Not Delivered">Not Delivered</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Dispatched">Dispatched</option>
  <option value="All" >All</option>
</select>

            


            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control" placeholder="Search" onChange={e => this.search(e)} />
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>order_id</th>
                            <th>user_id</th>
                            <th>user_mobile_number</th>
                            <th>delivery_address</th>
                            <th>total_price</th>
                            <th>payment_option</th>
                            <th>invoice_number</th>
                            <th>delivered_on</th>
                            <th>user_email</th>
                            <th>order_status</th>
                            <th>provider_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   console.log(Array.from(this.state.checkedItems))}
                           { this.state.data.filter(f=>Object.values(f).toString().toLowerCase().replace(/\s/g,'').split(",").join("").includes(this.state.search.toLowerCase().replace(/\s/g,''))).map(o =>
                                <tr className={this.getStyle(o.order_status)}><td><div className="form-check">
  <input className="form-check-input position-static" type="checkbox" id={o.order_id} value={o.order_id} aria-label="..." onChange={e=>this.oncheckChange(e)}/></div> </td>
                                    <td>{o.order_id}</td>
                                    <td>{o.user_id}</td>
                                    <td>{o.user_mobile_number}</td>
                                    <td>{o.delivery_address}</td>
                                    <td>{o.total_price}</td>
                                    <td>{o.payment_option}</td>
                                    <td>{o.invoice_number}</td>
                                    <td>{o.delivered_on}</td>
                                    <td>{o.user_email}</td>
                                    <td>{o.order_status}</td>
                                    <td>{o.provider_id}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div class="btn-group">
  <button type="button" class="btn btn-primary" value="dispatched" onClick={(e)=>this.clicked(e)}>Dispatched</button>
  <button type="button" class="btn btn-secondary" value="delivered" onClick={(e)=>this.clicked(e)}>Delivered</button>
  <button type="button" class="btn btn-primary" value="cancelled" onClick={(e)=>this.clicked(e)}>Canceled</button>
</div>
            </div>
        </div>

        )
    }
}
