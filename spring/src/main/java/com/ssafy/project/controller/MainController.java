package com.ssafy.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.project.service.MemberService;
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
public class MainController {
	@Autowired
	MemberService service;

	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("list", service.searchAll());

		return "index";
	}
}
