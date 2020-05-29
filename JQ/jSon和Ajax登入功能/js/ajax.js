var $ = {
    ajax:function(_options){
        var xhr = null,                     //XMLHttpRequst对象
        url = _options.url,                 //url地址
        method = _options.method || 'GET',  //传输方式，默认get
        async = typeof(_options.async) === "undefined"?true:_options.async;
        
        //判断游览器是否将XMLHttpRequest作为本地对象
        if(typeof XMLHttpRequest != "undefined"){
            xhr = new XMLHttpRequest();
        } else if (typeof ActiveXObject != "underfined"){
            var xhrArr = ['Microsoft.XMLHTTP',
                'MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP.2.0',];
            //遍历创建XMLHttpRequest对象
            var len = xhrArr.length;
            for(var i = 0 ; i < len ; i++){
                try{
                    xhr = new ActiveXObject(xhrArr[i]);
                    break;
                }
                catch(ex){   

                }
            }
        } else {
            throw new Error('No XHR object availabel');
        }
    }
}