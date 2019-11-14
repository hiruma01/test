//1.页面加载完成之后发送Ajax请求，要到分页数据

$(function () {
    var totalRecord, currentPage;
    //显示第一页
    to_page(1);
    //添加学生信息
    addHotel();
    // 修改酒店信息
    updateHotel();
    //删除酒店信息
    deleteHotel();
    //批量删除
    deleteSomeHotel();
    //选择框显示
    displayCheck();
    //图片增加修改
    pic();
    //条件查询
    search();
    $("#firstpage-btn").click(function () {
        to_page(1);
    })


    function to_page(pageNo) {
        //每次刷新都令全选按钮重置
        $("#check_all").prop("checked", false);
        //重置条件查询表格
        $("#search-form")[0].reset();
        $.ajax({
            url: "/hotel.do",
            data: "pageNo=" + pageNo,
            type: "GET",
            success: function (result) {
                //1.解析并显示学生信息数据
                build_hotel_table(result);
                //解析显示分页导航条
                build_page_info(result);
                //3.解析并显示分页条数据
                build_page_nav(result);
            }
        })
    }

    //解析并显示酒店数据表
    function build_hotel_table(result) {
        //清空table表格
        $("#hotel_table tbody").empty();
        var hotelList = result.list;
        //遍历元素hotelList
        $.each(hotelList, function (index, item) {
            var checkBox = $("<td><input type='checkbox' class='check_item'/></td>");
            var hotelid = $("<td></td>").append(item.hotelid);
            var hotelname = $("<td></td>").append(item.hotelname);
            var introduction = $("<td></td>").append(item.introduction);
            var address = $("<td></td>").append(item.address);
            var phone = $("<td></td>").append(item.phone);
            var img =  $("<img width='200' height='180'>").attr("src",item.pic);
            var  pictext = $("<input type='text'>").val(item.pic).hide();
            var pic = $("<td></td>").append(img).append(pictext);
            var score = $("<td></td>").append(item.score);
            var price = $("<td></td>").append(item.price);
            var kind = $("<td></td>").append(item.kind);
            var service = $("<td></td>").append(item.service);

            //客户不要增删改
            var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("编辑");
            var button2 = $("<button></button>").addClass("tn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
            var button3 = $("<button></button>").addClass("btn btn-primary btn-sm pic_modal_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("图片");
            var td_btn = $("<td></td>").append(button1).append(" ").append(button2).append(" ").append(button3);

            $("<tr></tr>").append(checkBox).append(hotelid).append(hotelname).append(introduction).append(address).append(phone).append(pic)
                .append(score).append(price).append(kind).append(service).append(td_btn).appendTo("#hotel_table tbody");

            //这个是客户模式的
            /*    $("<tr></tr>").append(checkBox).append(hotelid).append(hotelname).append(introduction).append(address).append(phone).append(pic)
                    .append(score).append(price).append(kind).append(service).appendTo("#hotel_table tbody");*/
        })
    }

    //解析显示分页信息
    function build_page_info(result) {
        $("#page_info_area").empty();
        $("#page_info_area").append("当前" + result.pageNum + "页,总共" + result.pages +
            "页，总共" + result.total + "条记录");
        totalRecord = result.total;
        currentPage = result.pageNum;
    }

    function build_page_nav(result) {
        $("#page_nav_area").empty();
        var ul = $("<ul></ul>").addClass("pagination");
        var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href", "#"));
        var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;").attr("href", "#"));
        var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;").attr("href", "#"));
        var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href", "#"));
        if (result.hasPreviousPage == false) {
            firstPageLi.addClass("disabled");
            prePageLi.addClass("disabled");
        } else {
            firstPageLi.click(function () {
                to_page(1);
            });
            prePageLi.click(function () {
                to_page(result.pageNum - 1);
            });
        }
        if (result.hasNextPage == false) {
            nextPageLi.addClass("disabled");
            lastPageLi.addClass("disabled");
        } else {
            //构建点击事件

            nextPageLi.click(function () {
                to_page(result.pageNum + 1);
            });
            lastPageLi.click(function () {
                to_page(result.lastPage);
            })
        }
        //添加首页和前一页
        ul.append(firstPageLi).append(prePageLi);
        //遍历添加页码
        $.each(result.navigatepageNums, function (index, item) {
            var numLi = $("<li></li>").append($("<a></a>").append(item).attr("href", "#"));
            //如果是当前选中页面，添加active标识
            if (result.pageNum == item) {
                numLi.addClass("active");
            }
            //给每个页码添加点击就跳转
            numLi.click(function () {
                to_page(item);
            });
            ul.append(numLi);
        })
        //添加下一页和末页
        ul.append(nextPageLi).append(lastPageLi);
        var navEle = $("<nav></nav>").append(ul);
        navEle.appendTo("#page_nav_area");
    }


    /**
     * 2.实现新增功能
     * @returns {boolean}
     */
    function addHotel() {

        //为新增按钮添加modal
        $("#hotel_add_modal_btn").click(function () {
            //清除表单数据
            $("#hotelAddModal form")[0].reset();
            $("#name_add_input").next("span").text("");
            //
            $("#hotelAddModal").modal({
                backdrop: "static"
            })
        });


        //保存酒店信息
        $("#hotel_save_btn").click(function () {
            //先校验表单信息
            /*if (!validate_form( $("#name_add_input"))) {
                return false;
            }*/
            if (!validate_form($("#hotelAddModal"))) {
                return false;
            }

            //2.发送ajax请求保存酒店信息
            $.ajax({
                url: "/hotel.do",
                type: "POST",
                data: $("#hotelAddModal form").serialize(),
                success: function (result) {
                    //学生信息保存成功(后端校验)
                    if (result.code == 100) {
                        //1.关闭modal框
                        $("#hotelAddModal").modal('hide');
                        //2.来到最后一页，显示刚才保存的数据
                        to_page(totalRecord);
                    } else {
                        //显示失败信息(后端校验)
                        if (result.extend.errorFields.username != undefined) {
                            show_validate_msg($("#name_add_input"), "error", result.extend.errorFields.username);
                        }


                    }

                }
            });
        });

    }

    //校验表单信息是否满足正则要求
    function validate_form(Name_ele) {
        //1.拿到要校验的数据，使用正则表达式
        //校验姓名
        /* var userName = Name_ele.val();*/
        var jqname = Name_ele.find("#name_add_input");
        var userName = jqname.val();
        //|(^[\u2E80-\u9FFF]{2,5})
        var regName = /^[a-zA-Z0-9\u2E80-\u9FFF]{2,16}$/;
        //如果验证失败
        if (!regName.test(userName)) {
            show_validate_msg(jqname, "error", "名称为2-16位中英文、数字");
            return false;
        } else {
            show_validate_msg(jqname, "success", "");
        }

        //校验地址
        var jqIntroduction = Name_ele.find("#introduction_add_input");
        var introduction = jqIntroduction.val();
        if (introduction = null || introduction == "") {
            show_validate_msg(jqIntroduction, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqIntroduction, "success", "");
        }

        //校验地址
        var jqAddress = Name_ele.find("#address_add_input");
        var address = jqAddress.val();
        if (address = null || address == "") {
            show_validate_msg(jqAddress, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqAddress, "success", "");
        }

        //校验简介
        var jqPhone = Name_ele.find("#phone_add_input");
        var phone = jqPhone.val();
        if (phone = null || phone == "") {
            show_validate_msg(jqPhone, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqPhone, "success", "");
        }

        //校验图片
        var jqPic = Name_ele.find("#pic_add_input");
        var pic = jqPic.val();
        if (pic = null || pic == "") {
            show_validate_msg(jqPic, "error", "请输入图片相对路径，不能为空，若有没有，请填'*'");
            return false;
        } else {
            show_validate_msg(jqPic, "success", "");
        }

        //校验简介
        var jqScore = Name_ele.find("#score_add_input");
        var score = jqScore.val();
        var regScore = /^\d{1,}$/;
        if (!regScore.test(score)) {
            show_validate_msg(jqScore, "error", "输入非法");
            return false;
        } else {
            show_validate_msg(jqScore, "success", "");
        }

        //校验价格
        var jqPrice = Name_ele.find("#price_add_input");
        var price = jqPrice.val();
        var regPrice = /^(\-|\+)?\d+(\.\d+)?$/;
        if (!regPrice.test(price)) {
            show_validate_msg(jqPrice, "error", "输入非法");
            return false;
        } else {
            show_validate_msg(jqPrice, "success", "");
        }

        return true;
    }

    //显示校验提示信息
    function show_validate_msg(ele, status, msg) {
        //清除当前元素校验状态
        $(ele).parent().removeClass("has-error has-success");
        $(ele).next("span").text("");
        if (status == "error") {
            ele.parent().addClass("has-error");
            ele.next("span").text(msg);
        } else if (status == "success") {
            ele.parent().addClass("has-success");
            ele.next("span").text(msg);
        }

    }

    //校验编辑表单信息是否满足正则要求
    function validate_form_update(Name_ele) {
        //1.拿到要校验的数据，使用正则表达式
        //校验姓名
        /* var userName = Name_ele.val();*/
        var jqname = Name_ele.find("#name_update_input");
        var userName = jqname.val();
        //|(^[\u2E80-\u9FFF]{2,5})
        var regName = /^[a-zA-Z0-9\u2E80-\u9FFF]{2,16}$/;
        //如果验证失败
        if (!regName.test(userName)) {
            show_validate_msg(jqname, "error", "名称为2-16位中英文、数字");
            return false;
        } else {
            show_validate_msg(jqname, "success", "");
        }

        //校验地址
        var jqIntroduction = Name_ele.find("#introduction_update_input");
        var introduction = jqIntroduction.val();
        if (introduction = null || introduction == "") {
            show_validate_msg(jqIntroduction, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqIntroduction, "success", "");
        }

        //校验地址
        var jqAddress = Name_ele.find("#address_update_input");
        var address = jqAddress.val();
        if (address = null || address == "") {
            show_validate_msg(jqAddress, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqAddress, "success", "");
        }

        //校验简介
        var jqPhone = Name_ele.find("#phone_update_input");
        var phone = jqPhone.val();
        if (phone = null || phone == "") {
            show_validate_msg(jqPhone, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqPhone, "success", "");
        }

        /*//校验图片
        var jqPic = Name_ele.find("#pic_update_input");
        var pic = jqPic.val();
        if (pic = null || pic == "") {
            show_validate_msg(jqPic, "error", "不能为空");
            return false;
        } else {
            show_validate_msg(jqPic, "success", "");
        }*/

        //校验简介
        var jqScore = Name_ele.find("#score_update_input");
        var score = jqScore.val();
        var regScore = /^\d{1,}$/;
        if (!regScore.test(score)) {
            show_validate_msg(jqScore, "error", "输入非法");
            return false;
        } else {
            show_validate_msg(jqScore, "success", "");
        }

        //校验价格
        var jqPrice = Name_ele.find("#price_update_input");
        var price = jqPrice.val();
        var regPrice = /^(\-|\+)?\d+(\.\d+)?$/;
        if (!regPrice.test(price)) {
            show_validate_msg(jqPrice, "error", "输入非法");
            return false;
        } else {
            show_validate_msg(jqPrice, "success", "");
        }

        return true;
    }


    /**
     * 3.修改酒店信息
     */
    function updateHotel() {
        //为编辑按钮绑定弹出modal框事件
        //1.因为在按钮创建之前就绑定了click，所以用普通click方法绑定不上

        $(document).on("click", ".edit_btn", function () {
            //清除表单数据
            $("#hotelUpdateModal form")[0].reset();
            $("#name_update_input").next("span").text("");

            //修改框酒店信息回显
            var hotelid = $(this).parent().parent().children("td").eq(1).text();
            //将id的值传递给修改按钮的属性，方便发送Ajax请求
            $("#hotel_update_btn").attr("edit-id", hotelid);
            var hotelname = $(this).parent().parent().children("td").eq(2).text();
            var introduction = $(this).parent().parent().children("td").eq(3).text();
            var address = $(this).parent().parent().children("td").eq(4).text();
            var phone = $(this).parent().parent().children("td").eq(5).text();
            var pic = $(this).parent().parent().children("td").eq(6).children("input").val();
            var score = $(this).parent().parent().children("td").eq(7).text();
            var price = $(this).parent().parent().children("td").eq(8).text();
            var kind = $(this).parent().parent().children("td").eq(9).text();
            var service = $(this).parent().parent().children("td").eq(10).text();


            $("#name_update_input").val(hotelname);
            $("#introduction_update_input").val(introduction);
            $("#address_update_input").val(address);
            $("#phone_update_input").val(phone);
            $("#pic_update_input").val(pic).hide();
            $("#pic_label").hide();
            $("#score_update_input").val(score);
            $("#price_update_input").val(price);
            $("#kind_update_input").val(kind);
            $("#service_update_input").val(service);
            $("#hotelUpdateModal").modal({
                backdrop: "static"
            })
        });
        //2.为模态框中的修改按钮绑定事件，更新学生信息
        $("#hotel_update_btn").click(function () {
            alert(123);
            //1.更新之前进行表单验证,验证没通过就直接返回
            if (!validate_form_update($("#hotelUpdateModal"))) {
                return false;
            }
            //2.验证通过后发送ajax请求保存更新的学生信息数据
            //如果要直接发送PUT之类的请求
            //在WEB.xml配置HttpPutFormContentFilter过滤器即可
            //这里未使用如上所述方法
            $.ajax({
                url: "/hotel/" + $(this).attr("edit-id") + ".do",
                type: "POST",
                data: $("#hotelUpdateModal form").serialize() + "&_method=PUT",
                success: function (result) {
                    //1.关闭modal框
                    $("#hotelUpdateModal").modal('hide');
                    //2.来到当前页，显示刚才保存的数据
                    to_page(currentPage);

                }
            })

        })
    }


    /**
     * 4.删除学生信息
     */
    function deleteHotel() {
        $(document).on("click", ".delete_btn", function () {
            //1.弹出确认删除对话框
            var name = $(this).parents("tr").find("td:eq(2)").text();
            var id = $(this).parents("tr").find("td:eq(1)").text();
            if (confirm("确认删除【" + name + "】吗？")) {
                //确认，发送ajax请求删除
                $.ajax({
                    url: "/hotel/" + id + ".do",
                    type: "POST",
                    data: {_method: "DELETE"},
                    dataType: "json",
                    success: function (result) {
                        alert(result.message);
                        to_page(currentPage);
                    }
                })


            }
        })
    }

    //批量删除
    function deleteSomeHotel() {
        $("#hotel_delete_all_btn").click(function () {
            var ids = "";
            //遍历获取选择框选中的id
            $("#hotel_table .check_item").each(function (index, ele) {
                if (ele.checked == true) {
                    var id = $(ele).parent().parent().children("td").eq(1).text();
                    ids = ids + id + ","
                }
            })

            ids = ids.substr(0, ids.length - 1);


            $.ajax({
                url: "/hotel.do",
                data: "ids=" + ids + "&_method=DELETE",
                //data: {_method:"DELETE"},
                type: "POST",
                dataType: "json",
                success: function (result) {
                    alert(result.message);
                    to_page(currentPage);
                }
            })
        })
    }

//选择框的逻辑
    function displayCheck() {
        $(document).on("click", "#check_all", function () {
            if ($(this).prop("checked")) {

                $(".check_item").prop("checked", true);
            } else {
                $(".check_item").prop("checked", false);
            }
        })

        $(document).on("click", ".check_item", function () {
            if ($(".check_item").prop("checked")) {
                $("#check_all").prop("checked", true);
            }
            $(".check_item").each(function (index, ele) {
                if ($(ele).prop("checked") == false) {
                    $("#check_all").prop("checked", false);
                }
            })
        })
    }

    //图片增加修改
    function pic() {
         //临时变量，等下指向点击对象
        var clickele = null;

        //为新增按钮添加modal
        $(document).on("click",".pic_modal_btn",function () {
            clickele = this;
            $("#hotelPicModal form")[0].reset();
            $("#pic_input").next("span").text("");
            $("#hotelPicModal").modal({
                backdrop: "static"
            })
        })

        //设置静态按钮绑定添加图片
/*
        $("#pic_modal_btn").click(function () {
            //清除表单数据
            $("#hotelPicModal form")[0].reset();
            $("#pic_input").next("span").text("");
            $("#hotelPicModal").modal({
                backdrop: "static"
            })
        });
*/

        //保存图片信息
        $("#hotelPic_btn").click(function () {
                //先校验表单信息
                if ($("#pic_input") == null) {
                    return false;
                }
                var id = $(clickele).parent().parent().children("td").eq(1).text();
                alert(id);
                var type = "file";
                var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
            formData.append(type,$("#pic_input")[0].files[0]);
            //从前端获取的id值，然后传给后端
            formData.append("id",id);
                $.ajax({
                    type : "post",
                    url : "/fileupload.do",
                    data : formData,
                    processData : false,
                    contentType : false,
                    success:function (result) {
                        alert(result.message);
                        $("#hotelPicModal").modal('hide');
                        to_page(currentPage);
                    }
                })

            }
        )
    }
    function search() {
        $("#search-btn").click(function () {
            $.ajax({
                url:"/hotelSearch.do",
                type:"GET",
                data:$("#search-form").serialize(),
                success:function (result) {
                    //1.解析并显示学生信息数据
                    build_hotel_table(result);
                    //解析显示分页导航条
                    build_page_info(result);
                    //3.解析并显示分页条数据
                    build_page_nav(result);
                }

            })
        })
    }

});