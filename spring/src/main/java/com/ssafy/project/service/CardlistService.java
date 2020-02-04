package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Cardlist;

public interface CardlistService {

	void insertCardlist(Cardlist cardlist);

	Cardlist search(int cardlist_id);

	void updateCardlist(Cardlist cardlist);

	void deleteCardlist(int cardlist_id);

	int getMaxCardlistId();

	void patch(Cardlist cardlist);

	List<Cardlist> searchPublicCardlist(String mem_id, String keyword);

	List<Cardlist> searchPrivateCardlist(String mem_id, String keyword);

	List<Cardlist> searchGlobalCardlist(String keyword);

	void movecardlist(int cardlist_id, int board_id);


}
