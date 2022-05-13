const {Client}=require('@elastic/elasticsearch')
require('dotenv').config()

const client = new Client({
    node: `https://${process.env.ELASTIC_IP}:9200`,
    auth: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    requestTimeout:9999999,
    
  });
  
module.exports = client;