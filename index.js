"use strict";
var curryWithPlaceholder = require('./lib/curry_placeholder'),
    hasPlaceholder = require('./lib/has_placeholder'),
    slice = Array.prototype.slice;

/*
git remote add origin https://github.com/hollowdoor/cast_curry.git
git push -u origin master
*/

module.exports = cast_curry;


function cast_curry(f){

    var a, context = this || null,
        length = f.length;

    if(typeof f === 'function'){
        a = arguments.length === 1 ? [] : slice.call(arguments, 1);
    }else{
        context = f;
        f = arguments[1];
        a = arguments.length === 2 ? [] : slice.call(arguments, 2);
    }


    var curried = hasPlaceholder(a)
        ? curryWithPlaceholder(context, f, a, [], 0, length)
        : function(){

            if(a.length + arguments.length !== length){

                return cast_curry.apply(context || this, (
                            ! arguments.length
                            ? [f].concat(a)
                            : [f].concat(a.concat(slice.call(arguments)))
                        )

                );
            }

            return (
                ! a.length
                ? (
                      arguments.length === 1
                    ? f.call(context || this, arguments[0])
                    : f.apply(context || this, arguments)
                )
                : f.apply(context || this, (
                        ! arguments.length
                        ? a
                        : a.concat(slice.call(arguments))
                    )
                )
            );

        };

    return curried;

}



//Try this.
//var map = curry(function(f, o){ return o.map(f); })
