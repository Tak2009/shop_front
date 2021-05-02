
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
let monthlyChartLabel = []
let salesHist
let bicycleList
let salesSimsList
 
// daily chart 1 \\
let dailyChartLabel = []
let salesSimsDates = []
let transactionsGroupedByDate = []
let dailySalesFigure = []
let dailySalesFigureChartData = []
let cashBal
let cashBalMove = []
let cashBalMoveLabel = []

let salesMonthlyDates = []
let salesSimsMonthlyDates = []

let simTransMove = []
let simTransMoveLabel = []
let simCashBal = []

let inventoryA = []
let inventoryB = []
let inventoryC = []
let inventoryList = [inventoryA,inventoryB,inventoryC]

let transactionsGroupedByMonth = []
let costSoldGroupedByMonth = []
let monthlySalesFigure = []
let monthlyCOGSFigure = []
let monthlyGrossProfitFigure = []

let this_day, this_month, this_year, today, daysOf2021;
    today = new Date();
    this_year = today.getFullYear();
    this_month = today.getMonth() + 1;
    this_day = today.getDate();
    // 月べつ日数
    daysOf2021 = [31,28,31,30,31,30,31,31,30,31,30,31]

window.onload = () => {
    let today =  new Date()
    let dd = ("0" + today.getDate()).slice(-2)
    let mm = ("0" + (today.getMonth() + 1)).slice(-2)
    let yyyy = today.getFullYear()
    todayDate = `${dd}/${mm}/${yyyy}`
    todayDateElement.innerText = `Today is ${todayDate}`
}

const optionLoop = (start, end, id, this_day) => {
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

// 即時関数 \\
const dateDropDown = (() => {
    // 関数設定（スタート数字[必須]、終了数字[必須]、表示id名[省略可能]、デフォルト数字[省略可能]）
    optionLoop(this_year, this_year, 'id-year', this_year);
    optionLoop(this_month, 12, 'id-month', this_month);
    optionLoop(this_day, daysOf2021[this_month - 1], 'id-day', this_day)
  })();

  transMonth.addEventListener('change', e => {
      console.log(e.target.value)
    //   transMonth.innerHTML = '';
      const updatedMonth = e.target.value;
      console.log(e.target.value)
      console.log(this_month)
      if (e.target.value == parseInt(this_month)){
        optionLoop(this_day, daysOf2021[updatedMonth - 1], 'id-day', this_day)
      } else {
        optionLoop(1, daysOf2021[updatedMonth - 1], 'id-day', this_day)
      }
  })

// const dateFormat = (date) => {
//     const year = date.slice(0,4)
//     const month = date.slice(5,7)
//     return `${month}-${year}`
//   }

API.getInitialDailyData(SALESSIM_URL, CASH_URL, BICYCLE_URL).then(results => createSalesSimsData(results))
API.getInitialMonthlyData(SALES_URL, BICYCLE_URL, SALESSIM_URL).then(results => createMonthlyData(results))

const createPreviousEndMonthCashData = (results) => {
    cashBalMoveLabel.push(results[1][0].date);
    cashBalMove.push(results[1][0].bal);
    dailylyCashBreakDown(results)
    dailyInventoryBreakDown(results)
    renderSimTrans(results[0])
}

const createMonthlyData = (results) => {
    bicycleList = results[1]
    for (let i = 0; i < bicycleList.length; i++) {
        inventoryList[i].push(bicycleList[i].qty)
    }
    monthlyBreakDown(results)
    // dailyInventoryBreakDown(results)
    // dailyChart2(cashBalMoveLabel, inventoryA, inventoryB, inventoryC)
}

const createSalesSimsData = (results) => {
    salesSimsList = results[0]
    createPreviousEndMonthCashData(results)
}

const dailylyCashBreakDown = (results) => {

    // ラベル作り \\
    for (let i = 0; i < results[0].length; i++) {
        salesSimsDates.push(results[0][i].date1)
    }
    dailyChartLabel = [...new Set(salesSimsDates)]
    dailyChartLabel.sort()

    // 日次集計 \\
    dailyChartLabel.forEach(simTransactionDate => {
    let dailySalesTransactions = results[0].filter((item, index) => {
        if(item.date1.indexOf(simTransactionDate) >= 0) return true;
    })
    transactionsGroupedByDate.push(dailySalesTransactions)
    console.log(transactionsGroupedByDate)
    });
    // 日次合計 \\
    for (const date of transactionsGroupedByDate) {
        let sum = 0
        for (let i = 0; i < date.length; i++) {
            console.log(date[i].valuesold)
            sum += date[i].valuesold
        }
        dailySalesFigure.push(sum)
    }
    // 累積値 \\
    dailyChartLabel.unshift(cashBalMoveLabel[0])
    dailySalesFigure.unshift(cashBalMove[0])

    for (let i = 1; i < dailySalesFigure.length + 1; i++) {
        let sum = dailySalesFigure.slice(-dailySalesFigure.lenght, i).reduce((a , b) =>{
            return a + b
        })
        dailySalesFigureChartData.push(sum)
        sum = 0
    }

    dailyChart1(dailyChartLabel, dailySalesFigureChartData)
}

let dailyChartLabel2 = []
let salesSimsDates2 = []
let transactionsGroupedByDate2 = []

let dailyInventoryAFigure = []
let dailyInventoryBFigure = []
let dailyInventoryCFigure = []
let inventoryDaily = [dailyInventoryAFigure, dailyInventoryBFigure, dailyInventoryCFigure]
let dailyInventoryAAccum = []
let dailyInventoryBAccum = []
let dailyInventoryCAccum = []
let dailyInventoryChartData = [dailyInventoryAAccum, dailyInventoryBAccum, dailyInventoryCAccum]

const dailyInventoryBreakDown = (results) => {

    // ラベル作り \\
    for (let i = 0; i < results[0].length; i++) {
        salesSimsDates2.push(results[0][i].date1)
    }
    dailyChartLabel2 = [...new Set(salesSimsDates2)]
    dailyChartLabel2.sort()
    // debugger;
    // 日次集計 \\
    dailyChartLabel2.forEach(simTransactionDate => {
    let dailySalesTransactions2 = results[0].filter((item, index) => {
        if(item.date1.indexOf(simTransactionDate) >= 0) return true;
    })
    transactionsGroupedByDate2.push(dailySalesTransactions2)
    console.log(transactionsGroupedByDate2)
    });
    // 日次合計 \\
    for (const date of transactionsGroupedByDate2) {
        let sumA = 0, sumB = 0, sumC = 0
        for (let i = 0; i < date.length; i++) {
            console.log(date[i].valuesold)
            if (date[i].bicycle_id === 1) {
                sumA -= date[i].qtysold
                sumB = 0
                sumC = 0
              
            } else if (date[i].bicycle_id === 2) {
                sumA = 0
                sumB -= date[i].qtysold
                sumC = 0

            } else {
                sumA = 0
                sumB = 0
                sumC -= date[i].qtysold
            }
        }
        dailyInventoryAFigure.push(sumA)
        dailyInventoryBFigure.push(sumB)
        dailyInventoryCFigure.push(sumC)
        sumA = 0
        sumB = 0
        sumC = 0
    }
    // 累積値 \\
    for (let i = 0; i < inventoryDaily.length; i++){
        inventoryDaily[i].unshift(results[2][i].qty)
    }
    
    for (let i = 1; i < dailyInventoryAFigure.length + 1; i++) {
        let sum = dailyInventoryAFigure.slice(-dailyInventoryAFigure.lenght, i).reduce((a , b) =>{
            return a + b
        })
        dailyInventoryAAccum.push(sum)
        sum = 0
    }

    for (let i = 1; i < dailyInventoryBFigure.length + 1; i++) {
        let sum = dailyInventoryBFigure.slice(-dailyInventoryBFigure.lenght, i).reduce((a , b) =>{
            return a + b
        })
        dailyInventoryBAccum.push(sum)
        sum = 0
    }

    for (let i = 1; i < dailyInventoryCFigure.length + 1; i++) {
        let sum = dailyInventoryCFigure.slice(-dailyInventoryCFigure.lenght, i).reduce((a , b) =>{
            return a + b
        })
        dailyInventoryCAccum.push(sum)
        sum = 0
    }
    dailyChart2(dailyChartLabel, dailyInventoryAAccum, dailyInventoryBAccum, dailyInventoryCAccum)
}

const monthlyBreakDown = (results) => {
    salesHist = results[0]
    // Monthlyラベル作り \\
    // salesから 
    for (let i = 0; i < results[0].length; i++) {
        salesMonthlyDates.push(results[0][i].date1.slice(0,7))
    }
    // monthlyChartLabel = [...new Set(salesMonthlyDates)]
    // monthlyChartLabel.sort()
    let salesSimsList2 = results[2]
    
     // salesSimsから \\
    for (let i = 0; i < salesSimsList2.length; i++) {
        salesSimsMonthlyDates.push(salesSimsList2[i].date1.slice(0,7))
    }

    let salesAndSalesSimsMonthlyDates = salesMonthlyDates.concat(salesSimsMonthlyDates)

    monthlyChartLabel = [...new Set(salesAndSalesSimsMonthlyDates)]
    monthlyChartLabel.sort()

    /// トランゼクションを月単位に分ける \\\
    monthList.forEach(transactionDate => {
        let monthlySalesTransactions = salesHist.filter((item, index) => {
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
    dailyChart3(monthlySalesFigure)
    dailyChart4(monthlyGrossProfitFigure)
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

newForm.addEventListener("submit", (e) => {
    let bicycleInfo = bicycleList.filter((bicycle, index) => {
        if(bicycle.id == parseInt(selectType.value)) return true;
    })
        let date1Plus2 = String (parseInt(transDay.value) + 2)
        const newTran = {
        date1: `${transYear.value}-${transMonth.value}-${transDay.value}`,
        date2: `${transYear.value}-${transMonth.value}-${date1Plus2}`,
        bicycle_id: selectType.value,
        qtysold: createTrans.value,
        valuesold: createTrans.value * bicycleInfo[0].uprice,
        costsold: createTrans.value * bicycleInfo[0].ucost,
        };
        API.createNewTrans(newTran)
        // API.createNewTrans(newTran).then((newTran) => renderSimTrans(newTran))
        // API.getData(SALESSIM_URL).then((json) => renderSimTrans(json))
  });

  //////////Render Simulated Transactions\\\\\\\\\\\\\\\\
const renderSimTrans  = (simTrans) => {
    transactionList.innerHTML = ""
    console.log(simTrans)
    for (tran of simTrans) {renderSimTran(tran)}
 }
 
 const renderSimTran = (tran) => {
     console.log(tran)
     const div = document.createElement("div")
     div.id = tran.id
     const li = document.createElement("li")
     li.innerText = `${tran.date1}: TranType - Sales, ProType - ${tran["bicycle"].bitype}, Quantity - ${tran.qtysold}, Amount - ${tran.valuesold}`
     const dBtn = document.createElement("button")
     dBtn.innerText = "Delete"
     dBtn.className = "button"
     dBtn.addEventListener("click", (e) => {
         deleteTran(div, li)
     })
     div.append(li, dBtn)
     transactionList.appendChild(div)
 }

 const deleteTran = (div, li) => {
    //back-end
    const id = div.id
    console.log(id)
    API.deleteSimTran(id)
    //front-end
    // li.parentNode.remove()
    reRender()
  }

  const reRender = () => {
    transactionList.innerHTML = ""
    myDailyChart1.destroy()
    myDailyChart2.destroy()
    // myDailyChart3.remove()
    // myDailyChart4.remove()
    // ctx4.parentNode.remove()
    setTimeout("API.getInitialDailyData(SALESSIM_URL, CASH_URL, BICYCLE_URL).then(results => createSalesSimsData(results))", 500)
  }

  let myDailyChart1, myDailyChart2, myDailyChart3, myDailyChart4

/// チャート\\\
const dailyChart3 = (monthlySalesFigure) => {
    myDailyChart3 = new Chart(ctx3, {
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
    myDailyChart4 = new Chart(ctx4, {
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

const dailyChart2 = (dailyChartLabel, dailyInventoryAAccum, dailyInventoryBAccum, dailyInventoryCAccum) => {
    myDailyChart2 =new Chart(ctx2, {
        type: 'line',
        data: {
            labels: dailyChartLabel,
            datasets: [{
                label: 'A',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dailyInventoryAAccum,
                lineTension: 0,
                fill: false
            }, {
                label: 'B',
                backgroundColor: 'rgb(10, 150, 190)',
                borderColor: 'rgb(10, 150, 190)',
                data: dailyInventoryBAccum,
                lineTension: 0,
                fill: false
            }  ,{
                label: 'C',
                backgroundColor: 'rgb(10, 150, 290)',
                borderColor: 'rgb(10, 150, 290)',
                data: dailyInventoryCAccum,
                lineTension: 0,
                fill: false
            }]
        }
    });
}

const dailyChart1 = (dailyChartLabel, dailySalesFigureChartData) => {
    myDailyChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: dailyChartLabel,
            datasets: [{
                label: 'Cash Balance',
                backgroundColor: 'rgb(10, 150, 190)',
                borderColor: 'rgb(10, 150, 190)',
                data: dailySalesFigureChartData,
                lineTension: 0,
                fill: false
            }]
        }
    });
}



