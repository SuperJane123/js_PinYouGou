$(() => {
    // 读取数据，在页面生成结构
    let jsonStr = localStorage.getItem('shopCartData');
    let arr;
    if (jsonStr !== null) {
        arr = JSON.parse(jsonStr);
        let html = '';
        arr.forEach(e => {
            html += `<div class="item" data-id="${e.pID}">
          <div class="row">
            <div class="cell col-1 row">
              <div class="cell col-1">
                <input type="checkbox" class="item-ck" checked="">
              </div>
              <div class="cell col-4">
                <img src="${e.imgSrc}" alt="">
              </div>
            </div>
            <div class="cell col-4 row">
              <div class="item-name"> ${e.name}</div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="price">${e.price}</em>
            </div>
            <div class="cell col-1 tc lh70">
              <div class="item-count">
                <a href="javascript:void(0);" class="reduce fl">-</a>
                <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                <a href="javascript:void(0);" class="add fl">+</a>
              </div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="computed">${e.price * e.number}</em>
            </div>
            <div class="cell col-1">
              <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
            </div>
          </div>
        </div> `

            // 如果不是空数据，把空空入也文字去掉
            $('.empty-tip').hide();
            // 把购物车表头显示出来
            $('.cart-header').show();
            // 把结算栏显示出来
            $('.total-of').show();
        });
        // 把数据添加到购物车页面
        $('.item-list').html(html);

    };

    // 计算总和和总数量
    function computedTotal() {
        let totalCount = 0;
        let totalMoney = 0;
        // 在选中的产品里面遍历，找到相对应的id
        $(".item-list input[type=checkbox]:checked").each((i, e) => {
            // 获取ID
            let id = parseInt($(e).parents('.item').attr('data-id'));
            // console.log(id)

            // 遍历数组，找到相对应的id
            arr.forEach(e => {
                if (e.pID === id) {   //如果有对应的id，就把数量叠加
                    totalCount += e.number;
                    // totalMoney += e.price * e.number;   把价格叠加
                };
            });
        });

        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }

    computedTotal();



    

});