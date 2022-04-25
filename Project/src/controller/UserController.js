var cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const esUrl = `https://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.ELASTIC_IP}:9200/`
const shortid = require('shortid')
const client = require('../config/connect')
const Index = require('../model/Index')
var fs = require('fs');
const e = require('method-override')
class UserController{
    createIndex= async (req, res)=>{
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
                const esResponse = await axios.put(`${esUrl}${req.body.index}`, {
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
                })
                res.json(esResponse.data)
            } else {
                res.json('Index exist already')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    createIndexAndUpData= async (req, res) =>{
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
                    data + JSON.stringify(sampleData[idx]).replace('\n', '') + '\n'
            }
            const insert = await client.bulk({ body: data })
            console.log('toi dat')
            const index=new Index({
                userId:req.user._id,
                nameIndex:req.body.indexname
            })
            index.save((error,indexs)=>{
                if(error) return res.json({error})
            })
            res.json(insert)
            /*  res.json({"getalldata":`http://localhost:3000/data/${req.body.indexname}`,"delete":`http://localhost:3000/data/${req.body.indexname}/:id`,"query":`http://localhost:3000/data/${req.body.indexname}?type=matching&jobRole=Human&name=Kristy&country=Egypt`}); */
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    searchDataIndex=async (req, res)=>{
        try {
            let response
            let match = {}
            let query = []
            let bool = {}
            const { type, id, operator } = req.body
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
                        Object.assign(match, { match: { [key]: req.body[key] } })
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
                        Object.assign(match, { match: { [key]: req.body[key] } })
                        query.push({ match: { [key]: req.body[key] } })
                    })
                    query = query.slice(2)
                    console.log(query)
                    if (operator === 'and') {
                        Object.assign(bool, { must: query })
                    } else {
                        Object.assign(bool, { should: query })
                    }
                    response = await axios.post(
                        `${esUrl}${req.params.index}/_search?scroll=10m`,
                        
                        {
                            size:30,
                            query: {
                                bool: bool,
                            },
                        }
                    )
                    break
    
                default:
                    response = await axios.get(
                        `${esUrl}${req.params.index}/_search?scroll=10m`
                    )
                    break
            }
            
            res.json(response.data)
            /* res.json(response.data.hits.hits);  */
        } catch (error) {
            res.json(error)
        }
    }
    searchMultiField= async (req, res) => {
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
            res.json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deteleRecord= async (req, res) => {
        try {
            const response = await axios.delete(
                `${esUrl}${req.params.index}/_doc/${req.params.id}`
            )
            res.json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deleteRecords= async (req, res) => {
        try {
            const response = await axios.post(
                `${esUrl}${req.params.index}/_delete_by_query`,
                {
                    query: req.body,
                }
            )
            res.json(response.data)
        } catch (error) {
            res.json(error)
        }
    }
    deleteIndex= async (req, res) => {
        try {
            const response = await client.indices.delete({
                index: req.params.index,
            })
            res.json(response)
        } catch (error) {
            res.json(error)
        }
    }
    getAllIndex= async (req, res) => {
        let listIndex=''
        const index=await Index.find({userId:req.user._id})
                .select('nameIndex')
                .exec()
        index.map(item=>listIndex=listIndex+item.nameIndex+",")
        try {
            const response = await axios.get(`${esUrl}_cat/indices/${listIndex}`)
            const allIndex = response.data.replace(/\n/g, ' ').split(' ')
            const result = allIndex.filter((word) => word.length > 0) 
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    }
    nextPage=async (req,res)=>{
        const {scroll_id}=req.body;
        const response=await client.scroll({scroll_id:scroll_id,scroll:'1h'})
        console.log(response)
        res.json(response)
    }
}
module.exports = new UserController()