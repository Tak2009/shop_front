
const masterMonthLabel = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]
const masterData1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
let label1 = []
let data1 = []
let data2 = []
let data3 = []
let movingAve = []
let startIndex = 15
let threshold　= [1,1,2,2,2,2,3,3,2,2,1,1]

label1 = masterMonthLabel.slice(startIndex - 12, startIndex)
data1 = masterData1.slice(startIndex - 12, startIndex)
data2 = masterData1.slice(startIndex - 12 - 1, startIndex - 1)
data3 = masterData1.slice(startIndex - 12 - 2, startIndex - 2)

// console.log(data1)
// console.log(data2)
// console.log(data3)


// function calcMovingAve(data1, data2, data3, movingAve){
//     let argCount = arguments.length - 1
//     for(i = 0; i < data1.length; i++){
//         console.log((data1[i] + data2[i] + data3[i])/argCount)
//         movingAve.push((data1[i] + data2[i] + data3[i])/argCount)
//     }
// }

// const calcMovingAve = (data1, data2, data3, movingAve) => {
//     let argCount = arguments.length - 1
//     for(i = 0; i < data1.length; i++){
//         console.log((data1[i] * data2[i] * data3[i])/argCount)
//         movingAve.push((data1[i] * data2[i] * data3[i])/argCount)
//     }
// }

// calcMovingAve(data1, data2, data3, movingAve)

///////////////////////////////


const ctx3 = document.getElementById('daily-chart3');
const ctx4 = document.getElementById('daily-chart4');

const todayDateElement = document.querySelector("#today")
const monthList = ["2021-01","2021-02","2021-03","2021-04"]
let salesHist
let transactionsGroupedByMonth = []
let costSoldGroupedByMonth = []
let monthlySalesFigure = []
let monthlyCOGSFigure = []
let monthlyGrossProfitFigure = []

window.onload = () => {
    let today =  new Date()
    let dd = ("0" + today.getDate()).slice(-2) //二桁表示にするため全てに０を先頭に足してお尻から二桁取得
    let mm = ("0" + (today.getMonth() + 1)).slice(-2)　//二桁表示にするため全てに０を先頭に足してお尻から二桁取得
    let yyyy = today.getFullYear()
    todayDate = `${dd}/${mm}/${yyyy}`
    todayDateElement.innerText = `Today is ${todayDate}`
}

  const dateFormat = (date) => {
    const year = date.slice(0,4)
    const month = date.slice(5,7)
    return `${month}-${year}`
  }

API.getSales().then(sales => monthlyBreakDown(sales))
// API.getSales().then(sales => console.log(sales))

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

console.log(monthlySalesFigure)
console.log(monthlyCOGSFigure)


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
