package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.CardTag;

public interface CardTagService {

	void insertCardTag(CardTag cardtag);

	List<CardTag> searchAll(int card_id);

	void deleteCardTag(int card_tag_id);

}
