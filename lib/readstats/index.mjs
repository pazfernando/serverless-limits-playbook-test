import crypto from 'crypto';

export const handler = async (event, context) => {
  // Log de entrada para depuración
  console.log('Evento recibido:', JSON.stringify(event, null, 2));

  const info = event.queryStringParameters.info;
  
  const uniqueIdentifier = processIdentifier(event);
  
  try {
    await sleep(25000);

    // TODO Demás operaciones que haga su implementación

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `uniqueID=${uniqueIdentifier}; Path=/; HttpOnly`,
        'X-Requested-With': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({ info }),
    };
  } catch (error) {
    console.error('Ocurrió un error al consultar DynamoDB:', error);
    return {
      statusCode: 500,
      headers: {
        'Set-Cookie': `uniqueID=${uniqueIdentifier}; Path=/; HttpOnly`,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({ error: 'No se pudo realizar la consulta' }),
    };
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function processIdentifier(event) {
  var uniqueIdentifier = null;
  if (event.headers) {
    if (event.headers.Cookie) {
      const cookies = event.headers.Cookie || '';
      const uniqueID = cookies.split('; ').find(row => row.startsWith('uniqueID=')).split('=')[1];
      if (uniqueID && uniqueID.lengh > 0) {
        uniqueIdentifier = uniqueID;
      }
    } 
    if (!uniqueIdentifier) {
      var userAgent = event.headers['User-Agent'] || event.headers['user-agent'];
      var clientIp = event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for'];
      console.log('userAgent->' + userAgent);
      console.log('clientIp->' + clientIp);
    }
  } 
  
  if(!uniqueIdentifier && (!userAgent || !clientIp)) {
    userAgent = 'AWSLAmbda';
    clientIp = 'localhost';
  }
  
  if (!uniqueIdentifier) {
    console.log('Generando un nuevo uniqueIdentifier for ' + userAgent + ' and ' + clientIp)
    uniqueIdentifier = crypto.createHash('sha256').update(userAgent + clientIp).digest('hex');
  }
  
  return uniqueIdentifier;
}
