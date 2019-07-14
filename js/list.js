// 要在页面生成结构
$(() => {
    let html = '';
    // 遍历数据，在页面生成结构
    // phoneData.forEach(e => {
    //     console.log(e)
    //     html += `<li class="goods-list-item">
    //     <a href="detail.html?id=${e.pID}">
    //       <div class="item-img">
    //         <img src="upload/pro.jpg" alt="">
    //       </div>
    //       <div class="item-title">
    //         ${e.name};
    //       </div>
    //       <div class="item-price">
    //         <span class="now">¥6088</span> <s>￥6988</s>
    //       </div>
    //       <div class="sold">
    //         <span> 已售 <em>87% </em></span>
    //         <div class="scroll">
    //           <div class="per"></div>
    //         </div>
    //         <span>剩余<i>29</i>件</span>
    //       </div>
    //     </a>
    //     <a href="#" class="buy">
    //       查看详情
    //     </a>
    //   </li>`
    // });

    // // 因为页面没有结构，不怕覆盖。可以用最简单的方法来添加结构
    // $('.goods-list>ul').html(html);



    $(phoneData).each((i,e)=>{
        html += `<li class="goods-list-item">
        <a href="detail.html?id=${e.pID}">
          <div class="item-img">
            <img src="${e.imgSrc}" alt="">
          </div>
          <div class="item-title">
            ${e.name}
          </div>
          <div class="item-price">
            <span class="now">¥${e.price}</span> 
          </div>
          <div class="sold">
            <span> 已售 <em>${e.percent}% </em></span>
            <div class="scroll">
              <div class="per" style="width:${e.percent}%"></div>
            </div>
            <span>剩余<i>${e.left}</i>件</span>
          </div>
        </a>
        <a href="#" class="buy">
          查看详情
        </a>
      </li>`
    });

    $('.goods-list>ul').html(html);
}); 
        
