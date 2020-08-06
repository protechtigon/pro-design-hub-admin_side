import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6 footer-copyright">
                                <p className="pull-right mb-0">Copyright 2020 © ProHub Designs All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer
