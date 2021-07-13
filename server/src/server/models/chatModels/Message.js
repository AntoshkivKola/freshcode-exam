class Message {
  constructor ({ sender, body, conversation }) {
    this.sender = sender;
    this.body = body;
    this.conversation = conversation;
    this.createdAt = new Date().toString();
    this.updatedAt = new Date().toString();
  }

  static _client;
  static _schema = 'chat';
  static _tableName = 'messages';

  static async getMessages (participants) {
    const { rows } = await this._client.query(`
    SELECT m."_id",
      m."body",
      m."sender",
      m."conversation",
      m."createdAt",
      m."updatedAt"
    FROM "${this._schema}"."${this._tableName}" as m
    JOIN chat.conversations as c ON m.conversation = c."_id"
    WHERE c.participants = ARRAY[${participants[0]}, ${participants[1]}];`);
    return rows;
  }

  async save () {
    const { rows } = await Message._client.query(`
    INSERT INTO "${Message._schema}"."${Message._tableName}" (
      "sender",
      "body", 
      "conversation"
    ) VALUES (${this.sender}, '${this.body}', ${this.conversation})
    RETURNING *;`);
    return rows;
  }
}

module.exports = Message;
