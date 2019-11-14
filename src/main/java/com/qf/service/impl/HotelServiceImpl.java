package com.qf.service.impl;

import com.qf.dao.IHotelDao;
import com.qf.domain.Hotel;
import com.qf.domain.Search;
import com.qf.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("hotelService")
public class HotelServiceImpl implements IHotelService {
    @Autowired
    private IHotelDao hotelDao;
    @Override
    public List<Hotel> getList() {
        return hotelDao.getList();
    }


    @Override
    public void save(Hotel hotel) {
       hotelDao.save(hotel);
    }

    @Override
    public void update(Hotel hotel) {
      hotelDao.update(hotel);
    }

    @Override
    public void delete(Integer id) {
        hotelDao.delete(id);
    }

    @Override
    public void allDelete(String[] id) {
       hotelDao.allDelete(id);
    }

    @Override
    public void setPic(String str, Integer id) {
        hotelDao.setPic(str,id);
    }

    @Override
    public List<Hotel> searchSome(Search search) {
       return hotelDao.searchSome(search);
    }
}
