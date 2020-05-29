function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}

var a = Foo();
a();
a();
 
console.log(i);