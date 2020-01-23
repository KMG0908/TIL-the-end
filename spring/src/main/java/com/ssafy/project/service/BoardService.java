package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Board;

public interface BoardService {

	void insertBoard(Board board);

	List<Board> searchAllUserDate(String mem_id, String board_date);

	List<Board> searchAllUserToDo(String mem_id);

	String searchAllCardLists(int board_id);

	void patchBoard(Board board);

	void updateBoard();

	void deleteBoard(int board_id);

	int getMaxBoardId();
}
