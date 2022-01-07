import request from "request"
const url = "http://localhost:8080/createTable";//Sua URL

request({
  method: 'post',
  preambleCRLF: true,
  postambleCRLF: true,
  uri: url,
  json: { "TableName": "guild_id_000000" }


}, (error, response, body) => {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log('Upload successful!  Server responded with:', body);
})

/* 
request({
  method: 'get',
  preambleCRLF: true,
  postambleCRLF: true,
  uri: url,
  json: { "id": 7 }


}, (error, response, body) => {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log('Upload successful!  Server responded with:', body);
}) */