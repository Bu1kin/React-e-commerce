const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// если функцию мы не вызываем, а передаем как объект, то мы не ставим круглые скобки
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router