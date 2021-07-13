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
  "chats" int ARRAY,
  "catalogName" varchar(256) NOT NULL
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
