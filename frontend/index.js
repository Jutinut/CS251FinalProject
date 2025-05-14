const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// node --watch index.js
// http://localhost:5501