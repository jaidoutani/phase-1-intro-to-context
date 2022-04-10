// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
// process an Array of Arrays into an Array of employee records createEmployeeRecords
// 1) creates two records 2) correctly assigns the first names 3) creates more than 2 records
function createEmployeeRecords(dataArrays) {
    ["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3]
    let newArray = []
    for (let i = 0; i < dataArrays.length; i++) {
        let employeeRecord = createEmployeeRecord(dataArrays[i])
        newArray.push(employeeRecord)
    }
    return newArray
}

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an 
// employee record and Date/Time String and returns the updated record
function createTimeInEvent(employeeRecord, dateStamp) {
    let hour = dateStamp.substring(11)
    let date = dateStamp.substring(0, 10)
    let timeInEventObj = {
        type: "TimeIn",
        hour: ~~hour,
        date: date
    }
    employeeRecord["timeInEvents"].push(timeInEventObj)
    return employeeRecord
}

// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an 
// employee record and Date/Time String and returns the updated record
function createTimeOutEvent(employeeRecord, dateStamp) {
    let hour = dateStamp.substring(11)
    let date = dateStamp.substring(0, 10)
    let timeOutEventObj = {
        type: "TimeOut",
        hour: ~~hour,
        date: date
    }
    employeeRecord["timeOutEvents"].push(timeOutEventObj)
    return employeeRecord
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// calculates that the employee worked 2 hours
function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeInEvents = employeeRecord["timeInEvents"]
    let timeOutEvents = employeeRecord["timeOutEvents"]
    for (let i = 0; i < timeInEvents.length; i++) {
        let dateIn = timeInEvents[i]["date"]
        if (dateIn === dateStamp) {
            let hoursWorked = (timeOutEvents[i]["hour"] - timeInEvents[i]["hour"]) / 100
            return hoursWorked
        }
    }
}

// wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// calculates that the employee earned 54 dollars
function wagesEarnedOnDate(employeeRecord, dateStamp) {
    let wagesEarned = hoursWorkedOnDate(employeeRecord, dateStamp)
    let payRate = employeeRecord["payPerHour"]
    return wagesEarned * payRate

}

// Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
// it aggregates all the dates' wages and adds them together
function allWagesFor(employeeRecord) {
    let timeInEvents = employeeRecord["timeInEvents"]
    let sum = 0
    for (let i = 0; i < timeInEvents.length; i++) {
        let wagesEarned = wagesEarnedOnDate(employeeRecord, timeInEvents[i]["date"])
        sum += wagesEarned
    }
    return sum
}

// Given an array of multiple employees
function calculatePayroll(employeeRecord) {
    let payRoll = []
    employeeRecord.forEach(e => {
        payRoll.push(allWagesFor(e))
    })
    return payRoll.reduce((pValue, cValue) => pValue + cValue)
}
