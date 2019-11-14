package com.qf.dao;

import com.qf.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDao {

    //登录
    User login(@Param("username") String username, @Param("password") String password);


    //注册
    void register(User user);

    //判断注册的账户是否存在
    User stuIsExist(String username);


}
