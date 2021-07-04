class Catalog {
  static _client;
  static _schema = 'chat';
  static _tableName = 'catalogs';

  // static async findOneOrCreate (participants) {
  //   const conversation = await this._client.query(`
  //   SELECT * 
  //   FROM "${this._schema}"."${this._tableName}"
  //   WHERE participants = ARRAY[${participants[0]}, ${participants[1]}];`);

  //   if (conversation.rows.length === 0) {
  //     const createdConversation = await this._client.query(`
  //     INSERT INTO "${this._schema}"."${this._tableName}" ("participants")
  //     VALUES (ARRAY[${participants[0]}, ${participants[1]}])
  //     RETURNING *;
  //   `);
  //     return createdConversation.rows[0];
  //   }
  //   return conversation.rows[0];
  // }
}

module.exports = Catalog;
