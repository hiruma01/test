package com.qf.service;

import com.qf.domain.Hotel;
import com.qf.domain.Search;

import java.util.List;

public interface IHotelService {
    /**
     * 获取列表
     * @return
     */
    List<Hotel> getList();

    /**
     * 保存一条记录
     */
    void save(Hotel hotel);

    /**
     * 删除所有记录
     */
    void allDelete(String[] id);

    /**
     * 更新一条记录
     */
    void update(Hotel hotel);

    /**
     * 删除一条记录
     */
    void delete(Integer id);

    /**
     * 设置图片
     */
    void setPic(String str,Integer id);

    /**
     * 条件查询
     */
    List<Hotel> searchSome(Search search);


}
