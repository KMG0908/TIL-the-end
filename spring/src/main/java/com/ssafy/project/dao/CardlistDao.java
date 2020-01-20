package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Cardlist;

@Mapper
public interface CardlistDao {

	public void insertCardlist(Cardlist cardlist);

	public List<Cardlist> searchAll(String mem_id);

	public Cardlist search(int cardlist_id);

	public void updateCardlist(Cardlist cardlist);

	public void deleteCardlist(int cardlist_id);
}












