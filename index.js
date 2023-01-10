const {decryptData} = require("./decrypt");

const seniors = require('./data/senior_local');
const professional = require('./data/professional_local');
const user = require('./data/user_local');
const caregiver = require('./data/caregiver_local');

decryptData(professional)