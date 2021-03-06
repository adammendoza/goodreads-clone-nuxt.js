'use strict'
module.exports = (sequelize, DataTypes) => {
  const Contents = sequelize.define(
    'Contents',
    {
      idx: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      user_idx: {
        type: DataTypes.BIGINT
      },
      post_idx: {
        type: DataTypes.BIGINT
      },
      original_name: {
        type: DataTypes.STRING(255)
      },
      fileName: {
        type: DataTypes.STRING(255)
      },
      filePath: {
        type: DataTypes.STRING(255)
      },
      created_at: {
        type: DataTypes.TIME
      }
    },
    {
      tableName: 'contents',
      timestamps: false
    }
  )
  Contents.associate = function(models) {
    models.Posts.belongsTo(models.Contents, {
      foreignKey: 'idx'
    })
  }
  return Contents
}
