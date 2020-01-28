package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CardDao;
import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.BoardException;
import com.ssafy.project.dto.Card;
import com.ssafy.project.dto.CardException;

@Service
public class CardServiceImpl implements CardService {

	@Autowired
	private CardDao dao;

	@Override
	public void insertCard(Card card) {
		try {
			dao.insertCard(card);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 생성 중 오류 발생");
		}
	}


	@Override
	public Card search(int card_id) {
		try {
			Card card = dao.search(card_id);
			if (card == null) {
				throw new CardException("존재하지 않는 카드번호입니다");
			}
			return card;
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(card_id + "번 카드 조회 중 오류 발생");
		}
	}

	@Override
	public void updateCard(Card card) {
		try {
			dao.updateCard(card);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(card.getCard_id() + "번 카드 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteCard(int card_id) {
		try {
			dao.deleteCard(card_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException(card_id + "번 카드 삭제 중 오류 발생");
		}
	}
	
	@Override
	public int getMaxCardId() {
		try {
			return dao.getMaxCardId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardException("카드 테이블 id 조회 중 오류 발생");
		}
	}
	
	@Override
	public List<Board> countAllDailyCard(String mem_id, String from, String to) {
		try {
			return dao.countAllDailyCard(mem_id, from, to);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 전체 카드 조회 중 오류 발생");
		}
	}
	
	@Override
	public List<Board> countPublicDailyCard(String mem_id, String from, String to) {
		try {
			return dao.countPublicDailyCard(mem_id, from, to);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 공개된 카드 조회 중 오류 발생");
		}
	}

}
