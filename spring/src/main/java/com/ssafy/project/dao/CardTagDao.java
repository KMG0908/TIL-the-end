package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.CardTag;

@Mapper
public interface CardTagDao {

	public void insertCardTag(CardTag cardtag);

	public List<CardTag> searchAll(int card_id);

	public void deleteCardTag(int card_tag_id);
}
