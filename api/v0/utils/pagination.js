const paginateResult = async (_Model, limit=10, page=1)=>{
    //Setting pagination constraint
    var startIndex = (page - 1)*limit;
    var endIndex = page * limit;

    const paginationInfo = {};
    if(endIndex < await _Model.countDocuments().exec()){
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

    return {paginationInfo, startIndex}
}