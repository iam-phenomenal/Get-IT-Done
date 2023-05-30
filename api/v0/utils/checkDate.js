const dateChecker = (date)=>{
    const currentDate = new Date();
    date = new Date(date);
    if(date <= currentDate) return false
    return true
}

module.exports = {dateChecker}