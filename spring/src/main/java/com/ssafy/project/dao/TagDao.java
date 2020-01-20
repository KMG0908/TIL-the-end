package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Tag;

@Mapper
public interface TagDao {

	public void insertTag(Tag tag);

	public List<Tag> searchAll();

	public Tag search(int tag_id);

	public void updateTag(Tag tag);

	public void deleteTag(int tag_id);

}












