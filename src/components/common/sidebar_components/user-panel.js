import React, { Component } from 'react'
import man from '../../../assets/images/dashboard/man.png'
import ls from 'local-storage'

export class User_panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Super Admin',
            designation: 'general manager'
        }
    }
    componentDidMount() {
        if(ls.get('user').is_admin === 2) {
            this.setState({
                name: ls.get('user').name,
                designation: 'Designer'
            })
        }
    }
    render() {
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div><img className="img-60 rounded-circle lazyloaded blur-up" src={man} alt="#" />
                    </div>
                    <h6 className="mt-3 f-14">{this.state.name}</h6>
                    <p>{this.state.designation}</p>
                </div>
            </div>
        )
    }
}

export default User_panel

