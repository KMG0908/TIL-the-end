package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.BoardDao;
import com.ssafy.project.dto.Board;
import com.ssafy.project.dto.BoardException;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardDao dao;

	@Override
	public void insertBoard(Board board) {
		try {			
			dao.insertBoard(board);			
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 생성 중 오류 발생, board_lists의 json 형식은 [\"1\",2] 또는 {\"key\" : \"value\"}입니다.");
		}
	}

	
	@Override
	public List<Board> searchAllUserDate(String mem_id, String board_date) {
		try {
			return dao.searchAllUserDate(mem_id, board_date);
		} catch (Exception e) {
			throw new BoardException(mem_id + "의 " + board_date + "날짜의 보드 조회 중 오류 발생");
		}
	}
	
	@Override
	public List<Board> searchAllUserToDo(String mem_id) {
		try {
			return dao.searchAllUserToDo(mem_id);
		} catch (Exception e) {
			throw new BoardException(mem_id + "의 todo 보드 조회 중 오류 발생");
		}
	}
	
	@Override
	public String searchAllCardLists(int board_id) {
		try {
			// null로 존재여부를 거를 수 없어서 부득이하게 exception을 던짐
			String lists = dao.searchAllCardLists(board_id);
			if(lists == null) {
				throw new BoardException();
			}
			return lists;
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board_id + "번 보드가 없습니다.");
		}
	}

	@Override
	public void patchBoard(Board board) {
		try {
			dao.patchBoard(board);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 패치 중 오류 발생");
		}
		
	}
	
	@Override
	public void updateBoard() {
		try {
			dao.updateBoard();
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 업데이트 중 오류 발생");
		}

	}

	@Override
	public void deleteBoard(int board_id) {
		try {
			dao.deleteBoard(board_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException(board_id + "번 보드 삭제 중 오류 발생");
		}
	}


	@Override
	public int getMaxBoardId() {
		try {
			return dao.getMaxBoardId();
		} catch (Exception e) {
			e.printStackTrace();
			throw new BoardException("보드 테이블 id 조회 중 오류 발생");
		}
	}

}
