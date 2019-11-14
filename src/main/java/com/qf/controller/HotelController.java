package com.qf.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qf.domain.Hotel;
import com.qf.domain.Msg;
import com.qf.domain.Search;
import com.qf.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController //@Controller和@ResponseBody的结合
public class HotelController {
    @Autowired
    private IHotelService hotelService;

    //分页显示所有酒店信息
    @GetMapping(path = "/hotel")
    public PageInfo getListWithJson(Integer pageNo) {
        //这是一个分页查询
        //引入PageHelp分页插件
        //在查询之前只需要调用，传入页码，以及每页的大小
        PageHelper.startPage(pageNo, 8);//自动添加limit 0,8
        //startPage后面紧跟的查询就是分页查询
        List<Hotel> hotelList = hotelService.getList();

        PageInfo pageInfo = new PageInfo(hotelList, 5);
        return pageInfo;
    }

//添加一条酒店信息
    @PostMapping(path = "/hotel")
    public Msg save(Hotel hotel) {
        System.out.println(hotel);
        hotelService.save(hotel);
        Msg msg = Msg.sucess();
        return msg;
    }

    //根据id修改酒店信息
    @PutMapping(path = "/hotel/{hotelid}")
    public Msg update(Hotel hotel) {
        hotelService.update(hotel);
        return Msg.sucess();
    }

    //根据id删除酒店信息
    @DeleteMapping(value = "/hotel/{id}")
    public Msg delete(@PathVariable("id") Integer id) {
        hotelService.delete(id);
        return Msg.sucess();
    }


    //批量删除
    @DeleteMapping(value = "/hotel")
    public Msg allDelete(/*@PathVariable("ids")*/ String ids) {
        //将前端传来的 1，2，3，4形式的字符串分割成数组
        String[] idArr = ids.split(",");
        hotelService.allDelete(idArr);
        return Msg.sucess();
    }

    @RequestMapping("/fileupload")
    public Msg uoload(HttpServletRequest request, @RequestParam("file") MultipartFile file, @RequestParam("id") Integer id) throws IOException {
        System.out.println("springmvc文件上传..." + id);

        // 使用fileupload组件完成文件上传
        // 上传的位置
        String path = request.getSession().getServletContext().getRealPath("/uploadFiles/");
        // 判断，该路径是否存在
        File file2 = new File(path);
        if (!file2.exists()) {
            // 创建该文件夹
            file2.mkdirs();
        }

        // 说明上传文件项
        // 获取上传文件的名称
        String filename = file.getOriginalFilename();
        // 把文件的名称设置唯一值，uuid


        String uuid = UUID.randomUUID().toString().replace("-", "");
        filename = uuid + "_" + filename;
        // 完成文件上传
        file.transferTo(new File(path, filename));
        /*     String str = path+filename;*/

        String str = "uploadFiles/" + filename;
        hotelService.setPic(str, id);
        return Msg.sucess();

    }

    @GetMapping("/hotelSearch.do")
    public PageInfo someSearch(Search search) {
        //这是一个分页查询
        //引入PageHelp分页插件
        //在查询之前只需要调用，传入页码，以及每页的大小,设置显示第一页
        Integer pageNo = 1;
        PageHelper.startPage(pageNo, 8);//自动添加limit 0,8
        //startPage后面紧跟的查询就是分页查询
        List<Hotel> hotelList1 = hotelService.searchSome(search);
        System.out.println(search);
        for (Hotel hotel:
             hotelList1) {
            System.out.println(hotel);
        }

        PageInfo pageInfo = new PageInfo(hotelList1, 5);
        return pageInfo;

    }

}
