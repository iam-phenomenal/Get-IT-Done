const createError = (errorCode, errorMessage)=>{
    const error = new Error(errorMessage)
    error.status = errorCode
    return error
}

module.exports = {createError}