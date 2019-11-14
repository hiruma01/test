package com.qf.controller;


import com.qf.domain.Pic;
import com.qf.domain.User;
import com.qf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //登录
    @PostMapping("/login")
    @ResponseBody
    public User login(String username,String password){
        System.out.println(username);
        System.out.println(password);
        User user = userService.login(username, password);
        return user;
    }


    //判断用户名是否已用
    @PostMapping("/stuIsExist")
    @ResponseBody
    public User stuIsExist(String username){
        User user = userService.stuIsExist(username);
        return user;
    }

    //注册
    @PostMapping("/register")
    @ResponseBody
    public  User register( String username, String password, String email, String sex, String birthday, String phone,String pic) throws ParseException {
            //创建User实例
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.setSex(sex);
            user.setPhone(phone);
            user.setPic(pic);
            //格式转换
            SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd");
            Date ibirthday = sdf.parse(birthday);
            user.setBirthday(ibirthday);
            //获取当前注册时间
            Date now = new Date();
            user.setRegtime(now);
            //调用service层方法
            userService.register(user);


        return user;
    }

    //文件上传
    @PostMapping("/upload")
    @ResponseBody
    public Pic register(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {

        //设置上传路径
        String realPath = request.getSession().getServletContext().getRealPath("/uploadFiles/");

        File file1 = new File(realPath);
        if(!file1.exists()){
            file1.mkdirs();
        }
        //解决文件重名
        String filename = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replace("_", "");
        filename=uuid+"_"+filename;
        System.out.println(filename);

        //文件上传
        file.transferTo(new File(realPath,filename));
        Pic pic = new Pic();
        pic.setName(filename);
        System.out.println(pic);
        return pic;
    }

}
