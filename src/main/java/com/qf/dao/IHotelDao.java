package com.qf.dao;

import com.qf.domain.Hotel;
import com.qf.domain.Search;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IHotelDao {
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
     * 更新一条记录
     */
    void update(Hotel hotel);

    /**
     * 删除一条记录
     */
    void delete(Integer id);

    /**
     * 删除所有记录
     */
    void allDelete(String[] ids);
    /**
     * 设置图片
     */
    void setPic(@Param("str") String str, @Param("id")Integer id);

    /**
     * 条件查询
     */
    List<Hotel> searchSome(Search search);

}
