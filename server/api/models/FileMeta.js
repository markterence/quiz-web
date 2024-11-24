module.exports = {
  attributes: {
    filename: {
      type: 'string',
      columnType: 'text',
      allowNull: false
    },
    file_uuid: {
      type: 'string',
      columnType: 'text',
      allowNull: false
    },
    size: {
      type: 'number',
      columnType: 'bigint'
    },
    type: {
      type: 'string'
    },
    fd: {
      type: 'string',
      // Sails requires a size for TEXT columnType.
      // columnType: 'text',
      unique: true,
      required: true,
      allowNull: false
    }
  },
  tableName: 'ip_filemeta'
}
