package com.ssafy.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.project.dto.Board;

@Mapper
public interface BoardDao {

	public void insertBoard(Board board);

	public List<Board> searchAllUserDate(@Param("mem_id") String mem_id, @Param("board_date") String board_date);

	public List<Board> searchAllUserToDo(String mem_id);
	
	public String searchAllCardLists(int board_id);

	public void updateBoard();

	public void deleteBoard(int board_id);

	public void patchBoard(Board board);

	public int getMaxBoardId();

}
