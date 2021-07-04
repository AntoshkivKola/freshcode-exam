class Conversation {
  static _client;
  static _schema = 'chat';
  static _tableName = 'conversations';

  static async findOneOrCreate (participants) {
    const conversation = await this._client.query(`
      SELECT * 
      FROM "${this._schema}"."${this._tableName}"
      WHERE participants = ARRAY[${participants[0]}, ${participants[1]}];`);

    if (conversation.rows.length === 0) {
      const createdConversation = await this._client.query(`
        INSERT INTO "${this._schema}"."${this._tableName}" ("participants")
        VALUES (ARRAY[${participants[0]}, ${participants[1]}])
        RETURNING *;`);
      return createdConversation.rows[0];
    }
    return conversation.rows[0];
  }

  static async getPreview () {
    const { rows } = await this._client.query(`
    SELECT DISTINCT ON(c."id") c."id",
      m."sender",
      m."body" AS "text",
      m."createdAt",
      c."participants",
      c."blackList",
      c."favoriteList"
    FROM "${this._schema}"."${this._tableName}" AS c
      JOIN chat.messages AS m ON c.id = m.conversation;`);

    return rows;
  }
}

module.exports = Conversation;
