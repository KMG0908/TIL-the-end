# reac20200114

## 기술 스택

- MySQL 
  - https://dev.mysql.com/downloads/mysql/
  - https://dev.mysql.com/downloads/windows/installer/8.0.html
  - mysql-installer-community-8.0.12.0.msi

- JDK
  - Zulu
  - https://kr.azul.com/downloads/zulu-community/?&architecture=x86-64-bit&package=jdk#
  - openjdk version "1.8.0_192"
  - OpenJDK Runtime Environment (Zulu 8.33.0.1-win64) (build 1.8.0_192-b01)
  - OpenJDK 64-Bit Server VM (Zulu 8.33.0.1-win64) (build 25.192-b01, mixed mode)

- 주의) 환경변수 설정을 잊지 마세요

- Spring Tool Suite
  - https://spring.io/tools3/sts/legacy
  - v3.9.7

- Visual Studio Code
  - https://code.visualstudio.com/download

- Git
  - https://git-scm.com/downloads
  - v2.25.0 
  
- Node.js
  - https://nodejs.org/ko/
  - v12.14.1

## Spring Boot 실행 방법
- JDK를 설치한다
- MySQL을 설치하고 DB를 생성한다. db.sql 참조
- Spring Tool Suite 3.9.7 버전을 다운 받아 압축을 해제한다. 
- sts.exe를 실행한다
- package explorer에서 우클릭 - import - Git - import clone uri
- 다시 우클릭 - import - Maven - Existing Maven Projects 에서
- 클론한 폴더 내의 spring 폴더를 root 로 선택한다.
- maven 업데이트가 자동으로 완료된 뒤 run as spring boot app으로 실행한다

## React 실행 방법
- Visual Studio Code를 설치한다
- Git Bash를 설치한다 
- Node.js를 설치한다
- Visual Code의 터미널에서 bash shell을 연다
- cd 를 사용해 5zo 폴더로 이동한다
- npm i 로 필요한 것을 설치하고
- npm start 로 실행한다



