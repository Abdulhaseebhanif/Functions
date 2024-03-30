const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const formData = JSON.parse(event.body);

    const payload = {
      inputs: [
        {
          properties: formData,
          associations: {}
        }
      ]
    };
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat-na1-521a158f-3706-4f18-8361-4a942d011c68' // Update this line with 'Bearer' prefix
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to send data to HubSpot');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data sent to HubSpot successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
