
const ctx1 = document.getElementById('daily-chart1');
const ctx2 = document.getElementById('daily-chart2');
const ctx3 = document.getElementById('daily-chart3');
const ctx4 = document.getElementById('daily-chart4');

const transactionList = document.getElementById('list');

let transYear = document.getElementById('id-year')
let transMonth = document.getElementById('id-month')
let transDay = document.getElementById('id-day')

const newForm = document.querySelector("#new_form")
const selectTrans = document.querySelector("#trans-selection")
const selectType = document.querySelector("#type-selection")
const createTrans = document.querySelector("#create-trans")

const todayDateElement = document.querySelector("#today")
const monthList = ["2021-01","2021-02","2021-03","2021-04"]
let salesHist
let bicycleList
let salesSimsList
let cashBal
let cashBalMove = []
let cashBalMoveLabel = []
let simTransMove = []
let simTransMoveLabel = []
let simCashBal = []

let inventoryA = []
let inventoryB = []
let inventoryC = []
let inventoryList = [inventoryA,inventoryB,inventoryC]
// let inventoryMoveLabel = []

let transactionsGroupedByMonth = []
let costSoldGroupedByMonth = []
let monthlySalesFigure = []
let monthlyCOGSFigure = []
let monthlyGrossProfitFigure = []

window.onload = () => {
    let today =  new Date()
    let dd = ("0" + today.getDate()).slice(-2)
    let mm = ("0" + (today.getMonth() + 1)).slice(-2)
    let yyyy = today.getFullYear()
    todayDate = `${dd}/${mm}/${yyyy}`
    todayDateElement.innerText = `Today is ${todayDate}`
}


(function() {
    
    //   今日の日付データを変数todayに格納
    let optionLoop, this_day, this_month, this_year, today;
    today = new Date();
    this_year = today.getFullYear();
    this_month = today.getMonth() + 1;
    this_day = today.getDate();
    
    //   ループ処理（スタート数字、終了数字、表示id名、デフォルト数字）
    optionLoop = function(start, end, id, this_day) {
      let i, opt;
  
      opt = null;
      for (i = start; i <= end ; i++) {
        if (i === this_day) {
          opt += "<option value='" + i + "' selected>" + i + "</option>";
        } else {
          opt += "<option value='" + i + "'>" + i + "</option>";
        }
      }
      return document.getElementById(id).innerHTML = opt;
    };
  
    // 関数設定（スタート数字[必須]、終了数字[必須]、表示id名[省略可能]、デフォルト数字[省略可能]）
    
    optionLoop(this_year, this_year, 'id-year', this_year);
    optionLoop(this_month, 12, 'id-month', this_month);
    optionLoop(this_day, 30, 'id-day', this_day);
  })();

// const dateFormat = (date) => {
//     const year = date.slice(0,4)
//     const month = date.slice(5,7)
//     return `${month}-${year}`
//   }

API.getSalesSims().then(salesSims => createSalesSimsData(salesSims))
API.getCash().then(cash => createPreviousEndMonthCashData(cash))
API.getBicycle().then(bicycles => createInitialInventoryData(bicycles))
API.getSales().then(sales => monthlyBreakDown(sales))

const createPreviousEndMonthCashData = (cash) => {
    cashBalMoveLabel.push(cash[0].date);
    cashBalMove.push(cash[0].bal);
    // createCashChartData(cashBalMove, cashBalMoveLabel, salesSimsList,simCashBal)
}

const createInitialInventoryData = (bicycles) => {
    bicycleList = bicycles
    for (let i = 0; i < bicycleList.length; i++) {
        inventoryList[i].push(bicycleList[i].qty)
    }
}

const createSalesSimsData = (salesSims) => {
    salesSimsList = salesSims
    for (let i = 0; i < salesSimsList.length; i++) {
        simTransMoveLabel.push(salesSimsList[i].date2)
        simTransMove.push(salesSimsList[i].valuesold)
    }
}

const createCashChartData = (cashBalMove, cashBalMoveLabel, salesSimsList, simCashBal) => {
    for (let i = 0; i < salesSimsList.length; i++) {
        cashBalMoveLabel.push(simTransMoveLabel[i])
        cashBalMove.push(simTransMove[i])
    }
    /// 累積値 \\\
    for (let i = 1; i < cashBalMove.length + 1; i++) {
        let sum = cashBalMove.slice(-cashBalMove.lenght, i).reduce((a , b) =>{
            return a + b
        })
        simCashBal.push(sum)
        sum = 0
    }
}

const monthlyBreakDown = (sales) => {
    salesHist = sales
    /// トランゼクションを月単位に分ける \\\
    monthList.forEach(transactionDate => {
        let monthlySalesTransactions = sales.filter((item, index) => {
            if(item.date1.indexOf(transactionDate) >= 0) return true;
        })
        transactionsGroupedByMonth.push(monthlySalesTransactions)
        console.log(transactionsGroupedByMonth)
    });
    /// 売り上げ及び原価計算 \\\
    calcMonthlySalesVolumeAndCOGS(transactionsGroupedByMonth)
    /// 粗利　GrossProfit計算 \\\
    calcMonthlyGrossProfit(monthlySalesFigure, monthlyCOGSFigure)
    /// グラフ \\\
    createCashChartData(cashBalMove, cashBalMoveLabel, salesSimsList,simCashBal)
    dailyChart3(monthlySalesFigure)
    dailyChart4(monthlyGrossProfitFigure)
    dailyChart1(cashBalMoveLabel, simCashBal)
    dailyChart2(cashBalMoveLabel, inventoryA, inventoryB, inventoryC)
}

/// 売り上げ及び原価計算開始 \\\
const calcMonthlySalesVolumeAndCOGS = (transactionsGroupedByMonth) => {
    // 売り上げ
    for (const month of transactionsGroupedByMonth){sumAllTransactionValue(month)}
    // 原価
    for (const month of transactionsGroupedByMonth){sumAllTransactionCost(month)}
}

/// 売り上げ計算開始 \\\
const sumAllTransactionValue = (month) => {
    console.log(month)
    let sum = 0
    for (let i = 0; i < month.length; i++) {
        console.log(month[i].valuesold)
        sum += month[i].valuesold
    }
    monthlySalesFigure.push(sum)
}

/// 原価計算開始 \\\
const sumAllTransactionCost = (month) => {
    console.log(month)
    let sum = 0
    for (let i = 0; i < month.length; i++) {
        console.log(month[i].costsold)
        sum += month[i].costsold
    }
    monthlyCOGSFigure.push(sum)
}

const calcMonthlyGrossProfit = (monthlySalesFigure, monthlyCOGSFigure) => {
    
    for (let i = 0; i < monthlySalesFigure.length; i++) {
        let gross = monthlySalesFigure[i] - monthlyCOGSFigure[i]
        monthlyGrossProfitFigure.push(gross)
    }
}


//////////Render Simulated Transactions\\\\\\\\\\\\\\\\
// const renderSims  = () => {
//     API.getSalesSims().then(salesSims => console.log(salesSims))
//     ////work in progress \\\\\
//     //// by using for(tran of salesSims), need to pass a simulated transaction to renderSimTrans to render 1 by 1 
// }


// const renderSimTrans = () => {
//     console.log(s)
    // const div = document.createElement("div")
    // div.id = s.id
    // const li = document.createElement("li")

    // const h3 = document.createElement("h3")
    // // // h3.innerText = `${p.exchange.currency.slice(-3)}: ${p.local_amt.toLocaleString()}, which is equivalent to GBP: ${p.home_amt.toLocaleString()}`
    // h3.innerText = `${s.id}: test}`
  
    // const dBtn = document.createElement("button")
    // dBtn.innerText = "Delete"
    // dBtn.className = "button"
    // // dBtn.addEventListener("click", (e) => {
    // //     deleteAcc(h3,div)
    // // // })
    // h3.insertAdjacentElement("beforeend", dBtn)
    // transactionList.appendChild(div)
// }
    
  newForm.addEventListener("submit", (e) => {
    let bicycleInfo = bicycleList.filter((bicycle, index) => {
        if(bicycle.id == parseInt(selectType.value)) return true;
    })
        let date1Plus2 = String (parseInt(transDay.options[0].value) + 2)
        const newTrans = {
        date1: `${transYear.options[0].value}-${transMonth.options[0].value}-${transDay.options[0].value}`,
        date2: `${transYear.options[0].value}-${transMonth.options[0].value}-${date1Plus2}`,
        bicycle_id: selectType.value,
        qtysold: createTrans.value,
        valuesold: createTrans.value * bicycleInfo[0].uprice,
        costsold: createTrans.value * bicycleInfo[0].ucost,
        };
        API.createNewTrans(newTrans).then(renderSims())
  });

/// チャート\\\
const dailyChart3 = (monthlySalesFigure) => {
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: monthList,
            datasets: [{
                label: 'Monthly Revenue',
                data: monthlySalesFigure,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    })
}

const dailyChart4 = (monthlyGrossProfitFigure) => {
    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: monthList,
            datasets: [{
                label: 'Monthly Gross Profit',
                data: monthlyGrossProfitFigure,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    })
}

const dailyChart1 = (cashBalMoveLabel, simCashBal) => {
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: cashBalMoveLabel,
            datasets: [{
            //     label: '閾値下限',
            //     backgroundColor: 'rgb(255, 99, 132)',
            //     borderColor: 'rgb(255, 99, 132)',
            //     data: threshold,
            //     lineTension: 0,
            //     fill: false
            // }, {
                label: 'Cash Balance',
                backgroundColor: 'rgb(10, 150, 190)',
                borderColor: 'rgb(10, 150, 190)',
                data: simCashBal,
                lineTension: 0,
                fill: false
            }]
        }
    });
}

const dailyChart2 = (cashBalMoveLabel, inventoryA, inventoryB, inventoryC) => {
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: cashBalMoveLabel,
            datasets: [{
                label: 'A',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: inventoryA,
                lineTension: 0,
                fill: false
            }, {
                label: 'B',
                backgroundColor: 'rgb(10, 150, 190)',
                borderColor: 'rgb(10, 150, 190)',
                data: inventoryB,
                lineTension: 0,
                fill: false
            }  ,{
                label: 'C',
                backgroundColor: 'rgb(10, 150, 290)',
                borderColor: 'rgb(10, 150, 290)',
                data: inventoryC,
                lineTension: 0,
                fill: false
            }]
        }
    });
}



