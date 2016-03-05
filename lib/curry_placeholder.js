"use strict";
var slice = Array.prototype.slice,
    isPlaceholder = require('./is_placeholder');


module.exports = function curryP(context, f, a){

    return function(){

        return curryP2(
            context, f, a, [], 0,
            f.length && !isPlaceholder(a[a.length - 1]) ? f.length : a.length,
            slice.call(arguments)
        );

    };

};



function curryP2(context, f, a, b, cursor, length, args){

    b = !args.length ? b : getArgs(a, b, args, cursor, length);

    if(b.length === length){
        return f.apply(context, b);
    }

    var curried = function(){

        return curryP2(context, f, a, b, b.length, length, slice.apply(arguments));

    };

    return curried;
}

function getArgs(a, b, args, cursor, length){
    if(cursor === length){
        return b;
    }

    do{

        if(args.length && isPlaceholder(a[cursor])){
            b[cursor] = args.shift();
        }else{
            b[cursor] = a[cursor];
        }

        if(!args.length) break;

    }while(++cursor < length);


    while(++cursor < length){
        if(isPlaceholder(a[cursor])){ break; }
        b[cursor] = a[cursor];
    }

    return b;
}


function copy(a){

    var b = [];
    b.length = a.length;

    for(var i=0; i<a.length; i++){
        b[i] = a[i];
    }

    return b;
}
