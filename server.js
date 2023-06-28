const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Azure SQL Server configuration
const config = {
  server: 'testangularsample.database.windows.net',
  database: 'angular-sample-test',
  user: 'admintest',
  password: 'To0lagen@5',
  port: 1433,
  options: {

 encrypt: true

            }
};

// Default route handler
app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  
  // API endpoints
  app.get('/api/items', async (_, res) => { // Use underscore (_) instead of req to indicate that the parameter is intentionally unused
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Items');
      res.json(result.recordset);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error retrieving items from the database.');
    }
  });
  

  app.post('/api/items', async (req, res) => {
    try {
      const { name, description } = req.body;
      const pool = await sql.connect(config);
      await pool
        .request()
        .input('name', sql.VarChar, name)
        .input('description', sql.VarChar, description)
        .query('INSERT INTO Items (Name, Description) VALUES (@name, @description)');
  
      // Return the created item as a response
      const createdItem = { name, description };
      res.status(201).json(createdItem);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error creating item in the database.');
    }
  });
  

  app.put('/api/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const pool = await sql.connect(config);
  
      const updateQuery = `UPDATE Items SET Name = @name, Description = @description WHERE Id = @id`;
      const request = pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.VarChar, name)
        .input('description', sql.VarChar, description);
  
      const result = await request.query(updateQuery);
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Item not found.' });
      }
  
      // Retrieve the updated item from the database
      const getItemQuery = 'SELECT * FROM Items WHERE Id = @id';
      const getItemRequest = pool.request()
        .input('id', sql.Int, id);
      const getItemResult = await getItemRequest.query(getItemQuery);
  
      // Get the first row from the result set (assuming ID is unique)
      const updatedItem = getItemResult.recordset[0];
  
      res.json(updatedItem);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error updating item in the database.');
    }
  });
  
  
  
  

app.delete('/api/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await sql.connect(config);
      await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Items WHERE Id = @id');
      res.json({ message: 'Item deleted successfully' }); // Return a JSON response
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error deleting item from the database.' }); // Return a JSON error response
    }
  });
  

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
