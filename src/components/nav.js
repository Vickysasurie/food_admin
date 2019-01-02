import React, { Component } from 'react'

 class nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
         userLogin:Boolean,   
        }
        this.state.userLogin=false;
        if(JSON.parse(localStorage.getItem('user'))){
           this.state.userLogin=true;
            console.log(this.state.userLogin);
        }
    }

logout(){
    localStorage.removeItem('user');
    this.state.userLogin=false;
    window.location.reload(true);
}


  render() {
    return (
      <div>
          <p>nav bar</p>

           <nav className="navbar fixed-top navbar-expand-lg navbar-dark " style={{backgroundColor:"#09AC53"}} >
                    <a className="navbar-brand" href="/">Native Foodie</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Admin Home <span className="sr-only">(current)</span></a>
                            </li>
                   
                            <li className="nav-item">
                                <a href="/order" className="nav-link" >Orders</a>
                            </li>
                            <li className="nav-item">
                                <a href="/provider" className="nav-link" >Providers</a>
                            </li>
                               <li className="nav-item">
                                <a href="/food_info" className="nav-link" >Foods</a>
                            </li>
                            
                            {this.state.userLogin?(
                                <li className="nav-item">
                                <a href="" className="nav-link" onClick={() => this.logout()}>Logout</a>
                                </li>
                            ):(
                                <li className="nav-item">
                                <a  href="/login" className="nav-link">Login</a>
                                </li>
                            )}
                            {/* {this.state.userLogin?(
                            <li className="nav-item">
                                <a className="nav-link" href="" onClick={() => this.logout()}>Logout</a>
                            </li>
                            ):[]} */}
                          
                        </ul>
                        
                        {/* <span className="navbar-text">
                           <p>Help</p>
                        </span> */}
                    </div>
                </nav>
        <br/>
      </div>
    )
  }
}


export default nav;
