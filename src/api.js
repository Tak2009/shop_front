const SALES_URL = "https://shop-biz-backend.herokuapp.com/sales";
const SALESSIM_URL = "https://shop-biz-backend.herokuapp.com/salessimulations";
const BICYCLE_URL = "https://shop-biz-backend.herokuapp.com/bicycles";
const CASH_URL = "https://shop-biz-backend.herokuapp.com/cashes";


const get = (url) =>{
    return fetch(url)
}

const getInitialData = async (url, url2) => { 
    const resp = await get(url)
    const salesSims = await resp.json()
    const resp2 = await get(url2)
    const cash = await resp2.json()
    const results = []
    results.push(salesSims)
    results.push(cash)
    return results
}

const getSales = () => {
    return fetch(SALES_URL)
    .then(resp => resp.json())
};

const getBicycle = () => {
    return fetch(BICYCLE_URL)
    .then(resp => resp.json())
};

const getCash = () => {
    return fetch(CASH_URL)
    .then(resp => resp.json())
};

const getSalesSims = () => {
    return fetch(SALESSIM_URL)
    .then(resp => resp.json())
};

const getSims = (url) => {
    return fetch(url)
    .then(resp => resp.json())
};

const createNewTrans = (newTrans) => {
    return fetch(SALESSIM_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newTrans)
    // })
    }).then(resp => resp.json())
};

// // const patchAcc = (acc, id) => {
// //     return fetch(`${PORTFOLIOS_URL}/${id}`, {
// //         method: "PATCH",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Accept": "application/json"
// //         },
// //         body: JSON.stringify(acc)
// //     })
// // };

const deleteSimTrans = (id) => {
    return fetch(`${SALESSIM_URL}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify()
    })
};


API = {getSales, getBicycle, createNewTrans, deleteSimTrans, getSalesSims, getSims, getCash, getInitialData};
