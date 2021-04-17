
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

function calcMovingAve(data1, data2, data3, movingAve){
    let argCount = arguments.length - 1
    for(i = 0; i < data1.length; i++){
        console.log((data1[i] + data2[i] + data3[i])/argCount)
        movingAve.push((data1[i] + data2[i] + data3[i])/argCount)
    }
}

// const calcMovingAve = (data1, data2, data3, movingAve) => {
//     let argCount = arguments.length - 1
//     for(i = 0; i < data1.length; i++){
//         console.log((data1[i] * data2[i] * data3[i])/argCount)
//         movingAve.push((data1[i] * data2[i] * data3[i])/argCount)
//     }
// }

calcMovingAve(data1, data2, data3, movingAve)