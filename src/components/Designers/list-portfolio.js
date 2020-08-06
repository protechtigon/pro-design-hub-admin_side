import React, { Component, Fragment} from 'react'
import Breadcrumb from '../common/breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import { getPortfolio, delPortfolio } from '../../services/api'
import Loader from 'react-loader-spinner'
import { Edit, Trash2 } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify';
import ls from 'local-storage'
import { Link } from 'react-router-dom'

export class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            list: [],
            cList: [],
            loading: false,
            id: ls.get('user').id
        };
    }
    onOpenModal = () => {
        // this.setState({ open: true });
        // toast.success("Successfully Deleted !")
        // toast.error("Something went wrong while loading data!")
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        let { id } = this.state;
        const portfolio = getPortfolio(id);
        this._getPortfolio(portfolio)
       
        
    }

    _getPortfolio =  portfolio => {
        
        this.setState({ loading: true }, async() => {
            await portfolio.then(async response => {

                if(!response.error) {
                    await response.data.map(item => {
                        const i = {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            images: item.images.split(','),
                        }

                        this.setState({
                            cList: [...this.state.cList, i]
                        })
                        
                    })
                    this.setState({
                        loading: false,
                        list: this.state.cList
                    })
                }
                else {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } 
            
            })
        })

    }

    _removePortfolio(portfolio_id) {
        delPortfolio(portfolio_id).then(res => {
            
            if(res.data.affectedRows) {
                toast.success('Portfolio Successfully Deleted!')
                //updating product list
                this.setState({
                    cList: [],
                    list:[]
                })
                let { id } = this.state;
                const portfolio = getPortfolio(id);
                this._getPortfolio(portfolio)
            }
            else {
                toast.error("Something went wrong while deleting Portfolio!")
            }
        }).catch(err => {
            toast.error("Something went wrong while deleting Portfolio!")
        })
    }

    render() {
        const { open, list, loading } = this.state;
        console.log(list)
        return (
            <Fragment>
                <Breadcrumb title="Portfolio" parent="Portfolio" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                {loading ? 
                    <div
                        style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                    </div> : 
                    <div className="row products-admin ratio_asos">
                        {
                            list.map((myData, i) => {
                                return (
                                    <div className="col-xl-3 col-sm-6" key={i}>
                                        <div className="card">
                                            <div className="products-admin">
                                                <div className="card-body product-box">
                                                    <div className="img-wrapper">
                                                        <div className="lable-block">
                                                            {(myData.tag === 'new' )?<span className="lable3">{myData.tag}</span> : ''}
                                                            {(myData.discount === 'on sale' )?<span className="lable4">{myData.discount}</span> : '' }
                                                            </div>
                                                        <div className="front">
                                                            <a className="bg-size"><img className="img-fluid blur-up bg-img lazyloaded" src={myData.images[0]} /></a>
                                                            <div className="product-hover">
                                                                <ul>
                                                                    <li>
                                                                        <button className="btn" type="button">
                                                                            <Link to={`/D/edit-portfolio/${myData.id}`}><Edit className="editBtn" /></Link>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button" onClick={() => this._removePortfolio(myData.id)}>
                                                                            <Trash2 className="deleteBtn" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <a> <h6 >{myData.title}</h6></a>
                                                        {/* <h4 >{myData.price} <del >{myData.discount_price}</del></h4> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                }
                </div>
                <ToastContainer />                     
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

export default Portfolio