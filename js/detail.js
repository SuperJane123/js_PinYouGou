$(() => {
    // 现在要更改产品详情部分的信息，要修改到对应的图片信息，可以根据浏览器地址栏目的id号来对应
    // 获取id号,浏览器的地址是location管理的，search是管理id后面的部分
    let id = parseInt(location.search.substring(4));
    //console.log(id); //获取的是字符串,转换成数字方便后面做判断
    // 根据获取到的id遍历数组，用查找的方式找到和数组里产品对应的ID号，然后更改信息

    let obj = phoneData.find(e => {
        //console.log(e.pID)
        return e.pID === id;
    });
    console.log(obj)  //返回的是找到对应id号的该对象

    $('.sku-name').text(obj.name);
    $('.summary-price em').text('¥' + obj.price);
    $('.preview-img>img').attr('src', obj.imgSrc);


    //    获取小图区元素，注册鼠标移动事件
    let img = document.querySelector('.preview-wrap');
    let maskWidht = $('.mask').width();
    // console.log(maskWidht)
    $('.preview-img').on('mouseover', e => {
        // console.log(e);
        // 黄色遮罩显示
        // $('.mask').show();
        $('.preview-wrap').on('mousemove', function (e) {
            let x = e.pageX;
            let y = e.pageY;
            let offsetLeft = img.offsetLeft;
            let offsettop = img.offsetTop;
            // console.log(offsettop);
            // console.log(offsetLeft);
            let halfWidht = maskWidht / 2;
            let halfHeight = maskWidht / 2;
            let maskX = x - halfWidht - offsetLeft;
            let maskY = y - halfHeight - offsettop;


            // let x = e.pageX;
            // let y = e.pageY;
            $('.mask').css('left', maskX);
            $('.mask').css('top', maskY);

        });

    });

    $('.preview-wrap').on('mouseout', e => {
        // console.log(123)
        // $('.mask').css('display','none');
        // $('.big').hide();

    });






    // 获取增加按钮，注册点击事件
    $('.add').on('click', function () {
        // 获取当前的数量
        let old = parseInt($('.choose-number').val());
        //console.log(old)  //返回字符串
        // 数量增加
        old++;
        // 判断如果数量大于1时，把减少的禁止样式去掉
        if (old > 1) {
            $('.reduce').removeClass('disabled');
        }

        // 在重新赋值给choose-number
        $('.choose-number').val(old);
    });




    // 获取减少按钮，注册点击事件
    $('.reduce').on('click', e => {
        // 获取当前的数量
        let current = parseInt($('.choose-number').val());
        // console.log(current);
        // 判断当数量到1时，不能继续点击下去
        if (current === 1) {
            return;
        };

        // 数量减少
        current--;
        // 当数量减少到1的时候，添加禁止样式
        if (current === 1) {
            $('.reduce').addClass('disabled');
        };

        // 重新赋值给choose-number
        $('.choose-number').val(current);

    });

    /*现在要做的是把需要的数据储存到本地数据里面，
数据是在点击加入购物车的时候就要储存的
储存的数据有：图片，名称，单价，数量*/
    // 获取数量
    let number = parseInt($('.choose-number').val());


    // 获取加入购物车按钮，注册点击事件
    $('.addshopcar').on('click', e => {
        // 首先先读取本地数据，实现新旧数据叠加
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;

        if (jsonStr === null) {
            arr = [];
        } else {
            arr = JSON.parse(jsonStr);
        };
        //   console.log(arr)


        // 发现，重复点击后，相同的产品都分别保存在一个数组里，这样不太好，最好是实现重复的产品能够累积叠加在一起。用id来判断，如果是相同的id，就把产品叠加

        // find查找，如果找到该元素，就会执行返回该元素，如果没有则返回underfind
        let isExist = arr.find(e => {
            e.pID === id;
        });
        // console.log(isExist);
        // 返回的如果不是underfind那就让数量增加
        if (isExist !== undefined) {
            isExist.number += number;
        } else {   //否则就新建一个对象
            let goods = {
                pID: obj.pID,
                imgSrc: obj.imgSrc,
                name: obj.name,
                price: obj.price,
                number: number,

            };
            arr.push(goods);
        };

        // 再把数据储存到locationstroage里面
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        
        // 跳转到购物车的页面
        location.href = 'cart.html'

    });






})


