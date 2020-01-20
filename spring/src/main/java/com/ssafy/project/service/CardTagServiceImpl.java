package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CardTagDao;
import com.ssafy.project.dto.CardTag;
import com.ssafy.project.dto.CardTagException;

@Service
public class CardTagServiceImpl implements CardTagService {

	
	@Autowired
	private CardTagDao dao;
	
	@Override
	public void insertCardTag(CardTag cardtag) {
		try {
			dao.insertCardTag(cardtag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardTagException("카드 태그 생성 중 오류 발생");
		}
	}

	@Override
	public List<CardTag> searchAll(int card_id) {
		try {
			return dao.searchAll(card_id);
		} catch (Exception e) {
			throw new CardTagException(card_id + "번 카드의 태그 조회 중 오류 발생");
		}
	}

	@Override
	public void deleteCardTag(int card_tag_id) {
		try {
			dao.deleteCardTag(card_tag_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardTagException(card_tag_id + "번 카드 태그 삭제 중 오류 발생");
		}
	}

}
