import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import {User, Settings, Lock, Check, Tag} from 'react-feather'
import Close from '../../assets/images/profile-setting/x.svg'
import { resetPass, updateSkill } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import ls from 'local-storage'
import Loader from 'react-loader-spinner'

export class Tabset_profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            user: ls.get('user'),
            designation: '',
            newPassword: '',
            isActive: false,
            preSkills: ls.get('skills'),
            skills: [],
            skill: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        let {preSkills, skills} = this.state
        if(preSkills !== null) {
            skills = preSkills.split(',')
        }
        this.setState({
            name: ls.get('user').name,
            email: ls.get('user').email,
            skills
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handle password reset form submit
    handleResetSubmit = (e) => {
        e.preventDefault();

        let {user, newPassword} = this.state

            this.setState({ isActive: true }, async() => {

                await resetPass(user.id, newPassword).then(response =>{

                    if(response.status === 200) {
                        this.setState({
                            isActive: false,
                        })
                        console.log('rez => ', response)
                        toast.success("Password updated Successflly!")
                    }
                    else {
                        this.setState({
                            isActive: false,
                        })
                        toast.error("Something went wrong!")
                    }
                    
                }).catch(err => {
                    this.setState({
                        isActive: false,
                    })
                    toast.error("Something went wrong!")
                })
            })
        
    }

    listSkill = (e) => {
        let {skill, skills} = this.state
        if(skills.length === 10) {
            toast.error("You add max 10 skills!")
        } else {
            this.setState({
                skills: [...this.state.skills, skill]
            })
        }
        // this.state.skills.push(skill);
        e.preventDefault();
    }

    delSkill(index) {
        console.log(index)
        let { skills } = this.state
        skills.splice(index, 1)
        this.setState({
            skills
        })
    }

    addSkills = () => {
        let { skills, user } = this.state

        if(skills.length === 0) {
            toast.error("Add atleast 1 skill!")
        } else {
            this.setState({isActive: true}, async() => {
                await updateSkill(user.id, skills.join()).then(response =>{

                    if(response.status === 200) {
                        ls.set('skills', skills.join())
                        this.setState({
                            isActive: false,
                        })
                        toast.success("Skills Add Successflly!")
                    }
                    else {
                        this.setState({
                            isActive: false,
                        })
                        toast.error("Something went wrong!")
                    }
                    
                }).catch(err => {
                    this.setState({
                        isActive: false,
                    })
                    toast.error("Something went wrong!")
                })
            })
        }
        
    }
    render() {
        let {isActive, skills} = this.state
        return (
            <div>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Profile</Tab>
                        <Tab className="nav-link"><Settings className="mr-2" />Skills</Tab>
                        <Tab className="nav-link"><Lock className="mr-2" />Reset Password</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{this.state.name}</td>
                                        </tr>
                            
                                        <tr>
                                            <td>Email:</td>
                                            <td>{this.state.email}</td>
                                        </tr>
 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <form className="needs-validation user-add" onSubmit={this.listSkill} >
                            <h4>Add Skills</h4>
                                <div className="form-group row" style={{"paddingLeft":"15px"}}>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom3" name="skill" type="text" required onChange={this.handleChange} />
                                <div className="col-xl-3 col-md-4"><input type="submit" className="btn btn-primary" value="Add" /></div>
                            </div>
                        </form>
                        <div className="form-group row" style={{"paddingLeft":"15px"}}>
                            {skills.map((item, index) => {
                                return(
                                    <div class="w3-tag w3-round w3-green" style={{"padding":"3px", "marginRight": "5px"}}>
                                        <div class="w3-tag w3-round w3-green w3-border w3-border-white">
                                            {item} <img src={Close} alt='' onClick={() => this.delSkill(index)}/>
                                        </div>
                                    </div>
                                )
                            })}                            
                        </div>
                        <div className="form-group row" style={{"marginTop":"15px"}}>
                            <div className="col-xl-3 col-md-4"><input type="button" className="btn btn-primary" value="Submit Skills" onClick={this.addSkills}/></div>
                        </div>
                        {isActive &&
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
                    </TabPanel>
                    <TabPanel>
                        <form className="needs-validation user-add" onSubmit={this.handleResetSubmit} >
                            <h4>Reset Password</h4>
                            {/* <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Current Password</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom3" name="prePassword" type="password" required onChange={this.handleChange} />
                            </div> */}
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> New Password</label>
                                <input className="form-control col-xl-8 col-md-7" id="validationCustom4" name="newPassword" type="password" required onChange={this.handleChange}/>
                            </div>
                            <div className="form-group row pull-right">
                                <input type="submit" className="btn btn-primary" value="Update" />
                            </div>
                        </form>
                        {isActive &&
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
                    </TabPanel>
                </Tabs>
                <ToastContainer />
            </div>
        )
    }
}

export default Tabset_profile
