const masterData = {
    "12-2020-Date":
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    "12-2020-Value":
    [1,2,3,4,5,6,7,8,9,10,11,12,1,3,4,5,6,7,8,8,9,7,8,4,5,6,7,8,4,6,7],
    "1-2021-Date":
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    "1-2021-Value":
    [3,2,3,6,5,6,7,8,9,10,11,1,1,1,4,5,6,8,5,9,7,8,9,4,5,6,10,10,15,8,7],
    "2-2021-Date":
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
    "2-2021-Value":
    [2,3,6,5,6,7,8,9,10,11,1,1,1,4,5,6,8,8,8,9,7,8,9,4,5,6,10,10],
    "3-2021-Date":
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    "3-2021-Value":
    [2,3,2,2,1,1,2,4,2,6,1,1,1,4,5,6,2,4,5,9,7,8,3,4,5,6,1,10,1,1,3],
    "4-2021-Date":
    [1,2,3,4,5,6,7,8,9,10,11,12,13],
    "4-2021-Value":
    [7,1,1,4,5,5,6,7,8,9,3]
}

let dt = new Date()

// past month test
dt = new Date(dt.getFullYear(), dt.getMonth(), 0);
dtFuture = new Date(dt.getFullYear(), dt.getMonth() + 2, 0);

let day = dt.getDate() -2
let month = dt.getMonth() + 1
let year = dt.getFullYear()
let thresholdTop = 10


//////////////////////////////////////////////////////////////////////////////////////
const SALES_URL = "http://localhost:3000/sales";
// const PORTFOLIOS_URL = "http://localhost:3000/portfolios"
// const PORT_HIST_URL = "http://localhost:3000/port_histories"


const getSales = () => {
    return fetch(SALES_URL)
    .then(resp => resp.json())
};


// const getPortfolios = () => {
//     return fetch(PORTFOLIOS_URL)
//     .then(resp => resp.json())
// };

// const getHist = () => {
//     return fetch(PORT_HIST_URL)
//     .then(resp => resp.json())
// };

// const createNewAcc = (newAcc) => {
//     return fetch(PORTFOLIOS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(newAcc)
//     }).then(resp => resp.json())
// };

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

// const deletePort = (id) => {
//     return fetch(`${PORTFOLIOS_URL}/${id}`,{
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify()
//     })
// };


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

API = {getSales};

// //test start\\\
// const dummyData = {
//     id: 5,
//     rate: 1.3 //from 1.2985
// } 

// API.patchFxRate(5, dummyData);
// //test end\\