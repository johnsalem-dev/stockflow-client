export const ItemStatus = {
    "IN_STOCK": "IN STOCK",
    "LOW_STOCK": "LOW STOCK",
    "OUT_OF_STOCK": "OUT OF STOCK"
}
export const API_CONSTS = {
    CATEGORY: {
        BASE: {
            ENDPOINT: `/categories`,
            QUERY_KEYS: ['categories']
        }
    },
    DEPARTMENT: {
        BASE: {
            ENDPOINT: `/departments`,
            QUERY_KEYS: ['departments']
        }
    },
    EMPLOYEE: {
        BASE: {
            ENDPOINT: `/employees`,
            QUERY_KEYS: ['employees']
        }
    },
    ITEMS: {
        BASE: {
            ENDPOINT: `/items`,
            QUERY_KEYS: ['items']
        }
    },
    SUPPLIERS: {
        BASE: {
            ENDPOINT: `/suppliers`,
        },
        SEARCH: {
            ENDPOINT: `/suppliers/search`,
            QUERY_KEYS: ['suppliers', 'search']
        }
    },
    UOM: {
        BASE: {
            ENDPOINT: `/uom`,
        },
        SEARCH: {
            ENDPOINT: `/uom/search`,
            QUERY_KEYS: ['uoms', 'search']
        },
    },
    PURCHASE: {
        BASE: {
            ENDPOINT:  `/purchases`,
            QUERY_KEY: ['purchases']
        }
    }
}

export const STALE_TIME = {
    Q1: 1000 * 30, // 30secs
    Q2: 1000 * 60, // 1min
    Q3: 1000 * 60 * 2, // 2mins
    Q4: 1000 * 60 * 5 /// 5mins
}

export const TABLE_GRID = "grid grid-cols-[100px_minmax(200px,1fr)_140px_120px_80px_100px_120px_80px] gap-4 items-center px-4"

export const DEBOUNCE_WAIT = 300;