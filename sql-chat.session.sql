CREATE SCHEMA chat;
DROP TABLE IF EXISTS chat.conversations;
CREATE TABLE chat.conversations(
  id serial PRIMARY KEY,
  "participants" int ARRAY [2] NOT NULL,
  "blackList" boolean ARRAY [2] NOT NULL DEFAULT ARRAY [false, false],
  "favoriteList" boolean ARRAY [2] NOT NULL DEFAULT ARRAY [false, false],
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);
/*  */
DROP TABLE IF EXISTS chat.catalogs;
CREATE TABLE chat.catalogs(
  id serial PRIMARY KEY,
  "userId" int REFERENCES "Users",
  "catalogName" varchar(256) NOT NULL
);
/*  */
DROP TABLE IF EXISTS chat."catalogsToConversations";
CREATE TABLE chat."catalogsToConversations"(
  "catalogId" int REFERENCES chat."catalogs",
  "conversationId" int REFERENCES chat."conversations",
  CONSTRAINT id PRIMARY KEY ("conversationId", "catalogId")
);
/*  */
DROP TABLE IF EXISTS chat."messages";
CREATE TABLE chat."messages"(
  id serial PRIMARY KEY,
  "sender" int REFERENCES "Users",
  "body" varchar(256) NOT NULL CHECK(
    "body" != ''
    AND "body" != ' '
  ),
  "conversation" int REFERENCES chat."conversations",
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);
-- 
INSERT INTO chat.conversations("participants")
VALUES (ARRAY [1,3]),
  (ARRAY [2,3])
UPDATE chat.conversations
SET "favoriteList" [2] = true;
-- 
INSERT INTO chat."messages"("sender", "body", "conversation")
VALUES(1, 'hello', 1);
INSERT INTO chat."messages"("sender", "body", "conversation")
VALUES(1, 'hey', 1);
-- 
SELECT array_position("participants", 3)
FROM chat.conversations;
/*  */
-- 
INSERT INTO chat.catalogs("userId", "catalogName")
VALUES (3, 'c1'),
  (3, 'c2');
INSERT INTO chat."catalogsToConversations"
VALUES (1, 1),
  (1, 3),
  (2, 1);
INSERT INTO chat.catalogs("userId", "catalogName")
VALUES (2, 'b1');
INSERT INTO chat."catalogsToConversations"
VALUES (3, 3);
-- 
SELECT *
FROM chat.catalogs AS "c"
  JOIN chat."catalogsToConversations" AS "ctc" ON "c".id = "ctc"."catalogId";