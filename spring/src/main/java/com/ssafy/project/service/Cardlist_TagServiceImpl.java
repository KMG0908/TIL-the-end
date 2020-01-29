package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.Cardlist_TagDao;
import com.ssafy.project.dto.Cardlist_Tag;
import com.ssafy.project.dto.Cardlist_TagException;

@Service
public class Cardlist_TagServiceImpl implements Cardlist_TagService {

	@Autowired
	private Cardlist_TagDao dao;

	@Override
	public void insertCardlist_Tag(Cardlist_Tag cardlist_tag) {
		try {
			dao.insertCardlist_Tag(cardlist_tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Cardlist_TagException("카드 태그 생성 중 오류 발생");
		}
	}

	@Override
	public List<Cardlist_Tag> searchAll(int cardlist_id) {
		try {
			return dao.searchAll(cardlist_id);
		} catch (Exception e) {
			throw new Cardlist_TagException(cardlist_id + "번 카드의 태그 조회 중 오류 발생");
		}
	}

	@Override
	public void deleteCardlist_Tag(int cardlist_tag_id) {
		try {
			dao.deleteCardlist_Tag(cardlist_tag_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Cardlist_TagException(cardlist_tag_id + "번 카드 태그 삭제 중 오류 발생");
		}
	}
	
	@Override
	public int getMaxCardlistTagId() {
		try {
			return dao.getMaxCardlistTagId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Cardlist_TagException("카드 태그 id 조회 중 오류 발생");
		}
	}

}
