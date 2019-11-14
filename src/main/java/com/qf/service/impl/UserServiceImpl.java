package com.qf.service.impl;

import com.qf.dao.UserDao;
import com.qf.domain.User;
import com.qf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public User login(String username, String password) {
        return userDao.login(username,password);
    }

    @Override
    public void register(User user) {
        userDao.register(user);
    }
    @Override
    public User stuIsExist(String username) {
        return userDao.stuIsExist(username);
    }
}
