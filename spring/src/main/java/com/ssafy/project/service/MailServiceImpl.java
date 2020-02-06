package com.ssafy.project.service;

import java.io.File;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.MailException;
import com.ssafy.project.dto.MemberException;

@Service
public class MailServiceImpl implements MailService {

	// org.springframework.mail.javamail.JavaMailSender
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private MemberDao dao;

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	@Override
	public void sendAuth(String mem_id, String mem_email) {
		// javax.mail.internet.MimeMessage
//		MimeMessage message = javaMailSender.createMimeMessage();
		SimpleMailMessage message= new SimpleMailMessage();
		try {
			if(!dao.search(mem_id).getMem_email().equals(mem_email)) {
				throw new MemberException(mem_email + "은 "  + mem_id + "에 등록된 이메일이 아닙니다.");
			}
			
			dao.deletePrevAuth(mem_id);
			
			String subject = "Til the end 이메일 인증 코드 발급 안내 입니다.";
			int ran = new Random().nextInt(900000000) + 100000000;
			String authCode = String.valueOf(ran);
			dao.insertEmailAuth(mem_id, authCode);
			
			
			StringBuilder sb = new StringBuilder();
			sb.append("이메일을 등록하신 이후 아이디 찾기와 비밀번호 찾기를 이용하실 수 있습니다.\n\n");
			sb.append("귀하의 인증 코드는 " + authCode + "입니다.\n\n");
			sb.append("http://www.endtil.p-e.kr에 가입하신 적이 없는 경우 refresh6724.dev@gmail.com 으로 문의바랍니다.\n\n");

			// org.springframework.mail.javamail.MimeMessageHelper
//			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			message.setSubject(subject);
			message.setText(sb.toString());
//			helper.setFrom("refresh6724.dev@gmail.com");
			message.setTo(mem_email);
			
			// 첨부 파일 처리
//			if (filePath != null) {
//				File file = new File(filePath);
//				if (file.exists()) {
//					helper.addAttachment(file.getName(), new File(filePath));
//				}
//			}
			// 첨부 파일 처리 다른방법(이건 확인함)
			// FileSystemResource file = new FileSystemResource(new File("D:/load.gif"));
			// helper.addAttachment("load.gif", file);
			// 메일에 이미지 심어서 보낸는 방법(한글파일은 안됨)
			// String contents = text + "<br><br><img src=\"cid:emailPic.png \">";
			// helper.setText(contents, true);
			// FileSystemResource file = new FileSystemResource(new
			// File("D:/emailPic.png"));
			// helper.addInline("emailPic.png", file);
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
			if(e instanceof MemberException) {
				throw (MemberException)e;
			} else if(e instanceof MessagingException) {
//				throw (MessagingException)e;
			} else {
				throw new MailException("메일 발송에 실패하였습니다");				
			}
		}
	}
	
	
	@Override
	public void postAuth(String mem_id, String mem_email, String authCode) {
		try {			
			dao.postAuth(mem_id, mem_email, authCode);
		} catch (Exception e) {
			e.printStackTrace();
			if(e instanceof MemberException) {
				throw (MemberException)e;
			} else {
				throw new MailException("이메일 인증에 실패하였습니다. 코드를 다시 확인해주세요.");				
			}
		}
		
	}

}
