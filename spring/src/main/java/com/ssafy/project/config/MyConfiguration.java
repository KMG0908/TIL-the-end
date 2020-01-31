package com.ssafy.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfiguration {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		
		/**
		 * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
		 * 운영 환경에 배포할 경우에는 15~18행을 주석 처리합니다.
		 * 
		 * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
		 */
		
		return new WebMvcConfigurer() {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE")
            .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method",
                    "Access-Control-Request-Headers")
            .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
            .allowCredentials(true).maxAge(3600);
		}
			 
		};
	}
}
