package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.CardlistDao;
import com.ssafy.project.dto.Card;
import com.ssafy.project.dto.CardException;
import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.dto.CardlistException;

@Service
public class CardlistServiceImpl implements CardlistService {

	@Autowired
	private CardlistDao dao;

	@Override
	public void insertCardlist(Cardlist cardlist) {
		try {
			dao.insertCardlist(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException("카드 리스트 생성 중 오류 발생");
		}

	}


	@Override
	public Cardlist search(int cardlist_id) {
		try {
			Cardlist cardlist = dao.search(cardlist_id);
			if (cardlist == null) {
				throw new CardlistException("존재하지 않는 카드 리스트 번호입니다");
			}
			return cardlist;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof CardlistException) {
				throw (CardlistException) e;
			} else {
				throw new CardlistException(cardlist_id + "번 카드 리스트 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateCardlist(Cardlist cardlist) {
		try {
			dao.updateCardlist(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist.getCardlist_id() + "번 카드 리스트 수정 중 오류 발생");
		}

	}
	
	
	@Override
	public void patch(Cardlist cardlist) {
		try {
			dao.patch(cardlist);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist.getCardlist_id() + "번 카드 리스트 패치 중 오류 발생");
		}
	}

	@Override
	public void deleteCardlist(int cardlist_id) {
		try {
			dao.deleteCardlist(cardlist_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException(cardlist_id + "번 카드 리스트 삭제 중 오류 발생");
		}
	}
	
	@Override
	public int getMaxCardlistId() {
		try {
			return dao.getMaxCardlistId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new CardlistException("카드 리스트 id 조회 중 오류 발생.");
		}
	}
	
	@Override
	public List<Cardlist> searchPrivateCardlist(String mem_id, String keyword) {
		try {
			return dao.searchPrivateCardlist(mem_id, keyword);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 공개된 카드list 검색 중 오류 발생");
		}
	}
	
	@Override
	public List<Cardlist> searchPublicCardlist(String mem_id, String keyword) {
		try {
			return dao.searchPublicCardlist(mem_id, keyword);
		} catch (Exception e) {
			throw new CardException(mem_id + "의 전체 카드list 검색 중 오류 발생");
		}
	}
	
	@Override
	public List<Cardlist> searchGlobalCardlist(String keyword) {
		try {
			return dao.searchGlobalCardlist(keyword);
		} catch (Exception e) {
			throw new CardException("전체 카드list 검색 중 오류 발생");
		}
	}
	
	@Override
	public void movecardlist(int cardlist_id, int board_id) {
		try {
			dao.movecardlist(cardlist_id, board_id);
		} catch (Exception e) {
			throw new CardException("전체 카드list 이동 중 오류 발생");
		}
	}
	
}
