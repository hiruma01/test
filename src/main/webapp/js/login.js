$(function () {
    //ajax,前后端数据传递
    $("#btn").click(function () {
        var obj={username:$("#username").val(),password:$("#password").val()};
        $.ajax({
            url:"/login.do",
            type:"post",
            dataType:"json",
            data:obj,
            success:function (result) {
                if(result==null){
                    alert("用户名或密码错误");
                }else{
                    window.location.href="adminhotel.html";

                }
            }
        });
    });
});








