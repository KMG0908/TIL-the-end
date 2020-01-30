package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Cardlist;

@Mapper
public interface CardlistDao {

	public void insertCardlist(Cardlist cardlist);

	public Cardlist search(int cardlist_id);

	public void updateCardlist(Cardlist cardlist);

	public void deleteCardlist(int cardlist_id);

	public int getMaxCardlistId();

	public void patch(Cardlist cardlist);

	public List<Cardlist> searchPrivateCardlist(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Cardlist> searchPublicCardlist(@Param("mem_id")String mem_id, @Param("keyword")String keyword);

	public List<Cardlist> searchGlobalCardlist(String keyword);

}
