package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.Card;

@Mapper
public interface CardDao {

	public void insertCard(Card card);

	public Card search(int card_id);

	public void updateCard(Card card);

	public void deleteCard(int card_id);

	public int getMaxCardId();
	
	public List<Board> countPublicDailyCard(String mem_id);
	
	public List<Board> countAllDailyCard(String mem_id);

}
