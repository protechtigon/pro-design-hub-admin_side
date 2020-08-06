import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute'
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';

// Components
import Dashboard from './components/dashboard';
// import DashboardRoute  from './routes/PrivateRoute'

// Products physical
import Category from './components/products/physical/category';
import Sub_category from './components/products/physical/sub-category';
import Product_list from './components/products/physical/product-list';
import Add_product from './components/products/physical/add-product';
import Edit_product from './components/products/physical/edit-product'
import Product_detail from './components/products/physical/product-detail';

//Product Digital
import Digital_category from './components/products/digital/digital-category';
import Digital_sub_category from './components/products/digital/digital-sub-category';
import Digital_pro_list from './components/products/digital/digital-pro-list';
import Digital_add_pro from './components/products/digital/digital-add-pro';

//Sales
import Orders from './components/sales/orders';
import Transactions_sales from './components/sales/transactions-sales';
//Coupons
import ListCoupons from './components/coupons/list-coupons';
import Create_coupons from './components/coupons/create-coupons';

// Chat
import Message from './components/chat/index'

//Pages
import Media from './components/media/media';
import List_designer from './components/Designers/list-designer';
import Create_designer from './components/Designers/create-designer';
import Portfolio from './components/Designers/list-portfolio';
import Add_portfolio from './components/Designers/add-portfolio';
import Edit_portfolio from './components/Designers/edit-portfolio'
import List_user from './components/users/list-user';
import List_vendors from './components/vendors/list-vendors';
import Create_vendors from './components/vendors/create.vendors';
import Profile from './components/settings/profile';
import Reports from './components/reports/report';
import Invoice from './components/invoice';
import Datatable from './components/common/datatable'
import Login from './components/auth/login';
import ls from 'local-storage' 


class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ls.get('user')
        }
    }
    render() {
        return (
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                        
                        <Route exact path={"/"} component={Login} />
                        <Route exact path={"/auth/login"} component={Login} />
                        
                        <App>
                            
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            
                            <PrivateRoute path="/products/category" component={Category} />
                            <PrivateRoute path="/products/product-list" component={Product_list} />
                            <PrivateRoute path="/products/add-product" component={Add_product} />
                            <PrivateRoute path="/products/edit-product/:id" component={Edit_product} />
                                
                            {/* <Route path={"/products/physical/category"} component={Category} />
                            <Route path={"/products/physical/sub-category"} component={Sub_category} />
                            <Route path={"/products/physical/product-list"} component={Product_list} />
                            <Route path={"/products/physical/product-detail"} component={Product_detail} />
                            <Route path={"/products/physical/add-product"} component={Add_product} />

                            <Route path={"/products/digital/digital-category"} component={Digital_category} />
                            <Route path={"/products/digital/digital-sub-category"} component={Digital_sub_category} />
                            <Route path={"/products/digital/digital-product-list"} component={Digital_pro_list} />
                            <Route path={"/products/digital/digital-add-product"} component={Digital_add_pro} /> */}

                            <PrivateRoute path="/sales/orders" component={Orders} />
                            <PrivateRoute path="/sales/transactions" component={Transactions_sales} />

                            <PrivateRoute path="/coupons/list-coupons" component={ListCoupons} />
                            <PrivateRoute path="/coupons/create-coupons" component={Create_coupons} />

                            <PrivateRoute path="/media" component={Media} />

                            <PrivateRoute path="/Designers/list-designer" component={List_designer} />
                            <PrivateRoute path="/Designers/create-designer" component={Create_designer} />

                            <PrivateRoute path="/D/list-Portfolio" component={Portfolio} />
                            <PrivateRoute path="/D/create-portfolio" component={Add_portfolio} />
                            <PrivateRoute path="/D/edit-Portfolio/:id" component={Edit_portfolio} />
                            <PrivateRoute path="/D/message" component={Message} />

                            <PrivateRoute path="/users/list-user" component={List_user} />

                            {/* <Route path={"/vendors/list_vendors"} component={List_vendors} />
                            <Route path={"/vendors/create-vendors"} component={Create_vendors} /> */}

                            <PrivateRoute path="/reports/report" component={Reports} />

                            <PrivateRoute path={"/D/settings/profile"} component={Profile} />

                            <PrivateRoute path="/invoice" component={Invoice} />

                            <PrivateRoute path="/data-table" component={Datatable} />

                        </App>
                        
                    </Switch>
                </ScrollContext>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


