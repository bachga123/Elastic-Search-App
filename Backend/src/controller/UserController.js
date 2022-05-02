var cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const esUrl = `https://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.ELASTIC_IP}:9200/`
const shortid = require('shortid')
const client = require('../config/connect')
const Index = require('../model/Index')
var fs = require('fs')
const e = require('method-override')
const { CreateIndexJson } = require('../util/indexToJson')
class UserController {
    createIndex = async (req, res) => {
        try {
            const checkIndexExist = () =>
                new Promise((resolve) => {
                    axios
                        .get(`${esUrl}${req.body.index}`)
                        .then((_) => {
                            resolve(true)
                        })
                        .catch(() => {
                            resolve(false)
                        })
                })

            const ifIndexExist = await checkIndexExist()
            if (!ifIndexExist) {
                const esResponse = await axios.put(
                    `${esUrl}${req.body.index}`,
                    {
                        mappings: {
                            properties: {
                                name: {
                                    type: 'text',
                                },
                                email: {
                                    type: 'text',
                                    fields: {
                                        raw: {
                                            type: 'keyword',
                                        },
                                    },
                                },
                                country: {
                                    type: 'text',
                                },
                                age: {
                                    type: 'integer',
                                },
                                company: {
                                    type: 'text',
                                },
                                jobRole: {
                                    type: 'text',
                                },
                                description: {
                                    type: 'text',
                                },
                                createdAt: {
                                    type: 'date',
                                    fields: {
                                        raw: {
                                            type: 'keyword',
                                        },
                                    },
                                },
                            },
                        },
                    }
                )
                res.json(esResponse.data)
            } else {
                res.json('Index exist already')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    createIndexAndUpData = async (req, res) => {
        try {
            const { filename } = req.file

            const sampleData = require(`../uploads/${filename}`)
            let data = ''
            for (let idx = 0; idx < sampleData.length; idx++) {
                data =
                    data +
                    `{"index":{"_index":"${
                        req.body.indexname
                    }","_id" : "${shortid.generate()}"}}` +
                    '\n'
                data =
                    data +
                    JSON.stringify(sampleData[idx]).replace('\n', '') +
                    '\n'
            }
            const insert = await client.bulk({ body: data })
            const response = await axios.put(`${esUrl}_settings`, {
                index: {
                    max_result_window: 1000000,
                },
            })
            const index = new Index({
                userId: req.user._id,
                nameIndex: req.body.indexname.toLowerCase(),
            })
            index.save((error, indexs) => {
                if (error) console.log(error)
            })
            res.status(201).json(insert)
            /*  res.json({"getalldata":`http://localhost:3000/data/${req.body.indexname}`,"delete":`http://localhost:3000/data/${req.body.indexname}/:id`,"query":`http://localhost:3000/data/${req.body.indexname}?type=matching&jobRole=Human&name=Kristy&country=Egypt`}); */
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    updateData = async (req, res) => {
        try {
            const { filename } = req.file,
                { indexname } = req.body
            const sampleData = require(`../uploads/${filename}`)
            let data = ''
            for (let idx = 0; idx < sampleData.length; idx++) {
                const checkExist = await axios.post(
                    `${esUrl}${indexname}/_search`,
                    {
                        query: {
                            match: {
                                name: sampleData[idx].name,
                            },
                        },
                    }
                )
                if (checkExist.data.hits.total.value === 0) {
                    data =
                        data +
                        `{"index":{"_index":"${indexname}","_id" : "${shortid.generate()}"}}` +
                        '\n'
                    data = data + converData(sampleData[idx]) + '\n'
                } else {
                    const id = checkExist.data.hits.hits[0]._id
                    data =
                        data +
                        `{"update":{"_id" : "${id}","_index":"${indexname}"}}` +
                        '\n'
                    data =
                        data + `{"doc":${converData(sampleData[idx])}}` + '\n'
                }
            }
            const insert = await client.bulk({ body: data })
            res.status(200).json(insert)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    searchDataIndex = async (req, res) => {
        try {
            let response,
                match = {},
                query = [],
                bool = {}
            const { type, id, operator, size } = req.body
            delete match.type
            switch (type) {
                case 'sorting':
                    response = await axios.post(
                        `${esUrl}${req.params.index}/_search`,
                        {
                            sort: {
                                createdAt: 'desc',
                            },
                        }
                    )
                    break

                case 'matching':
                    Object.keys(req.body).map((key, index) => {
                        Object.assign(match, {
                            match: { [key]: req.body[key] },
                        })
                    })
                    response = await axios.post(
                        `${esUrl}${req.params.index}/_search`,
                        {
                            query: match,
                        }
                    )
                    break

                case 'multi-matching':
                    Object.keys(req.body).map((key, index) => {
                        Object.assign(match, {
                            match: { [key]: req.body[key] },
                        })
                        query.push({ match: { [key]: req.body[key] } })
                    })
                    query = query.slice(3)
                    if (operator === 'and') {
                        Object.assign(bool, { must: query })
                    } else {
                        Object.assign(bool, { should: query })
                    }
                    response = await axios.post(
                        `${esUrl}${req.params.index}/_search?scroll=10m`,
                        {
                            size: parseInt(size),
                            track_total_hits: true,
                            query: {
                                bool: bool,
                            },
                        }
                    )
                    break;
                default:
                    response = await axios.post(
                        `${esUrl}${req.params.index}/_search?scroll=10m`,
                        {
                            size: parseInt(size),
                            track_total_hits: true,
                            query: {
                                match_all: {},
                            },
                        }
                    )
                    break
            }

            res.status(200).json(response.data)
            /* res.json(response.data.hits.hits);  */
        } catch (error) {
            console.log(error)
        }
    }
    searchMultiField = async (req, res) => {
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=1h`,
                {
                    size: 2,
                    query: {
                        multi_match: req.body,
                    },
                }
            )
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    searchAllField = async (req, res) => {
        const query = {
            query_string: {
                query: '*' + req.body.input + '*',
            },
        }
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=1h`,
                {
                    size: 10000,
                    query: query,
                }
            )
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    searchAdvanced = async (req, res) => {
        const { query } = req.body
        try {
            let response = await axios.post(
                `${esUrl}${req.params.index}/_search?scroll=1h`,
                {
                    size: 10000,
                    query: {
                        simple_query_string: {
                            query: query,
                        },
                    },
                }
            )
            res.status(200).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deteleRecord = async (req, res) => {
        try {
            const response = await axios.delete(
                `${esUrl}${req.params.index}/_doc/${req.params.id}`
            )
            res.status(204).json(response.data);
        } catch (error) {
            res.json(error);
        }
    }
    deleteRecords = async (req, res) => {
        try {
            const response = await axios.post(
                `${esUrl}${req.params.index}/_delete_by_query`,
                {
                    query: req.body,
                }
            )
            res.status(204).json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deleteIndex = async (req, res) => {
        try {
            Index.deleteOne({ nameIndex: req.params.index }).exec(
                (error, result) => {
                    if (error) return res.status(400).json({ error })
                    console.log(result)
                }
            )

            const response = await client.indices.delete({
                index: req.params.index,
            })
            res.status(204).json(response)
        } catch (error) {
            res.json(error.data.error)
        }
    }
    getAllIndex = async (req, res) => {
        let listIndex = ''
        const index = await Index.find({ userId: req.user._id })
            .select('nameIndex')
            .exec()
        index.map(
            (item) =>
                (listIndex = listIndex + item.nameIndex.toLowerCase() + ',')
        )
        if (listIndex === '') {
            res.json([])
        }
        try {
            const response = await axios.get(
                `${esUrl}_cat/indices/${listIndex}`
            )
            const allIndex = response.data.replace(/\n/g, ' ').split(' ')
            const temp = allIndex.filter((word) => word.length > 0)
            const result = CreateIndexJson(temp)
            res.json(result)
        } catch (error) {
            console.log(error.response)
        }
    }
    nextPage = async (req, res) => {
        const { scroll_id } = req.body
        const response = await client.scroll({
            scroll_id: scroll_id,
            scroll: '1h',
        })
        res.json(response)
    }
}
function pagination(items, page = 1, perPage = 8) {
    const previousItem = (page - 1) * Number(perPage)
    return {
        result: {
            items: items.slice(previousItem, previousItem + Number(perPage)),
            totalPage: Math.ceil(items.length / Number(perPage)),
            currentPage: page,
            totalItem: items.length,
        },
    }
}

function converData(data) {
    return JSON.stringify(data).replace('\n', '')
}
module.exports = new UserController()
