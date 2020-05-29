// 直接在JS里面写CSS会造成重绘或者回流影响计算机性能
// $('.dropdown').hover(function(){
//     var $dropdown = $(this);

//     $dropdown.find('.dropdown-toggle').css({
//         'background-color':'#fff',
//         'border-color':'#cdd0d4'
//     });

//     $dropdown.find('.dropdown-arrow').css({
//         'background-image':'url(img/dropdown-arrow-active.png)'
//     });

//     $dropdown.find('.dropdown-layer').show();
// },function(){
//     var $dropdown = $(this);

//     $dropdown.find('.dropdown-toggle').css({
//         'background-color':'',
//         'border-color':'#f3f5f7'
//     });

//     $dropdown.find('.dropdown-arrow').css({
//         'background-image':'url(img/dropdown-arrow.png)'
//     });

//     $dropdown.find('.dropdown-layer').hide();
// });

//所以CSS样式的变动尽量在CSS里完成JS负责调动！！！
$('.dropdown').hover(function(){
    $(this).addClass('dropdown-active');
},function(){
    $(this).removeClass('dropdown-active');
});