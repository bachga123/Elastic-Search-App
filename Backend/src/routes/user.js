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
/* router.post(
    '/create-index',requireSignin,UserController.createIndex
) */
router.post(
    `/index`,requireSignin,upload.single('dataindex'),UserController.createIndexAndUpData
)
router.put(
    `/index`,upload.single('dataindex'),UserController.updateData
)
router.get(
    `/datas/:index`,UserController.searchDataIndex
)
/* router.post(
    `/search/:index`,UserController.searchAllField
) */
router.post(
    `/searchadvanced/:index`,UserController.searchAdvanced
)
router.post(
    `/searchs/:index`,UserController.searchAllField
)
router.delete(
    `/:index/:id`,UserController.deteleRecord
)
router.post(
    `/:index/ids`,requireSignin,UserController.deleteRecords
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