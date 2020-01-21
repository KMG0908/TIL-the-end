package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Tag;

public interface TagService {

	void insertTag(Tag tag);

	List<Tag> searchAll();

	Tag search(int tag_id);

	void updateTag(Tag tag);

	void deleteTag(int tag_id);

//	List<Tag> tagcloud(String mem_id);

}
