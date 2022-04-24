const {Client}=require('@elastic/elasticsearch')
require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new Client({
    node: `https://${process.env.ELASTIC_IP}:9200`,
    auth: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    },
    ssl: {
      rejectUnauthorized: true,
    },
  });
  
module.exports = client;