# root에서 유저 생성후 
# 유저로 접속하여 진행하기 바랍니다

# create user 'ssafy'@'%' identified by 'ssafy';​
# grant all privileges on *.* to 'ssafy'@'%';

# DB database 이름은 til 입니다
drop database til;
create database til;
use til;

insert into mem_info(mem_id, mem_pw, mem_email, mem_nick, mem_reg_date)
values 
('test', 'test', 'test@test.com', 'test', now()),
('ssafy','ssafy','ssafy@ssafy.com','ssafy',now()),
('aaa','aaa','aaa@aaa.com','aaa',now());

insert into mem_option(mem_id, mem_auth, mem_post_def, mem_secret)
values
('test', true, false, false), -- test 계정은 글 발행이 가능하고 전체 공개 설정되어있고 기본 카드 설정은 비공개이다
('ssafy', true, true, false), -- ssafy 계정은 글 발행이 가능하고 전체 공개 설정되어있고 기본 카드 설정은 공개이다.
('aaa', false, false, true); -- aaa 계정은 글 발행이 불가능하고 전체 비공개 설정되어 모든 글이 비공개여야 한다.


# cardlist_id 에 auto increment 추가
use til;

# Read Foreign key
select * from information_schema.table_constraints where table_name = 'comment';

# Drop foreign key

# ALTER TABLE [FK테이블] DROP FOREIGN KEY [FK컬럼];
alter table `comment` drop foreign key `FK_cardlist_TO_comment_1`;
alter table `card` drop foreign key `FK_cardlist_TO_card_1`;

# Alter your primary key

# ALTER TABLE [PK테이블] modify [P값] INT(11) not null auto_increment;
ALTER TABLE `til`.`cardlist` 
CHANGE COLUMN `cardlist_id` `cardlist_id` INT(11) NOT NULL AUTO_INCREMENT ;

# Recreate foreign key

# ALTER TABLE [FK테이블] ADD CONSTRAINT [FK_테이블명_순서] FOREIGN KEY [컬럼명] REFERENCES [테이블명]([컬럼명]) ON DELETE CASCADE;
alter table `comment` add constraint `FK_cardlist_TO_comment_1` foreign key (`cardlist_id`) references cardlist(`cardlist_id`) on delete cascade;
alter table card add constraint `FK_cardlist_TO_card_1` foreign key (`cardlist_id`) references cardlist(`cardlist_id`) on delete cascade;

select * from information_schema.table_constraints where table_name = 'card'; -- card는 불가

# list 생성  테스트 쿼리 - rest api를 통해 입력시에는 cardlist_id가 필요없음에 주의
insert into cardlist(cardlist_id, mem_id, cardlist_name, cardlist_order, cardlist_instock)
values (1, 'test', '제목1', 1, true);
insert into cardlist(cardlist_id, mem_id, cardlist_name, cardlist_order, cardlist_instock)
values (2, 'ssafy', '제목2', 2, true);


# 1번 카드 이름과 순서 수정시
update cardlist
set 
cardlist_name = "제목입니다" ,
cardlist_date = now(),
cardlist_order = 1
where cardlist_id = 1;

# 1번 카드 날짜가 지나 자동 발행시
update cardlist
set 
cardlist_date = "2020-01-17",
cardlist_instock = false
where cardlist_id = 1;


# 1번 카드 리스트에 넣을 테스트 데이터
# 마찬가지로 rest api 테스트 시 card_id는 넣을 필요가 없습니다
# cardlist_id와 card_order는 필수입니다.

insert into card (card_id, cardlist_id, card_name, card_contents, card_secret, card_order)
values (1, 1, '첫번째 카드입니다', '첫번째 카드의 내용입니다', false, 1);
insert into card (card_id, cardlist_id, card_name, card_contents, card_secret, card_order)
values (2, 1, '두번째 카드입니다', '두번째 카드의 내용입니다', false, 2);
insert into card (card_id, cardlist_id, card_name, card_contents, card_secret, card_order)
values (3, 2, '세번째 카드입니다', '세번째 카드의 내용입니다', false, 2);

# 카드에서 tag 입력시 태그 테이블에 존재하는 지 확인한 뒤 
# 그 태그가 존재하지 않는다면 새로 생성 
# insert into tag(tag_id (auto_increment), tag_name)

insert into tag(tag_id, tag_name)
values(1, "react"), (2, "mysql"), (3, "spring");


# card_tag_id 에 auto increment 옵션

insert into card_tag(card_tag_id, card_id, tag_id)
values(1, 1, 1);

insert into card_tag(card_tag_id, card_id, tag_id)
values(2, 1, 2);

insert into card_tag(card_tag_id, card_id, tag_id)
values(3, 1, 3);

insert into card_tag(card_tag_id, card_id, tag_id)
values(4, 2, 1);



# 1. 발행된 카드 리스트 찾기
select cardlist_id
from cardlist
where mem_id = "test" and cardlist_instock = false; -- 날짜 조건은 cardlist_date 추가

# 2. 해당 카드 리스트가 갖고 있는 카드번호
select card_id
from card a, 
(select cardlist_id
from cardlist
where mem_id = "test" and cardlist_instock = false) b
where a.cardlist_id = b.cardlist_id; -- 비공개 카드 조건을 건다면 a.card_secret = false 추가

# 3. 2의 카드가 가지고 있는 태그와 그 숫자 합
select e.tag_name, count(c.tag_id) as num
from card_tag c, tag e,
(select card_id
from card a, 
(select cardlist_id
from cardlist
where mem_id = "test" and cardlist_instock = false) b
where a.cardlist_id = b.cardlist_id) d
where c.card_id = d.card_id
and c.tag_id = e.tag_id
group by c.tag_id;

