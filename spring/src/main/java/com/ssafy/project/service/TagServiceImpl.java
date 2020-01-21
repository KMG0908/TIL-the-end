package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.TagDao;
import com.ssafy.project.dto.Card_TagException;
import com.ssafy.project.dto.Tag;
import com.ssafy.project.dto.TagException;

@Service
public class TagServiceImpl implements TagService {

	
	@Autowired
	private TagDao dao;
	
	@Override
	public void insertTag(Tag tag) {
		try {
			dao.insertTag(tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException("태그 생성 중 오류 발생");
		}
	}

	@Override
	public List<Tag> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			throw new TagException("태그 리스트 조회 중 오류 발생");
		}
	}

	@Override
	public Tag search(int tag_id) {
		try {
			Tag tag = dao.search(tag_id);
			if (tag == null) {
				throw new TagException("존재하지 않는 태그 번호입니다");
			}
			return tag;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof TagException) {
				throw (TagException) e;
			} else {
				throw new TagException(tag_id + "번 태그 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateTag(Tag tag) {
		try {
			dao.updateTag(tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(tag.getTag_id() + "번 태그 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteTag(int tag_id) {
		try {
			dao.deleteTag(tag_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new TagException(tag_id + "번 태그 삭제 중 오류 발생");
		}
	}
//	
//	@Override
//	public List<Tag> tagcloud(String mem_id) {
//		try {
//			return dao.tagcloud(mem_id);
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw new Card_TagException(mem_id + "의 태그 조회 중 오류 발생");
//		}
//	}

}
