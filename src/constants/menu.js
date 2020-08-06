import {
    Home,
    Box,
    DollarSign,
    Tag,
    Camera,
    UserPlus,
    Users,
    BarChart,
    Settings,
    Archive,
    MessageSquare
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Products', icon: Box, type: 'sub', active: false, children: [
            { path: '/products/category', title: 'Category', type: 'link' },
            // { path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
            { path: '/products/product-list', title: 'Product List', type: 'link' },
            // { path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
            { path: '/products/add-product', title: 'Add Product', type: 'link' },
                
            
            // {
            //     title: 'Physical', type: 'sub', active: false, children: [
            //         { path: '/products/physical/category', title: 'Category', type: 'link' },
            //         { path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
            //         { path: '/products/physical/product-list', title: 'Product List', type: 'link' },
            //         { path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
            //         { path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
            //     ]
            // },
            // {
            //     title: 'digital', type: 'sub', active: false, children: [
            //         { path: '/products/digital/digital-category', title: 'Category', type: 'link' },
            //         { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
            //         { path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
            //         { path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
            //     ]
            // },
        ]
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        ]
    },
    {
        title: 'Coupons', icon: Tag, type: 'sub', active: false, children: [
            { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
            { path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
        ]
    },
    {
        title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
    },
    {
        title: 'Designers', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/Designers/list-designer', title: 'Designer List', type: 'link' },
            { path: '/Designers/create-designer', title: 'Create Designer', type: 'link' },
        ]
    },
    {
        title: 'Users', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/users/list-user', title: 'User List', type: 'link' },
        ]
    },
    // {
    //     title: 'Vendors', icon: Users, type: 'sub', active: false, children: [
    //         { path: '/vendors/list_vendors', title: 'Vendor List', type: 'link' },
    //         { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
    //     ]
    // },
    {
        title: 'Invoice',path:'/invoice', icon: Archive, type: 'link', active: false
    },
    {
        title: 'Reports',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    // {
    //     title: 'Settings', path: '/settings/profile', icon: Settings, type: 'link', active: false
    // },
]

export const DMENUITEMS = [
    {
        title: 'Messages', path: '/D/message', icon: MessageSquare, type: 'link', active: false
    },
    {
        path: '/D/list-Portfolio', title: 'Portfolio', icon: UserPlus, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/D/create-portfolio', title: 'Add Portfolio', icon: UserPlus, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Settings', path: '/D/settings/profile', icon: Settings, type: 'link', active: false
    },
]

