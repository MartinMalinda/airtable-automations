import { Handler } from '@netlify/functions';
import { setupBase } from './setup-base';
import validate from 'deep-email-validator';

const base = setupBase();
const table = base.table('Email subscribers');

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 };
  }
  //
  // Error handling
  //
  let inputData: Record<string, any>;
  try {
    inputData = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Could not parse JSON input' })
    };
  }

  const email = inputData.email as string | undefined;
  const { valid } = await validate(email || '');

  if (!valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'This email address does not seem to be valid. Please check the format and try again.'
      })
    };
  }

  //
  // All Good => add record to Airtable
  //

  try {
    // https://support.airtable.com/hc/en-us/articles/360040113434-Using-logical-operators-to-compare-field-values
    const [existingRecord] = await table.select({ filterByFormula: `Email = "${email}"` }).all();

    console.log(existingRecord);

    if (existingRecord) {
      return { statusCode: 400, body: JSON.stringify({ message: 'This email address is already on the list' }) };
    }

    await table.create({
      Email: email
    });

    // All good, send a success response
    return { statusCode: 200, body: '' };
  } catch (e) {
    // Connection to Airtable has failed. Airtable might be down or there's a different issue. Notify the end user.
    console.error(e);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong' })
    };
  }


};

export { handler };
