class Catalog {
  constructor ({ userId, catalogName, chats }) {
    this.userId = userId;
    this.catalogName = catalogName;
    this.chats = chats;
  }

  static _client;
  static _schema = 'chat';
  static _tableName = 'catalogs';

  static async getCatalogs (userId) {
    const { rows } = await this._client.query(`
    SELECT "_id",
      "chats",
      "catalogName"
    FROM "${this._schema}"."${this._tableName}"
      WHERE "userId" = ${userId};`);

    return rows;
  }

  static async updateNameCatalog ({ _id, catalogName }) {
    const { rows } = await this._client.query(`
    UPDATE "${this._schema}"."${this._tableName}"
    SET "catalogName" = '${catalogName}'
    WHERE "_id" = ${_id}
    RETURNING *; `);
    return rows[0];
  }
  
  static async remove ({ _id, userId }) {
    await this._client.query(`
    DELETE FROM "${this._schema}"."${this._tableName}"
    WHERE "_id" = ${_id}
    AND "userId" = ${userId}
     `);
    return;
  }

  async save () {
    const {
      rows: [catalog],
    } = await Catalog._client.query(`
    INSERT INTO "${Catalog._schema}"."${Catalog._tableName}" (
      "userId",
      "chats",
      "catalogName"
    ) VALUES (${this.userId}, ARRAY[${this.chats[0]}], '${this.catalogName}')
    RETURNING *;`);

    return catalog;
  }
}

module.exports = Catalog;
