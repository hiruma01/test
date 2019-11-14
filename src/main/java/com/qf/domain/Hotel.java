package com.qf.domain;

import java.io.Serializable;

public class Hotel implements Serializable {
    private Integer hotelid;
    private String hotelname;
    private String introduction;
    private String address;
    private String phone;
    private String pic;
    private Integer score;
    private Double price;
    private String kind;
    private String service;
    private Integer flag;

    public Integer getHotelid() {
        return hotelid;
    }

    public void setHotelid(Integer hotelid) {
        this.hotelid = hotelid;
    }

    public String getHotelname() {
        return hotelname;
    }

    public void setHotelname(String hotelname) {
        this.hotelname = hotelname;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    @Override
    public String toString() {
        return "Hotel{" +
                "hotelid=" + hotelid +
                ", houtelname='" + hotelname + '\'' +
                ", introduction='" + introduction + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", pic='" + pic + '\'' +
                ", score=" + score +
                ", price=" + price +
                ", kind='" + kind + '\'' +
                ", service='" + service + '\'' +
                ", flag=" + flag +
                '}';
    }
}
