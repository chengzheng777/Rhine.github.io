// 声明全局变量
var index = 0, //当前显示图片索引为0,
    main = byId("main")  
    prev = byId("prev"),  //上一张
    next = byId("next"),  //下一张
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    banner = byId("banner"),
    menuContent = byId("menu-content"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    timer = null,  //时间
    size = pics.length;

//封装getElemenById（）
function byId(id){
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

/*封装通用时间绑定方法
    element 绑定时间的DOM元素
    事件名
    事件处理程序
*/
function addHandler(element,type,handler){
    //非IE游览器
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
        //IE-DOM2级
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
        //IE-DOM0
    }else{
        element["on"+type] = handler;
    }
}

//函数封装-切换图片
function changeImg(){
    //遍历所有图片，将图片隐藏，将圆点上的类清除
    for(var i = 0 ; i < size ; i++ ){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    //显示当前图片
    pics[index].style.display = "block";
    //当前圆点高亮显示
    dots[index].className = "active";
}

//封装自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index >= size) index = 0;
        console.log(index);
        changeImg();
    },2500)
}



//点击下一显示下一张图片
addHandler(next,"click",function(){
    index++;
    if(index >= 3) index = 0;
    changeImg();
})

//点击一显示上一张图片
addHandler(prev,"click",function(){
    index--;
    if(index < 0) index = size-1;
    changeImg();
})

//点击圆点索引切换图片
for(var d = 0 ; d < size ; d++){
    dots[d].setAttribute("data-id",d);
    addHandler(dots[d],"click",function(){
        index = this.getAttribute("data-id");
        changeImg();
        
    })
}

//鼠标滑过主菜单
 for(var m = 0 , idx , mlen = menuItems.length ; m<mlen ; m++ ){ 
    //给所有主菜单添加一个索引，标明它的索引
    menuItems[m].setAttribute("data-index",m);   
    addHandler(menuItems[m],"mouseover",function(){
        //显示子菜单所在的背景
        subMenu.className = "sub-menu";    
        //获取当前主菜单的索引
        idx = this.getAttribute("data-index");
        //遍历所有子菜单innerbox，将它们隐藏
        for(var j = 0 , jlen = innerBox.length ; j < jlen ; j++ ){
            //隐藏所有子菜单
            innerBox[j].style.display = "none";
            //所有主菜单取消背景
            menuItems[j].style.background = "none";
        }
        //找到当前子菜单并且显示出来
        innerBox[idx].style.display = "block";
        //主菜单背景黑
        menuItems[idx].style.background = "rgba(0,0,0,0.1)";
    })
 }





//自动开启轮播
startAutoPlay();

// //鼠标离开banner，隐藏子菜单
// addHandler(banner,"mouseout",function(){
//     subMenu.className = "sub-menu hide";
// })

//鼠标离开主菜单menuConent，隐藏子菜单
addHandler(menuContent,"mouseout",function(){
    subMenu.className = "sub-menu hide";
})

//鼠标滑入子菜单时，子菜单显示
addHandler(subMenu,"mouseover",function(){
    this.className = "sub-menu"
})
//鼠标离开子菜单，隐藏子菜单
addHandler(subMenu,"mouseout",function(){
    this.className = "sub-menu hide"
})

//鼠标划入main，停止轮播
addHandler(main,"mouseover",stopAutoPlay);

//鼠标离开main，开始轮播
addHandler(main,"mouseout",startAutoPlay);

//清楚定时器，停止自动轮播
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

 






