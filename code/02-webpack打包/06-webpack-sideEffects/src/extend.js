Number.prototype.pad = function(size){
    let result = this+''
    while(result.length < size){
        result = '0' + result
    }
    return result
}