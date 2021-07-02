/* 
 1.
 Вывести количество юзеров по ролям 
 {admin: 40, customer: 22, …}
 */
SELECT "role",
  count(id)
FROM "Users"
GROUP BY "role";
/* 
 2.
 Всем юзерам с ролью customer, которые осуществляли
 заказы в новогодние праздники в период с 25.12 по 14.01,
 необходимо зачислить по 10% кэшбэка со всех заказов
 в этот период.
 */
UPDATE "Users"
SET "balance" = "balance" + (
    SELECT sum("prize") * 0.1 as "cashBack"
    FROM "Contests"
    WHERE "createdAt" >= '2020/12/25'
      AND "createdAt" <= '2021/01/14'
      AND "Users".id = "userId"
  )
WHERE "role" = 'customer'
  AND "Users".id IN (
    SELECT "userId"
    FROM "Contests"
    WHERE "createdAt" >= '2020/12/25'
      AND "createdAt" <= '2021/01/14'
  );
--  test date: '2021/07/01'   '2021/07/03'
--  task date: '2020/12/25'   '2021/01/14'
/* 
 3.
 Для роли сreative необходимо выплатить 3-м юзерам
 с самым высоким рейтингом по 10$ на их счета. 
 */
UPDATE "Users"
SET "balance" = "balance" + 10
WHERE "role" = 'creator'
  AND "Users".id IN (
    SELECT "id"
    FROM "Users"
    WHERE "role" = 'creator'
    ORDER BY "rating" DESC
    LIMIT 3
  );