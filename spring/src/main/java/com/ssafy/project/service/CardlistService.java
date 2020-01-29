package com.ssafy.project.service;

import com.ssafy.project.dto.Cardlist;

public interface CardlistService {

	void insertCardlist(Cardlist cardlist);

	Cardlist search(int cardlist_id);

	void updateCardlist(Cardlist cardlist);

	void deleteCardlist(int cardlist_id);

	int getMaxCardlistId();

	void patch(Cardlist cardlist);


}
