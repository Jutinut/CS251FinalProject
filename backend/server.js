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
          ID: user.CustID,
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

app.post('/regisorder', async (req, res) => {
  const { Phone, Name, City, Address, Weight, Deliver } = req.body;

  try {
    await sql.connect(dbConfig);

    const query = `
      INSERT INTO Parcel (Phone, Name, City, Address, Weight, Deliver)
      VALUES (@Phone, @Name, @City, @Address, @Weight, @Deliver)
    `;

    const request = new sql.Request();
    request.input('Phone', sql.VarChar, Phone);
    request.input('Name', sql.NVarChar, Name);
    request.input('City', sql.NVarChar, City);
    request.input('Address', sql.NVarChar, Address);
    request.input('Weight', sql.FLOAT, Weight);
    request.input('Deliver', sql.VARCHAR, Deliver);

    await request.query(query);

    res.status(201).send('Parcel registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.patch('/update/:CustId', async (req, res) => {
    try {
        const CustId = req.params.CustId;
        const { Name, Phone } = req.body;

        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input('CustId', sql.Int, CustId)
            .input('Name', sql.NVarChar, Name)
            .input('Phone', sql.NVarChar, Phone)
            .query('UPDATE Customer SET Name = @Name, Phone = @Phone WHERE CustID = @CustId');

        if (result.rowsAffected[0] === 0) {
            return res.status(400).json({ success: false, message: 'No rows were updated.' });
        }

        res.json({ success: true, message: 'Customer information updated successfully.' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Failed to update customer information.' });
    }
});

app.get('/order/:ParcelID', async (req, res) => {
    try {
        const { ParcelID } = req.params;
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input('ParcelID', sql.Int, ParcelID)
            .query('SELECT * FROM Parcel WHERE ParcelID = @ParcelID');

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ message: 'No requests found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/orderuser/:Deliver', async (req, res) => {
    try {
        const { Deliver } = req.params;
        const pool = await sql.connect(dbConfig);

        const result = await pool.request()
            .input('Deliver', sql.VARCHAR, Deliver)
            .query('SELECT * FROM Parcel WHERE Deliver = @Deliver');

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ message: 'No requests found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});