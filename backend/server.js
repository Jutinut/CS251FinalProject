const express = require('express');
const sql = require('mssql');
const dbConfig = require('./dbConfig');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5501',
  method: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

sql.connect(dbConfig).then(pool => {
    console.log('Connected to the database.');   
}).catch(error => {
    console.error('Database connection failed:', error);
});

app.post('/register', async (req, res) => {
  const { Username, Password, Name, Address, Phone } = req.body;

  try {
    await sql.connect(dbConfig);

    const query = `
      INSERT INTO Customer (Username, Password, Name, Address, Phone)
      VALUES (@Username, @Password, @Name, @Address, @Phone)
    `;

    const request = new sql.Request();
    request.input('Username', sql.VarChar, Username);
    request.input('Password', sql.VarChar, Password);
    request.input('Name', sql.NVarChar, Name);
    request.input('Address', sql.NVarChar, Address);
    request.input('Phone', sql.VarChar, Phone);

    await request.query(query);

    res.status(201).send('Customer registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    await sql.connect(dbConfig);

    const query = `
      SELECT * FROM Customer 
      WHERE Username = @username AND Password = @password
    `;

    const request = new sql.Request();
    request.input('Username', sql.VarChar, Username);
    request.input('Password', sql.VarChar, Password);

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.status(200).json({
        status: 'success',
        user: {
          Name: user.Name,
          Address: user.Address,
          Phone: user.Phone
        }
      });
    } else {
      res.status(401).json({ status: 'failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});