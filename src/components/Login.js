import React, { Component } from 'react';
import './login.css';
// import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userData:{"userData":false} ,
            loginFailed: Boolean
        }
        this.login = this.login.bind(this);
        this.setState({ loginFailed: true });
    }
    componentDidMount() {
       
    }
    // login function starts
    login() {
            
       
            if ((this.state.username === "admin") && (this.state.password === "admin")) {     
                alert("Welcome " + this.state.username);
                this.setState({ loginFailed: false });
                this.state.userData.userData=true;
                
                localStorage.setItem('user', JSON.stringify(this.state.userData));
                this.props.history.push('/');
                window.location.reload(true);
            } else {
                console.log("Hai " + this.state.username + " check your login credentials");

            }
        
        if (this.state.loginFailed === true) {
            alert('U are not allow ');
        }
    }
    render() {
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Admin Login
					            </span>

                                <span className="txt1 p-b-11">
                                    Username
					            </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate="Username is required">
                                    <input className="input100" type="text" name="username" onChange={event => this.setState({ username: event.target.value })} autoComplete="true" />
                                    <span className="focus-input100"></span>
                                </div>

                                <span className="txt1 p-b-11">
                                    Password
					                </span>
                                <div className="wrap-input100 validate-input m-b-12" data-validate="Password is required">
                                    <span className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                    <input className="input100" type="password" name="pass" onChange={event => this.setState({ password: event.target.value })} />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="flex-sb-m w-full p-b-48">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Remember me
							                </label>
                                    </div>

                                    <div>
                                        <a href="/" className="txt3">
                                            Forgot Password?
							                </a>
                                    </div>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" onClick={() => this.login()}>
                                        Login
						                </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;