import { Sequelize, DataTypes } from "sequelize"
import "dotenv/config"
import createUserModel from "./User.js"
import createNoteModel from "./Note.js"
import createSharedNoteModel from "./SharedNote.js"

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
})

sequelize.authenticate().then(() => {
    console.log('Database connected')
}).catch(err => {
    console.log('Database error: '+ err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = createUserModel(sequelize, DataTypes)
db.note = createNoteModel(sequelize, DataTypes)
db.shared_note = createSharedNoteModel(sequelize, DataTypes)

db.user.belongsToMany(db.note, { through: db.shared_note });
db.note.belongsToMany(db.user, { through: db.shared_note });

db.sequelize.sync({force: false}).then(() => {
    console.log('Sync is complete')
})

export default db