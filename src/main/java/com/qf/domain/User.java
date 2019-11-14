package com.qf.domain;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
/*      `userid` int(16) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(16) NOT NULL,
  `sex` varchar(1) NOT NULL DEFAULT '男',
            `birthday` date NOT NULL,
            `email` varchar(32) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `pic` varchar(32) NOT NULL,
  `regtime` datetime NOT NULL,
            `flag` int(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`userid`)*/

    private Integer userid;
    private String username;
    private String password;
    private String sex;
    private Date birthday;
    private String email;
    private String phone;
    private String pic;
    private Date regtime;
    private Integer flag;

    @Override
    public String toString() {
        return "User{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", pic='" + pic + '\'' +
                ", regtime=" + regtime +
                ", flag=" + flag +
                '}';
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public Date getRegtime() {
        return regtime;
    }

    public void setRegtime(Date regtime) {
        this.regtime = regtime;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }
}
