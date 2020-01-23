package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Comment;

public interface CommentService {

	void insertComment(Comment comment);

	List<Comment> searchAll(int cardlist_id);

	void updateComment(Comment comment);

	void deleteComment(int comment_id);

	int getMaxCommentId();

}
