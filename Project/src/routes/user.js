const express = require('express')
const UserController = require('../controller/UserController')
const { requireSignin } = require('../middleware')
const router = express.Router()
const path = require('path')
const shortid = require('shortid')
const { validateSigninRequest, isRequestValidated } = require('../validator/auth')
var multer = require('multer')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename(req, file, cb) {
        cb(null,`${shortid.generate()}-${file.originalname}`)
    },
})
const upload = multer({ storage })
router.post(
    '/create-index',requireSignin,UserController.createIndex
)
router.post(
    `/data`,requireSignin,upload.single('dataindex'),UserController.createIndexAndUpData
)
router.post(
    `/data/:index`,requireSignin,UserController.searchDataIndex
)
router.post(
    `/search/:index`,requireSignin,UserController.searchMultiField
)
router.delete(
    `/data/:index/:id`,requireSignin,UserController.deteleRecord
)
router.post(
    `/data/:index/ids`,requireSignin,UserController.deleteRecords
)
router.delete(
    `/:index`,requireSignin,UserController.deleteIndex
)
router.get(
    `/indexs`,requireSignin,UserController.getAllIndex
)
router.post(
    `/data/index/nextpage`,requireSignin,UserController.nextPage
)
module.exports = router