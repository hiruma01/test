//1.页面加载完成之后发送Ajax请求，要到分页数据

$(function () {
    var totalRecord, currentPage;
    //显示第一页
    to_page(1);
    //添加学生信息
/*    addHotel();
    // 修改酒店信息
    updateHotel();
    //删除酒店信息
    deleteHotel();
    //批量删除
    deleteSomeHotel();
    //选择框显示
    displayCheck();
    //图片增加修改
    pic();*/

    search();
    $("#firstpage-btn").click(function () {
        to_page(1);
    })


    function to_page(pageNo) {
        //重置条件查询表格
        $("#search-form")[0].reset();

        $("#check_all").prop("checked", false);
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
           /* var checkBox = $("<td><input type='checkbox' class='check_item'/></td>");*/
            var hotelid = $("<td></td>").append(item.hotelid);
            var hotelname = $("<td></td>").append(item.hotelname);
            var introduction = $("<td></td>").append(item.introduction);
            var address = $("<td></td>").append(item.address);
            var phone = $("<td></td>").append(item.phone);
            var img = $("<img width='200' height='180'>").attr("src", item.pic);
            var pic = $("<td></td>").append(img);
            var score = $("<td></td>").append(item.score);
            var price = $("<td></td>").append(item.price);
            var kind = $("<td></td>").append(item.kind);
            var service = $("<td></td>").append(item.service);

            //客户不要增删改
            var button1 = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("编辑");
            var button2 = $("<button></button>").addClass("tn btn-danger btn-sm delete_btn").append($("<span></span>").addClass("glyphicon glyphicon-trash").attr("aria-hidden", true)).append("删除");
            var button3 = $("<button></button>").addClass("btn btn-primary btn-sm pic_modal_btn").append($("<span></span>").addClass("glyphicon glyphicon-pencil").attr("aria-hidden", true)).append("添加修改图片");
            var td_btn = $("<td></td>").append(button1).append(" ").append(button2).append(" ").append(button3);
            //这个是admin管理模式的
         /*   $("<tr></tr>").append(checkBox).append(hotelid).append(hotelname).append(introduction).append(address).append(phone).append(pic)
                .append(score).append(price).append(kind).append(service).append(td_btn).appendTo("#hotel_table tbody");*/

            //这个是客户模式的
                $("<tr></tr>").append(hotelid).append(hotelname).append(introduction).append(address).append(phone).append(pic)
                    .append(score).append(price).append(kind).append(service).appendTo("#hotel_table tbody");
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
    function search() {
        $("#search-btn").click(function () {
            alert(111);
            $.ajax({
                url:"/hotelSearch.do",
                type:"GET",
                data:$("#search-form").serialize(),
                success:function (result) {
                    alert(23);
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
})
