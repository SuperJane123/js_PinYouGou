$(()=>{
    // 计算购物车里面的商品总数属于多个页面都会用到的代码，提取到一个新的js里面
    // 读取本地数据里面的信息，计算出一个总数，修改购物车总的数量
    // 根据从本地数据中提取字符串

    let arr = kits.loadArray('shopCartData');
    let total = 0;
    // 直接算出总的数量设置个红色的泡泡
    arr.forEach(e => {
        total += e.number;
    });
    $('.count').text(total);
})