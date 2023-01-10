const Crypto = require('./crypto');

function decryptPersonData(data){
  if (!data) return data;
  if (data.full_name) {
    data.full_name = Crypto.decrypt(data.full_name);
  }
  if (data.nickname) {
    data.nickname = Crypto.decrypt(data.nickname);
  }
  return data;
  
}

function generateQueryData(data, tableName){
  return `UPDATE "${tableName}" SET ${data.nickname ? (`nickname = '${data.nickname}', `) : ''}full_name = '${data.full_name.trim()}' WHERE id = '${data.id}';`
}

function decryptData(data) {
  const jsonName = Object.entries(data)[0][0];
  const jsonData = Object.entries(data)[0][1];
  const decryptedData = jsonData.map(decryptPersonData);

  const queries = decryptedData.map(
    (professionals) => generateQueryData(professionals, jsonName)
  );

  console.log(queries.join('\n'));
}

module.exports = {decryptData}