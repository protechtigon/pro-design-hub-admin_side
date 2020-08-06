import React, { Component,Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../assets/images/pro3/1.jpg'
import user from '../../assets/images/user.png';
import { addPortfolio, getPortfolio } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import ls from 'local-storage'

export class Add_portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {

            file: '',
            dummyimgs: [
                { img: user },
                { img: user },
                { img: user },
            ],
            content: '',
            title: '',
            images: [],
            isActive: false,
            loading: false,
            preview: one,
            id: ls.get('user').id,
            havingPortfolio: false
        }
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }
    componentDidMount() {

        let { id } = this.state;
        const portfolio = getPortfolio(id);
        this._getPortfolio(portfolio)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        
    }

    onChange(evt) {
        // console.log("onChange fired with event info: ", evt);
        var html = evt.editor.getData();
        this.setState({ content: html });
    }

    //image upload
    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImgChange(e, i) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        this.state.images.push(file);

        const { dummyimgs } = this.state;
        
        reader.onloadend = () => {
            dummyimgs[i].img = reader.result;
            this.setState({
                file: file,
                dummyimgs,
                preview: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    _handleFormSubmit(e) {
        e.preventDefault();

        let { title, content, images } = this.state
        let id = ls.get('user').id;
        if(!images.length > 0) {
            toast.error("Please Select atleast 1 image!")
        } 
        else if (content === '') {
            toast.error("Please add Portfolio description!")
        }
        else {

            this.setState({ loading: true }, async() => {
                await addPortfolio({ title, content, images, id }).then(response => {
     
                    if(response.data) {
                        this.setState({
                            loading: false,
                            images: [],
                            dummyimgs: [
                                { img: user },
                                { img: user },
                                { img: user },
                            ],
                            preview: one
                        })
                        toast.success("New Portfolio added Successflly!")
                        window.location.replace('/D/list-Portfolio')
                    }
                    else {
                        this.setState({
                            loading: false,
                        })
                        toast.error("Something went wrong!")
                    }
                }).catch(err => {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong!")
                })
            })
        }
    }

    _getPortfolio =  portfolio => {
        
        this.setState({ isActive: true }, async() => {
            await portfolio.then(async response => {
          
                if(!response.error) {
                    if(response.data.length > 0) {
                        this.setState({
                            isActive: false,
                            havingPortfolio: true
                        })
                        toast.error("Seems to be you already have portfolio!")
                    } else {
                        this.setState({
                            isActive: false,
                            havingPortfolio: false
                        })
                    }
                }
                else {
                    this.setState({
                        isActive: false,
                        havingPortfolio: true
                    })
                    toast.error("Something went wrong while checking data!")
                } 
            
            })
        })

    }

    render() {
        const { isActive, preview, havingPortfolio, loading } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Add Portfolio" parent="Portfolio" />
                {isActive ? 
                    <div
                        style={{
                            width: "100%",
                            height: "100",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />
                    </div> :
                    <div className="container-fluid">

                        {!havingPortfolio &&
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Add Portfolio</h5>
                                        </div>
                                            <div className="card-body">
                                                <div className="row product-adding">
                                                    <div className="col-xl-5">
                                                        <div className="add-product">
                                                            <div className="row">
                                                                <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                                    <img src={preview} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                                </div>
                                                                <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                                    <ul className="file-upload-product">
                                                                        {
                                                                            this.state.dummyimgs.map((res, i) => {
                                                                                return (
                                                                                    <li key={i}>
                                                                                        <div className="box-input-file">
                                                                                            <input className="upload" type="file" onChange={(e) => this._handleImgChange(e, i)} />
                                                                                            <img src={res.img} style={{ width: 50, height: 50 }} />
                                                                                            <a id="result1" onClick={(e) => this._handleSubmit(e.target.id)}></a>
                                                                                        </div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-7">
                                                        <AvForm className="needs-validation add-product-form" onValidSubmit={this._handleFormSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                            <div className="form form-label-center">
                                                                <div className="form-group mb-3 row">
                                                                    <label className="col-xl-3 col-sm-4 mb-0">Add title :</label>
                                                                    <div className="col-xl-8 col-sm-7">
                                                                        <AvField className="form-control" name="title" id="validationCustom01" type="text" required onChange={this.handleChange}/>
                                                                    </div>
                                                                    <div className="valid-feedback">Looks good!</div>
                                                                </div>
                                        
                                                            </div>
                                                            <div className="form">

                                                                <div className="form-group row">
                                                                    <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                                        <CKEditors
                                                                            activeclassName="p10"
                                                                            content={this.state.content}
                                                                            //data="<p>Hello from CKEditor 5!</p>"
                                                                            //onChange={ ( event, editor ) => console.log( { event, editor } ) }
                                                                            events={{
                                                                                // blur: this.onBlur,
                                                                                // afterPaste: this.afterPaste,
                                                                                change: this.onChange
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="offset-xl-3 offset-sm-4">
                                                                <input type="submit" className="btn btn-primary" value="Add"/>
                                                                {/* <button type="button" className="btn btn-light">Discard</button> */}
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
                                                        </AvForm>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                <ToastContainer /> 
            </Fragment>
        )
    }
}

export default Add_portfolio
