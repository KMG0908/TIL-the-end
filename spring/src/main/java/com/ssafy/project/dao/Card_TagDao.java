package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Card_Tag;
import com.ssafy.project.dto.Tag;

@Mapper
public interface Card_TagDao {

	public void insertCard_Tag(Card_Tag card_tag);

	public List<Card_Tag> searchAll(int card_id);

	public void deleteCard_Tag(int card_tag_id);

	public List<Tag> tagcloud(String mem_id);
}
