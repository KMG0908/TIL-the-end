package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Cardlist_Tag;

public interface Cardlist_TagService {

	void insertCardlist_Tag(Cardlist_Tag cardlist_tag);

	List<Cardlist_Tag> searchAll(int cardlist_id);

	void deleteCardlist_Tag(int cardlist_tag_id);

	int getMaxCardlistTagId();
}
