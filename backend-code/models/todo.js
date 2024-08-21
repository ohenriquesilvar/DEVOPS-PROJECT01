'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
	}

	Todo.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at', // Nome da coluna no banco de dados
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at', // Nome da coluna no banco de dados
			},
			deletedAt: {
				type: DataTypes.DATE,
				field: 'deleted_at', // Nome da coluna no banco de dados
			},
			isFinished: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				field: 'is_finished', // Nome da coluna no banco de dados
			},
		},
		{
			sequelize,
			modelName: 'Todo',
			timestamps: true, // Habilita os campos createdAt e updatedAt
			paranoid: true, // Habilita o soft delete com deletedAt
			tableName: 'todos', // Nome da tabela no banco de dados
		}
	)

	return Todo
}
