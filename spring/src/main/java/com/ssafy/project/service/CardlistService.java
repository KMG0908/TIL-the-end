package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Cardlist;

public interface CardlistService {

	void insertCardlist(Cardlist cardlist);

	List<Cardlist> searchAll(String mem_id);

	Cardlist search(int cardlist_id);

	void updateCardlist(Cardlist cardlist);

	void deleteCardlist(int cardlist_id);

}
