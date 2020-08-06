import React, { Component } from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import Footer from './common/footer';
import Header from './common/header_components/header';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ltr: true,
        }
    }
    ChangeRtl(divName) {
        if (divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({ divName: 'LTR' });
        } else {
            document.body.classList.remove('rtl');
            this.setState({ divName: 'RTL' });
        }
    }
    render() {
        return (
            <div>
                <div className="page-wrapper" >
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar />
                        <div className="page-body">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
