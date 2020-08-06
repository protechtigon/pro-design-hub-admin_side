import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import { userLogin, designerLogin } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import ls from 'local-storage'
import Loader from 'react-loader-spinner'

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            email: '',
            password: '',
            loading: false,

        }
        this.handleChange = this.handleChange.bind(this)
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }

    // handle change
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    routeChange = () => {
        // this.props.history.push(`/dashboard`);
    }

    // handle admin login form submit
    handleSubmit = (e) => {
        e.preventDefault();

        let {email, password} = this.state

        this.setState({ loading: true }, async() => {

            await userLogin(email, password).then(response =>{

                if(response.data.length > 0) {
                    this.setState({
                        loading: false,
                    })

                    if(response.data[0].is_admin === 1) {

                        ls.set('user', response.data[0])
                        this.props.history.push(`/dashboard`);

                    } else {
                        this.setState({
                            loading: false,
                        })
                        toast.error("Email or Password Invalid!")
                    }
                }
                else {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Email or Password Invalid!")
                }
                
            }).catch(err => {
                this.setState({
                    loading: false,
                })
                toast.error("Something went wrong!")
            })
        })
        
    }

    // handle designer login form submit
    _handleSubmit = (e) => {
        e.preventDefault();
    
        let {email, password} = this.state
    
        this.setState({ loading: true }, async() => {
    
            await designerLogin(email, password).then(response =>{
    
                if(response.data.length > 0) {
                    this.setState({
                        loading: false,
                    })
                    if (response.data[0].is_admin === 2) {
    
                        ls.set('user', response.data[0])
                        ls.set('skills', response.data[0].skills)
                        this.props.history.push(`/D/list-Portfolio`);
    
                    } else {
                        this.setState({
                            loading: false,
                        })
                        toast.error("Email or Password Invalid!")
                    }
    
                }
                else {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Email or Password Invalid!")
                }
                    
            }).catch(err => {
                this.setState({
                    loading: false,
                })
                toast.error("Something went wrong!")
            })
        })
            
    }

    render() {
        let { loading } = this.state
        return (
            <div>
                    <Fragment>
                        <Tabs>
                            <TabList className="nav nav-tabs tab-coupon" >
                                <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Admin</Tab>
                                <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Designers</Tab>
                            </TabList>

                            <TabPanel>
                                <form className="form-horizontal auth-form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input required name="email" type="email" className="form-control" placeholder="Email" id="exampleInputEmail1" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input required name="password" type="password" className="form-control" placeholder="Password" onChange={this.handleChange}/>
                                    </div>
   
                                    {/* <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="d-block">
                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                            Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                                    </label>
                                        </div>
                                    </div> */}
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit" >Login</button>
                                    </div>
                                    {loading &&
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                             <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                                        </div>
                                    }
                                    {/* <div className="form-footer">
                                        <span>Or Login up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""></a></li>
                                            <li><a className="fa fa-twitter" href=""></a></li>
                                            <li><a className="fa fa-instagram" href=""></a></li>
                                            <li><a className="fa fa-pinterest" href=""></a></li>
                                        </ul>
                                    </div> */}
                                </form>
                            </TabPanel>
                            <TabPanel>
                                <form className="form-horizontal auth-form" onSubmit={this._handleSubmit}>
                                    <div className="form-group">
                                        <input required name="email" type="email" className="form-control" placeholder="Email" id="exampleInputEmail1" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input required name="password" type="password" className="form-control" placeholder="Password" onChange={this.handleChange}/>
                                    </div>
   
                                    {/* <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="d-block">
                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                            Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                                    </label>
                                        </div>
                                    </div> */}
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit" >Login</button>
                                    </div>
                                    {loading &&
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                             <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                                        </div>
                                    }
                                    {/* <div className="form-footer">
                                        <span>Or Login up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""></a></li>
                                            <li><a className="fa fa-twitter" href=""></a></li>
                                            <li><a className="fa fa-instagram" href=""></a></li>
                                            <li><a className="fa fa-pinterest" href=""></a></li>
                                        </ul>
                                    </div> */}
                                </form>
                            </TabPanel>
                            <TabPanel>
                                <form className="form-horizontal auth-form">
                                    <div className="form-group">
                                        <input required="" name="login[username]" type="email" className="form-control" placeholder="Username" id="exampleInputEmail12" />
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="login[password]" type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="login[password]" type="password" className="form-control" placeholder="Confirm Password" />
                                    </div>
                                    <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="d-block">
                                                <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                I agree all statements in <span><a href="">Terms &amp; Conditions</a></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit" onClick={() => this.routeChange()}>Register</button>
                                    </div>
                                    <div className="form-footer">
                                        <span>Or Sign up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""></a></li>
                                            <li><a className="fa fa-twitter" href=""></a></li>
                                            <li><a className="fa fa-instagram" href=""></a></li>
                                            <li><a className="fa fa-pinterest" href=""></a></li>
                                        </ul>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                        <ToastContainer /> 
                    </Fragment>
                    
            </div>
            
        )
    }
}

export default withRouter(LoginTabset)

