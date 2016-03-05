cast-curry
==========

A hybrid curry, and partial function.

Curry, or partially apply a function.

Example
-------

```javascript
var curry = require('cast-curry');

function func(a, b, c){
    return a + b + c;
}

var f = curry(func, 'x');
//print xyz
console.log(f('y', 'z'));

```

If some parameters positioned more to the left aren't known yet then you can use a placeholder.

```javascript
var curry = require('cast-curry'),
    _ = require('cast-curry/__');

function func2(a, b, c, d){
    return a + b + c + d;
}

var part = curry(func2, _, 'x', _, 'z');
//print wxyz
console.log('part '+part('w', 'y'));
```

If the function you want to curry is variadic you can add a placeholder to the right if you know how many arguments you will need.

```javascript
var curry = require('cast-curry'),
    _ = require('cast-curry/__');

function greet(){
    var str = '';

    for(var i=0; i<arguments.length; i++){
        str += arguments[i];
    }

    return str;
}

var getGreeting = curry(greet, 'Hello ', _, _, _, _);
//print Hello how are you?
console.log(getGreeting('how ', 'are ')('you')('?'));
```

Variadic functions won't work correctly if you don't add a placeholder to the right.

```javascript
var getGreeting = curry(greet, 'Hello');
//This is an error.
console.log(getGreeting('how ', 'are ')('you')('?'));
```

this!
-----

You can pass a `this` context as the first argument to set the function's context.

If you do then set the function to curry to the second argument.

Here `push` is native. Like many native functions `push` doesn't have a `Function.length` property so you need to set a placeholder as the first `push` parameter.

```javascript
var array = [];

var push = curry(array, [].push, _);

//print 1
console.log(push('5'));

//print [ '5' ]
console.log(array);

//print 2
console.log(push('10'));

//print [ '5', '10' ]
console.log(array);
```

Warning!
--------

Objects, and arrays still have references to their data even when passed to a function.

So if you curry a function with a default parameter of array, or object later they can be altered. This means sometimes you might find you're data has changed unexpectedly.

This is ok if that's what you want, and you think you can keep track of that.

In many situations you probably don't want partial parameters to change.

For partial parameters use a deep `clone` function, or a library like Immutable.js to order to make your objects, or list types not changeable if you want to limit side effects.

About
-----

Curry functions, and make partials out of functions.

The placeholder parameter concept is taken from the really cool library Rambda.
