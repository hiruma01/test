
$(function(){
    //表单验证
    $("#register").bootstrapValidator({
        // 通用的错误提示语
        //message:"该字段无需验证",
        // 指定验证后验证字段的提示字体图标
        feedbackIcons: {
            // Bootstrap 版本 >= 3.1.0
            //  验证通过的输入框状态
            valid: 'glyphicon glyphicon-ok',
            //  验证失败的输入框状态
            invalid: 'glyphicon glyphicon-remove',
            // 验证中的状态
            validating: 'glyphicon glyphicon-refresh'
        },
        /**
         * 需要验证的输入框 注意跟input的name属性的名字一样
         */
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 3,
                        max: 8,
                        message: "用户名长度必须是3-8位"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]\w{7,15}$/,
                        message: "密码必须以字母开头长度为8-16位"
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: "邮箱不能为空"
                    },
                    regexp: {
                        regexp: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                        message: "不符合邮箱格式"
                    }
                }
            }
        },
        file: {
            validators: {
                notEmpty: {
                    message: "请上传图片"
                }
            }
        },
        phone: {
            validators: {
                notEmpty: {
                    message: "电话不能为空"
                },
                regexp: {
                    regexp: /^1\d{10}$/,
                    message: "不符合电话格式"
                }
            }
        }
    });

    //注册

    //验证用户名是否已被注册
    $("#username").blur(function () {
        $.ajax({
            url:"/stuIsExist.do",
            type:"post",
            dataType:"json",
            data:{"username":$("#username").val()},
            success:function (result) {
                //alert(user);
                if(result!=null){
                    alert("用户名已被注册");
                }else{
                    alert("用户名可用");
                }
            }
        })
    });

    //ajax,前后端数据传递
    $("#pic_btn").click(function () {
        var type = "file";
        var formData = new FormData();
        formData.append(type,$("#file")[0].files[0]);
        $.ajax({
            url:"/upload.do",
            type:"post",
            //dataType:"json",
            data:formData ,
            processData : false,
            contentType : false,
            success:function (result) {
                $("#pic").text(result.name);
            }
        })
    });

    $("#btn").click(function () {
        var obj={username:$("#username").val(),password:$("#password").val(),email:$("#email").val(),
            sex:$("input[type='radio']:checked").val(),birthday:$("#birthday").val(),phone:$("#phone").val(),pic:$("#pic").text()};
        $.ajax({
            url:"/register.do",
            type:"post",
            dataType:"json",
            data:obj,
            success:function (result) {
                if(result!=null){
                    window.location.href="search.html";
                }else{
                    alert("注册有误")
                }
            }
        });
    });




    //验证码
    var show_num = [];
    draw(show_num);

    $("#canvas").on('click',function(){
        draw(show_num);
    });
    $("#btn").on('click',function(){
        var val = $(".input-val").val().toLowerCase();
        var num = show_num.join("");
        if(val==''){
            alert('请输入验证码！');
        }else if(val == num){
            $(".input-val").val('');
            draw(show_num);

        }else{
            alert('验证码错误！请重新输入！');
            $(".input-val").val('');
            draw(show_num);
        }
    });


    //画验证码
    function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度

        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }
   //编辑验证码颜色
    function randomColor() {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

});

/* threshold: 2,//有2字符以上才发送ajax请求
            remote: {//ajax验证。
                url: "/register.do",
                message: '用户名已存在,请重新输入',
                delay: 500,//ajax刷新的时间是1秒一次
                type: 'POST',
                data: function (validator) {
                    return {
                        userName: $("input[name=username]").val(),
                        method: "stuIsExist"//
                    };
                }
            },*/











