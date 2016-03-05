var isPlaceholder = require('./is_placeholder');

module.exports = function hasPlaceholder(args){
    //{'@@functional/placeholder': true};
    for(var i=0; i<args.length; i++){
        if(isPlaceholder(args[i]))
            return true;
    }
    return false;
};
