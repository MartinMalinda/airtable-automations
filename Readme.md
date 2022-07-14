# Prerequisite knowledge

- Git :)
- Opening up terminal
- Basics of JavaScript / TypeScript

If you don't know TypeScript, rename the Netlify functions to `.js` and remove the type annotations.

# Setup

Install Netlify-CLI and login to your Netlify account.

Find your token at [Personal settings](https://airtable.com/account).
Note that the automation scripts will be doing actions on your behalf. You might want to create a separate user with a specific name, if you want to correctly see the activity of these automations in Airtable.

```
netlify env:set AIRTABLE_KEY "Your-Airtable-API-token"
netlify env:set AIRTABLE_BASE_ID "Your-Airtable-Base-Id"
```

https://www.netlify.com/blog/2021/07/12/managing-environment-variables-from-your-terminal-with-netlify-cli/

This will set the environment variables both locally and also on the Netlify server.

## Test it!

```
netlify dev
```

This will set up your Environment variables.

You can open up your browser on the localhost address (most likely http://localhost:8888).

You will be met by a `Not Found` message there but that's okay. Our Netlify server is not serving any HTML file so this is expected.

You can **open the devtools** though. And in the console there fire up test requests to your new endpoint:

```js
fetch('/.netlify/functions/add-subscribers', { method: 'POST', body: JSON.stringify({ email: 'test@email.com' }) });
```
