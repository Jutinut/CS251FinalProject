const express = require('express');
const sql = require('mssql');
const dbConfig = require('./dbConfig');
const app = express();

sql.connect(dbConfig).then(pool => {
    console.log('Connected to the database.');   
}).catch(error => {
    console.error('Database connection failed:', error);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});