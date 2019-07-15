let kits = {};

// 封装一个可以获取数组的犯法
kits.loadArray = function(key){
    let str = localStorage.getItem(key);
    let arr;
    if(str ===null){
        arr =[];
    }else{
        arr = JSON.parse(str);
    }
    return arr;
}