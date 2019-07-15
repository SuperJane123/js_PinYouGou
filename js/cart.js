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
                if (id === e.pID) {   //如果有对应的id，就把数量叠加
                    totalCount += e.number;
                    totalMoney += e.price * e.number;   //把价格叠加
                };
            });
        });
        // console.log(totalCount)
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }

    computedTotal();


    // 获取全选框，注册点击事件
    $('.pick-all').on('click', function () {
        // 获取选中的状态
        let status = $(this).prop('checked');
        //  再把每个单选框都设置成选中中状态
        $('.item-ck').prop('checked', status);
        //  因为前后有两个全选框按钮，需要把两个状态都设置成一样
        $('.pick-all').prop('checked', status);

        //  价格重新计算
        computedTotal();

    });


    // 获取单选框按钮，因为结构是动态生成的，最好使用事件委托来做，注册点击事件
    $('.item-list').on('click', '.item-ck', function () {
        // 获取单选框全选中的状态，单选框选中的数量input：checked === 总数量
        let isAll = $('.item-ck').length === $('.item-ck:checked').length
        //console.log(isAll);
        $('.pick-all').prop('checked', isAll);

        computedTotal();

    });





    // 获取增加按钮,利用事件委托，注册点击事件
    $('.item-list').on('click', '.add', function () {
        // console.log(12)
        // console.log(id);
        // 获取当前每列产品的数量
        let oldVal = parseInt($(this).siblings('input').val());
        // 点击的该产品数量增加
        oldVal++;
        // console.log(oldVal)
        // 如果数量大于1时，把减少的禁止样式去掉
        if (oldVal > 1) {
            $(this).siblings('.reduce').removeClass('disabled')
        }

        // 还要数量赋值回去
        $(this).siblings('input').val(oldVal);
        // 获取id
        let id = parseInt($(this).parents('.item').attr('data-id'))
        let obj = arr.find(e => {
            return e.pID === id
        });

        obj.number = oldVal;
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData',jsonStr);

        // 计算小计栏目的总价
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);

        // 下面的总价和总数量重新计算
        computedTotal();


    });



    // 获取减少按钮，利用事件委托，注册点击事件
    $('.item-list').on('click', '.reduce', function () {
        // console.log(234)
        // 获取当前的数量
        let oldVal = parseInt($(this).siblings('.number').val());
        // 数量等于1时，禁止继续往下点
        if (oldVal === 1) {
            return;
        };
        // 数量减少
        oldVal--;
        // 数量等于1时，添加禁止样式
        if (oldVal === 1) {
            $(this).addClass('disabled');

        };

        // 把数量重新赋值
        $(this).siblings('input').val(oldVal);

        // 获取id
        let id = parseInt($(this).parents('.item').attr('data-id'));
        // 用find来查找，找到相对的ID
        let obj = arr.find(e => {
            return e.pID === id;
        });
        // console.log(obj)
        obj.number = oldVal;
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData',jsonStr);


        // 重新计算小计的价格
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);

        // 下面的总价和总数量重新计算
        computedTotal();

    });




    //  获取删除元素，利用事件委托，注册点击事件
    $('.item-list').on('click', '.item-del', function () {

        // 先保存移除的这个this
        let _this = this;
        $("#dialog-confirm").dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "确认": function () {
                    $(this).dialog("close");
                    $(_this).parents('.item').remove();
                    // 还要删除本地数据里面的信息
                    let id = parseInt($(_this).parents('.item').attr('data-id'));
                    let index = arr.findIndex(e => {
                        return e.pID === id;
                    });
                    // console.log(index)
                    arr.splice(index, 1);
                    // 重新计算价格
                    computedTotal();


                    // 再把数据储存到localtroage里面
                    let jsonStr = JSON.stringify(arr);
                    localStorage.setItem('shopCartData', jsonStr);
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });

    });


});