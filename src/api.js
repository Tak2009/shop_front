const SALES_URL = "https://shop-biz-backend.herokuapp.com/sales";
const SALESSIM_URL = "https://shop-biz-backend.herokuapp.com/salessimulations";
const BICYCLE_URL = "https://shop-biz-backend.herokuapp.com/bicycles";
const CASH_URL = "https://shop-biz-backend.herokuapp.com/cashes";

const get = (url) =>{
    return fetch(url)
}

const getInitialDailyData = async (url, url2) => { 
    const resp = await get(url)
    const salesSims = await resp.json()
    const resp2 = await get(url2)
    const cash = await resp2.json()
    const results = []
    results.push(salesSims)
    results.push(cash)
    return results
}

const getInitialMonthlyData = async (url, url2, url3) => { 
    const resp = await get(url)
    const sales = await resp.json()
    const resp2 = await get(url2)
    const bicycles = await resp2.json()
    const resp3 = await get(url3)
    const salesSims = await resp3.json()
    
    const results = []
    results.push(sales)
    results.push(bicycles)
    results.push(salesSims)
    return results
}

const getData = async (url) => { 
    const resp = await get(url)
    const json = await resp.json()
    await console.log(json)
    return json
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
    // }).then(resp => resp.json())
    }).then(resp => {
        if (!resp.ok){
            throw new Error(`${resp.status}`)
        }
        return resp.blob()
    }).then((blob) => {
    }).catch(reason => {
        console.log(reason)
    })
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


API = {getSales, getBicycle, createNewTrans, deleteSimTrans, getSalesSims, getSims, getCash, getInitialDailyData, getData, getInitialMonthlyData};
