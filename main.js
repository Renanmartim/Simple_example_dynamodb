const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB();

const table = dynamoDb.createTable({
  TableName: 'my-table',
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    Reads: 5,
    Writes: 5
  }
});

table.on('createTableComplete', (event) => {
  console.log('Table created successfully.');
});

table.on('error', (error) => {
  console.log('Error creating table:', error);
});

const item = {
  id: '1',
  name: 'John Doe',
  age: 30
};

table.putItem(item, (err, data) => {
  if (err) {
    console.log('Error inserting item:', err);
  } else {
    console.log('Item inserted successfully.');
  }
});

const params = {
  Key: {
    id: '1'
  }
};

table.getItem(params, (err, data) => {
  if (err) {
    console.log('Error retrieving item:', err);
  } else {
    console.log('Item retrieved successfully:', data);
  }
});
