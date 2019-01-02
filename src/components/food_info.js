import React from 'react';
import axios from 'axios';
import './food_info.css'

class Food_Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foodList: [],
            foodAdd:{"food_name":"","food_image":"","category":"South Indian","food_type":"Vegetarian","price":0,"breakfast":"true","lunch":"true","dinner":"true"},
            modalShow:false,
            selectedFood:[],
            food_id:0,
        }
        this.foodAdd=this.foodAdd.bind(this);
        this.foodDelete=this.foodDelete.bind(this);
        this.modal=this.modal.bind(this);
        this.foodUpdate=this.foodUpdate.bind(this);
    }

    componentDidMount() {
      if (JSON.parse(localStorage.getItem('user'))) {
        axios.get('http://13.58.92.162:3001/api/items').then(response => {
            //this.state.food_list=response.data;
            this.setState({ foodList: response.data });
            console.log(this.state.foodList);
        }).catch(err => {
            console.log(err);
        })
      } else {
          alert("You must login to continue");
          this.props.history.push('/login');
      }
    }

    foodAdd() {
        console.log("Added food details are: ",this.state.foodAdd);
        axios.post('http://13.58.92.162:3001/api/items' ,this.state.foodAdd) .then(response =>{
            console.log(response);
            alert(this.state.foodAdd.food_name+" added successfully");
            window.location.reload(true);
        })
    }

    foodDelete(selectedFood) {
        console.log(selectedFood.food_name);
        alert("Do you want to delete ",selectedFood.food_name);
        //alert(food_id);
        // axios.delete('http://192.168.1.145:3001/api/items/'+selectedFood.food_id) .then (response =>{
        //     console.log(response);
        //     alert(selectedFood.food_name+" is deleted successfully");
        //     window.location.reload(true);
        // }).catch(err =>{
        //     console.log(err);
        // })
    }

    // modal for update food details
    modal(f){
        //alert(f.food_name+" is just clicked by you ",f.food_name);
        this.setState({modalShow:true});
        this.state.foodAdd=f;
        this.setState({food_id:f.food_id});
        console.log(f);
        //console.log(this.state.foodAdd);
    }
    // update food
    foodUpdate(){
        console.log(this.state.foodAdd);
        axios.put('http://13.58.92.162:3001/api/items/'+this.state.food_id).then(response =>{
            alert(this.state.foodAdd.food_name+" is updated successfully");
            console.log(response.data);
            this.setState({modalShow:false});
        }).catch(error =>{
            console.log(error);
        })
    
    }
    render() {
        if ( (this.state.foodList) ) {
            return (

                <div >

                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#home">List of Food</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " data-toggle="tab" href="#menu1">Add Food</a>
                        </li>
                        <li className="nav-item disabled" >
                            <a className="nav-link disabled" data-toggle="" href="#menu2">Delete Food</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#menu3">Update Food</a>
                        </li>
                    </ul>


                    <div className="tab-content" style={{backgroundColor:"rgb(227, 236, 208)"}}>
<br/>
                    {/* food list tab start */}
                        <div className="tab-pane container active" id="home" style={{opacity:"1"}}>
                       
                            <div className="row">
                                <div className="col-sm-1">
                                    <strong>S No.</strong>
                                </div>
                                <div className="col-sm-2">
                                    <strong>Image</strong>
                                </div>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <strong>Name</strong>
                                        </div>

                                        <div className="col-sm-1">
                                        <strong>Price</strong>
                                        </div>

                                        <div className="col-sm-2">
                                        <strong>Category</strong>
                                        </div>

                                        <div className="col-sm-2">
                                        <strong>Food Type</strong>
                                        </div>

                                        <div className="col-sm-2">
                                        <strong>Breakfast</strong>
                                        </div>

                                        <div className="col-sm-2">
                                        <strong>Lunch</strong>    
                                        </div>

                                        <div className="col-sm-2">
                                        <strong>Dinner</strong> 
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {this.state.foodList.map((f,index) =>
                                    <div className="row" >

                                        <div className="col-sm-1">
                                            {index+1}
                                        </div>
                                        <div className="col-sm-2">
                                            <img src={f.food_image} width="65%" height="80%" alt="CX" />
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="row">
                                                <div className="col-sm-2">
                                                    <p>{f.food_name}</p>    
                                                </div>

                                                <div className="col-sm-1">
                                                    <p>{f.price}</p>    
                                                </div>

                                                <div className="col-sm-2">
                                                    <p>{f.category}</p>    
                                                </div>

                                                <div className="col-sm-2">
                                                    <p>{f.food_type}</p>    
                                                </div>

                                                <div className="col-sm-2">
                                                {f.breakfast === true?(
                                                    <p>Yes</p>
                                                ):(
                                                    <p>No</p>
                                                )  }
                                                </div>

                                                <div className="col-sm-2">
                                                {f.lunch === true?(
                                                    <p>Yes</p>
                                                ):(
                                                    <p>No</p>
                                                )  }   
                                                </div>

                                                <div className="col-sm-2">
                                                {f.dinner === true?(
                                                    <p>Yes</p>
                                                ):(
                                                    <p>No</p>
                                                )  }  
                                                </div>

                                            </div>
                                            
                                        </div>
                                    </div>
                                    )}
                            </div>
                {/* food list tab end */}
<br/>
                {/* add food tab start */}

                        <div className="tab-pane container fade " id="menu1">
                           
                           {/* <div style={{border:"2px solid",padding:"2px",textAlign:"center"}}>
                                
                                <label style={{display:"inline"}}>Food Name:</label>
                                <input class="form-control" style={{display:"inline",width:"350px"}} type="text" placeholder="food name" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_name": e.target.value})})} /> <br/><br/>
                               
                                <label style={{display:"inline"}}>Food Image:</label>
                                <input class="form-control" style={{display:"inline",width:"350px"}} type="text" placeholder="food image" onChange= {e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_image" : e.target.value})})} /><br/><br/>
                               
                                <label style={{display:"inline"}}>Food Price:</label>
                                <input class="form-control" style={{display:"inline",width:"350px"}} type="number" placeholder="price" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"price" :e.target.value})})} /><br/><br/>
                                
                                <label style={{display:"inline"}}>Category</label>
                                <select style={{display:"inline"}} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{"category":e.target.value})})}>
                                    <option value="South Indian">South Indian</option>
                                    <option value="North Indian">North Indian</option>
                                    <option value="Chineese">Chineese</option>
                                </select><br/><br/>
                                <label style={{display:"inline"}}>Breakfast</label>
                                <select style={{display:"inline"}} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"breakfast":e.target.value})})}>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select><br/><br/>
                                <label style={{display:"inline"}}>Lunch</label>
                                <select style={{display:"inline"}} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{ "lunch":e.target.value})})}>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select><br/><br/>
                                <label style={{display:"inline"}}>Dinner</label>
                                <select style={{display:"inline"}} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"dinner":e.target.value})})}>
                                    <option value="true">Available</option>
                                    <option value="false">Not Available</option>
                                </select>
                           </div> */}
<div style={{border:"2px solid",minHeight:"350px",textAlign:"left",padding:"15px"}}>

            <div className="row">
				<div className="col-3">
                    <label>Food Name</label>
				</div>
				<div className="col-sm-9">
                <input class="form-control" type="text" placeholder="food name" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_name": e.target.value})})} />
				</div>
            </div>
<br/>
			<div className="row">
				<div className="col-3">
					<label>Food Image</label>
				</div>
				<div className="col-9">
                <input class="form-control" type="text" placeholder="food image" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_image": e.target.value})})} />
				</div>
			</div>
<br/>
            <div className="row">
                    <div className="col-3">
                        <label>Price</label>
                    </div>
                    <div className="col-9">
                    <input class="form-control"  type="number" placeholder="food price" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"price": e.target.value})})} />
                    </div>
            </div>
<br/>
            <div className="row">
                    <div className="col-3">
                        <label>Food Category</label>
                    </div>
                    <div className="col-9" style={{textAlign:"left"}}>
                        <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{"category":e.target.value})})}>
                                    <option value="South Indian">South Indian</option>
                                    <option value="North Indian">North Indian</option>
                                    <option value="Chineese">Chineese</option>
                        </select>
                    </div>
            </div>
{/* <hr/> */}
<br/>
            <div className="row">
                    <div className="col-3">
                        <label>Food Type</label>
                    </div>
                    <div className="col-9" style={{textAlign:"left"}}>
                        <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{"food_type":e.target.value})})}>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="Non Vegetarian">Non Vegetarian</option>
                        </select>
                    </div>
            </div>
<br/>
			<div className="row">
					<div className="col-3">
								<label>Breakfast</label>
				    </div>
                    <div className="col-9" style={{textAlign:"left"}}>
                        <select style={{display:"inline"}} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"breakfast":e.target.value})})}>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
					 {/* </div>
				</div> */}
			</div>
<br/>            
			<div className="row">
					<div className="col-3">
						<label>Lunch</label>
				    </div>
                    <div className="col-9" style={{textAlign:"left"}}>
                        <select  onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"lunch":e.target.value})})}>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
					 {/* </div>
				</div> */}
			</div>
<br/>            
			<div className="row">
					<div className="col-3">
						<label style={{textAlign:"left"}}>Dinner</label>
				    </div>
                    <div className="col-9" style={{textAlign:"left"}}>
                        <select  onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"dinner":e.target.value})})}>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
				
			</div>
 </div>
                            
                            <button className="btn btn-warning btn-rounded" onClick={() => this.foodAdd()}>Add</button>
                        </div>

                        {/* add food tab end */}
<br/>
                        {/* delete food tab start */}
                        <div className="tab-pane container fade" id="menu2">
                          {this.state.foodList.map((f,index) =>
                            <div className="alert alert-info" role="alert">
                            {/* <div className="row"> */}
                            <div className="row">
                                <div className="col-md-3">
                                    <span><img src={f.food_image} height="100px" width="90px"/>
                                    </span>
                                </div>
                                <div className="col-md-8" style={{verticalAlign: "middle"}}><br/><br/>
                                        <p style={{textAlign:"center"}}>{f.food_name}  <button type="button" className="close" onClick={() => this.foodDelete(f)}>
                                        <span aria-hidden="true">&times;</span>
                                         </button></p>
                                </div>
                            </div>
                            </div>
                          )}
                        </div>
                        {/* delete food tab end */}

                        {/* update food tab start */}
                        <div className="tab-pane container fade " id="menu3">
                           
                           <div>
                           <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">S No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Breakfast</th>
                                    <th scope="col">Lunch</th>
                                    <th scope="col">Dinner</th>
                                    <th scope="col">Price</th>
                                    </tr>
                                </thead>
                               {this.state.foodList.map ((f,index) =>
                               
                                    <tbody>
                                      
                                             <tr onClick={() =>this.modal(f)} data-toggle="modal" data-target="#exampleModalCenter">
                                                <th scope="row">{index+1}</th>
                                                <td>{f.food_name}</td> 
                                                <td><img src={f.food_image} alt="X" width="65px" height="80px" /></td>
                                                <td>{f.category}</td>
                                                {f.breakfast === true?(
                                                    <td>Yes</td>
                                                ):(
                                                    <td>No</td>
                                                )}
                                                {f.lunch === true?(
                                                    <td>Yes</td>
                                                ):(
                                                    <td>No</td>
                                                )}
                                                {f.dinner === true?(
                                                    <td>Yes</td>
                                                ):(
                                                    <td>No</td>
                                                )}
                                                <td>{f.price}</td>
                                            </tr>
                                       
                                    </tbody>
                                )}
                                
                                </table>
                           </div>
                           
                           {/* <input type="text" placeholder="food name" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_name": e.target.value})})} />
                           <input type="text" placeholder="food image" onChange= {e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_image" : e.target.value})})} />
                            <input type="number" placeholder="price" onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"price" :e.target.value})})} />
                           <label>Category</label>
                           <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{"category":e.target.value})})}>
                               <option value="South Indian">South Indian</option>
                               <option value="North Indian">North Indian</option>
                               <option value="Chineese">Chineese</option>
                           </select>
                           <label>Breakfast</label>
                           <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"breakfast":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
                           <label>Lunch</label>
                           <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{ "lunch":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
                           <label>Dinner</label>
                           <select onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"dinner":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
                       
                            <button className="btn btn-warning btn-rounded" onClick={() => this.foodAdd()}>Add</button> */}
                        </div>
                   {/* update food tab end */}
                    </div>    

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" visible={this.state.modalShow} aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style={{backgroundColor:"#d9d9d9"}}>
                            <label style={{display:"inline"}}>Food Name</label>
                                <input className="form-control" style={{display:"inline"}} type="text" value={this.state.foodAdd.food_name}  onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_name": e.target.value})})} />
<br/>
                            <label style={{display:"inline"}}>Food Image</label>
                                <input className="form-control" style={{display:"inline"}} type="text" value={this.state.foodAdd.food_image} placeholder={this.state.selectedFood.food_image} onChange= {e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"food_image" : e.target.value})})} />
<br/>
                            <label style={{display:"inline"}}>Price</label>
                                <input className="form-control" style={{display:"inline"}} type="number" value={this.state.foodAdd.price} placeholder={this.state.selectedFood.price} onChange={e => this.setState({foodAdd: Object.assign(this.state.foodAdd, {"price" :e.target.value})})} />
                           <label>Category</label>
                           <select value={this.state.foodAdd.category} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{"category":e.target.value})})}>
                               <option value="South Indian">South Indian</option>
                               <option value="North Indian">North Indian</option>
                               <option value="Chineese">Chineese</option>
                           </select>
                           <label>Breakfast</label>
                           <select value={this.state.foodAdd.breakfast} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"breakfast":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
                           <label>Lunch</label>
                           <select value={this.state.foodAdd.lunch}  onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd,{ "lunch":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
                           <label>Dinner</label>
                           <select value={this.state.foodAdd.dinner} onChange={e =>this.setState({foodAdd:Object.assign(this.state.foodAdd, {"dinner":e.target.value})})}>
                               <option value="true">Available</option>
                               <option value="false">Not Available</option>
                           </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() => this.foodUpdate()}>Save changes</button>
      </div>
    </div>
  </div>
</div>        
                </div>

            );
        } else {
            return (
                <div>
                   Please refersh the page here 
                   <a href="/">Refresh</a>
                </div>
            )
        }
    }
}
export default Food_Info;