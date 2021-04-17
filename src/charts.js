
const ctx1 = document.getElementById('daily-chart1');
const ctx2 = document.getElementById('daily-chart2');



const dailyChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: label1,
        datasets: [{
            label: '閾値上限',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: threshold,
            lineTension: 0,
            fill: false
        }, {
            label: '有害物質の推移',
            backgroundColor: 'rgb(10, 150, 190)',
            borderColor: 'rgb(10, 150, 190)',
            data: data1,
            lineTension: 0,
            fill: false
        }]
    }
    });

    const dailyChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: label1,
            datasets: [{
                label: '閾値下限',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: threshold,
                lineTension: 0,
                fill: false
            }, {
                label: '有害物質の推移（３日移動平均）',
                backgroundColor: 'rgb(10, 150, 190)',
                borderColor: 'rgb(10, 150, 190)',
                data: data1,
                lineTension: 0,
                fill: false
            }]
        }
        });

// const dailyChart3 = new Chart(ctx3, {
//     type: 'bar',
//     data: {
//         labels: monthList,
//         datasets: [{
//             label: 'Monthly Sales',
//             data: monthlyFigure,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     }
// })



