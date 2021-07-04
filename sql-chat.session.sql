CREATE SCHEMA chat;
DROP TABLE IF EXISTS chat.conversations;
CREATE TABLE chat.conversations(
  "_id" serial PRIMARY KEY,
  "participants" int ARRAY [2] NOT NULL,
  "blackList" boolean ARRAY [2] NOT NULL DEFAULT ARRAY [false, false],
  "favoriteList" boolean ARRAY [2] NOT NULL DEFAULT ARRAY [false, false],
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);
/*  */
DROP TABLE IF EXISTS chat.catalogs;
CREATE TABLE chat.catalogs(
  "_id" serial PRIMARY KEY,
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
  "_id" serial PRIMARY KEY,
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
  (ARRAY [2,3]);
INSERT INTO chat.conversations("participants")
VALUES (ARRAY [1,2]);
UPDATE chat.conversations
SET "favoriteList" [2] = true;
-- 
SELECT *
FROM chat.conversations
WHERE participants = ARRAY [5,3];
-- 
DELETE FROM chat.conversations
WHERE id = 5;
-- 
SELECT array_position("participants", 3)
FROM chat.conversations;
-- 
SELECT DISTINCT ON(c."id") c."id",
  m."sender",
  m."body" AS "text",
  m."createdAt",
  c."participants",
  c."blackList",
  c."favoriteList"
FROM chat.conversations AS c
  JOIN chat.messages AS m ON c.id = m.conversation;
-- 
UPDATE chat.conversations
SET "blackList" [1] = true
WHERE participants = ARRAY [1,3]
RETURNING *;
  /*  */
INSERT INTO "chat"."messages"("sender", "body", "conversation")
VALUES(1, 'hello', 1);
INSERT INTO chat."messages"("sender", "body", "conversation")
VALUES(1, 'hey', 1);
INSERT INTO "chat"."messages" ("sender", "body", "conversation")
VALUES (1, 'test', 1)
RETURNING *;
-- 
SELECT "m".id,
  m.body,
  m.sender,
  m."conversation",
  m."createdAt",
  m."updatedAt"
FROM chat."messages" as "m"
  JOIN chat.conversations as "c" ON m.conversation = c.id
WHERE c.participants = ARRAY [1,  2];
/*  */
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