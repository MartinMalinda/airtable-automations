
import Airtable from "airtable";

const { AIRTABLE_KEY, AIRTABLE_BASE_ID } = process.env;

export const setupBase = () => new Airtable({
  apiKey: AIRTABLE_KEY
})
  .base(AIRTABLE_BASE_ID as string);
