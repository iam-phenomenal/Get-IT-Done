const paginateResult = async (_Model,startIndex, endIndex, limit=10, page=1)=>{
    //Setting pagination constraint
    const paginationInfo = {};
    if(endIndex < await _Model.length){
        paginationInfo.next = {
            page: page + 1,
            limit: limit
        }
    }
    if(startIndex > 0){
        paginationInfo.previous = {
            page: page - 1,
            limit: limit
        }
    }
    return paginationInfo
}

module.exports = {paginateResult}