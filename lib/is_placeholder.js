module.exports = function isPlaceholder(x){
    return x && x['@@functional/placeholder'] === true;
};
