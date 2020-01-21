package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Card;

public interface CardService {

	void insertCard(Card card);

	List<Card> searchAll(int cardlist_id);

	Card search(int card_id);

	void updateCard(Card card);

	void deleteCard(int card_id);

}
