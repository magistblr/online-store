require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000             //либо порт из файла, либо 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

//Обработчик ошибок будет последним
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()                          //функция для подключения к базе данных
    await sequelize.sync()                                  //функция сверяет состояние базы данных со схемой данных
  } catch (e) {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    console.log(e)
  }
}


start()