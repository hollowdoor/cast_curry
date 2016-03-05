var slice;

if(!Function.prototype.bind){
    slice = function(){
        return Array.prototype.slice.apply(
            arguments[0],
            Array.prototype.slice.apply(arguments, 1));
    };
}else{
    var unboundSlice = Array.prototype.slice;
    slice = Function.prototype.apply.bind(unboundSlice);
}

module.exports = slice;
