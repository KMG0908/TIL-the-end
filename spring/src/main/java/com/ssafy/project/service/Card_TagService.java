package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Card_Tag;

public interface Card_TagService {

	void insertCard_Tag(Card_Tag card_tag);

	List<Card_Tag> searchAll(int card_id);

	void deleteCard_Tag(int card_tag_id);
}
