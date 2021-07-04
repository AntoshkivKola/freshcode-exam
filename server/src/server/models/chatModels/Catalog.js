class Catalog {
  constructor ({ userId, catalogName, chats }) {
    this.userId = userId;
    this.catalogName = catalogName;
    this.chats = chats;
  }

  static _client;
  static _schema = 'chat';
  static _tableName = 'catalogs';
  static _mtmTableName = 'catalogsToConversations';

  async save () {
    const { rows: [catalog] } = await Catalog._client.query(`
    INSERT INTO "${Catalog._schema}"."${Catalog._tableName}" (
      "userId",
      "catalogName"
    ) VALUES (${this.userId}, '${this.catalogName}')
    RETURNING *;`);
    
    
    const catalogsValuesString = this.chats.map(chatId => `(${catalog._id}, ${chatId})`).join(',');
    const { rows } = await Catalog._client.query(`
    INSERT INTO "${Catalog._schema}"."${Catalog._mtmTableName}" (
      "catalogId",
      "conversationId"
    ) VALUES ${catalogsValuesString}
    RETURNING *;`);
    catalog.chats = this.chats;  
    return catalog;
  }
}

module.exports = Catalog;
