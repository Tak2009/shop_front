const SALES_URL = "https://shop-biz-backend.herokuapp.com/sales";
const SALESSIM_URL = "https://shop-biz-backend.herokuapp.com/salessimulations";
const BICYCLE_URL = "https://shop-biz-backend.herokuapp.com/bicycles";
const CASH_URL = "https://shop-biz-backend.herokuapp.com/cashes";

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


// const patchFxRate = (id, obj) =>{
//     return fetch(`${FX_RATES_URL}/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accpet": "application/json"
//         },
//         body: JSON.stringify(obj)
//     })
// }

// const createNewHist = (newHist) => {
//     return fetch(PORT_HIST_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(newHist)
//     })
// };

API = {getSales, getBicycle, createNewTrans, deleteSimTrans, getSalesSims, getSims, getCash};

// //test start\\\
// const dummyData = {
//     id: 5,
//     rate: 1.3 //from 1.2985
// } 

// API.patchFxRate(5, dummyData);
// //test end\\