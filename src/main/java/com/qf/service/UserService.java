package com.qf.service;

import com.qf.domain.User;

public interface UserService {

    //登录
    User login(String username, String password);

    //注册
    void register(User user);

    //判断注册的账户是否存在
    User stuIsExist(String username);
}
