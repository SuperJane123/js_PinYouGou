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
    //console.log(obj)  //返回的是找到对应id号的该对象

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

    $('.preview-wrap').on('mouseout',e=>{
        // console.log(123)
        // $('.mask').css('display','none');
        // $('.big').hide();

    });






    // 获取增加按钮，注册点击事件
        $('.add').on('click',function(){
            // 获取当前的数量
            let old = parseInt($('.choose-number').val()); 
            //console.log(old)  //返回字符串
            // 数量增加
            old++;
            // 判断如果数量大于1时，把减少的禁止样式去掉
            if(old > 1){
                $('.reduce').removeClass('disabled');
            }

            // 在重新赋值给choose-number
            $('.choose-number').val(old);
        });
        



        // 获取减少按钮，注册点击事件
        $('.reduce').on('click',e=>{
            // 获取当前的数量
            let current = parseInt($('.choose-number').val()); 
            // console.log(current);
            // 判断当数量到1时，不能继续点击下去
            if(current ===1 ){
                return;
            };

            // 数量减少
            current--;
            // 当数量减少到1的时候，添加禁止样式
            if(current === 1){
                $('.reduce').addClass('disabled');
            };

            // 重新赋值给choose-number
            $('.choose-number').val(current);

        });




})


