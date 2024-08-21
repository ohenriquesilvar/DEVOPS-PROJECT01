'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const basename = path.basename(__filename)

const db = {}

const DB_NAME = 'todo_list_db'
const DB_USER = 'backend'
const DB_PASSWORD = 'root'
const DB_HOST = '127.0.0.1'

const sequelize = new Sequelize(
	process.env.DB_NAME || DB_NAME,
	process.env.DB_USER || DB_USER,
	process.env.DB_PASSWORD || DB_PASSWORD,
	{
		host: process.env.DB_HOST || DB_HOST,
		dialect: 'postgres',
		port: process.env.DB_PORT || 5432,
	}
)

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		)
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		)
		db[model.name] = model
	})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
