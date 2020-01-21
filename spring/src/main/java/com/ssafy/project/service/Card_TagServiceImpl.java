package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.Card_TagDao;
import com.ssafy.project.dto.Card_Tag;
import com.ssafy.project.dto.Card_TagException;

@Service
public class Card_TagServiceImpl implements Card_TagService {

	@Autowired
	private Card_TagDao dao;

	@Override
	public void insertCard_Tag(Card_Tag card_tag) {
		try {
			dao.insertCard_Tag(card_tag);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Card_TagException("카드 태그 생성 중 오류 발생");
		}
	}

	@Override
	public List<Card_Tag> searchAll(int card_id) {
		try {
			return dao.searchAll(card_id);
		} catch (Exception e) {
			throw new Card_TagException(card_id + "번 카드의 태그 조회 중 오류 발생");
		}
	}

	@Override
	public void deleteCard_Tag(int card_tag_id) {
		try {
			dao.deleteCard_Tag(card_tag_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Card_TagException(card_tag_id + "번 카드 태그 삭제 중 오류 발생");
		}
	}

}
