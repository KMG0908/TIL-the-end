package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.dto.CardlistSearch;

public interface CardlistService {

	void insertCardlist(Cardlist cardlist);

	Cardlist search(int cardlist_id);

	void updateCardlist(Cardlist cardlist);

	void deleteCardlist(int cardlist_id);

	int getMaxCardlistId();

	void patch(Cardlist cardlist);

	List<CardlistSearch> searchPublicCardlist(String mem_id, String keyword);

	List<CardlistSearch> searchPrivateCardlist(String mem_id, String keyword);

	List<CardlistSearch> searchGlobalCardlist(String keyword);

	void movecardlist(int cardlist_id, int board_id);


}
