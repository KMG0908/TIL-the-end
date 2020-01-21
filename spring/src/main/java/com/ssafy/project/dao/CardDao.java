package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Card;

@Mapper
public interface CardDao {

	public void insertCard(Card card);

	public List<Card> searchAll(int cardlist_id);

	public Card search(int card_id);

	public void updateCard(Card card);

	public void deleteCard(int card_id);

}
