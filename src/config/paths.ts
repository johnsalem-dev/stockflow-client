const paths = {
    home: {
        path: '/',
    },
    dashboard: {
        path: '/dashboard'
    },
    masterData: {
        path: '/master-data'
    },
    itemCatalog: {
        path: '/item-catalog',
    },
    addItemCatalog: {
        path: '/item-catalog/add',
        slug: 'add'
    },
    procurement: {
        path: '/procurement' // Note: no leading slash for nested routes
    },
    newStockInward: {
        path: '/procurement/new-stock',
        slug: 'new-stock'
    },
    issuance: {
        path: '/issuance'
    },
    stockOutward: {
        path: '/issuance/new-issuance',
        slug: 'new-issuance'
    },
    reports: {
        path: '/reports'
    }
}

export default paths;