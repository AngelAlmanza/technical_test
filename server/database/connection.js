import { Sequelize } from 'sequelize'

const db = new Sequelize('technical_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db
