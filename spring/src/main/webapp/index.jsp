<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table>
		<tr>
			<td>user_id</td>
			<td>email</td>
			<td>password</td>
			<td>nickname</td>
			<td>reg_date</td>
		</tr>
		<c:forEach var="member" items="${list }">
			<tr>
				<td>${member.mem_id }</td>
				<td>${member.mem_email }</td>
				<td>${member.mem_pw }</td>
				<td>${member.mem_nick }</td>
				<td>${member.mem_reg_date }</td>
			</tr>
		</c:forEach>
	</table>	
</body>
</html>