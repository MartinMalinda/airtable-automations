# What you need to know

- Git :)
- Terminal basics
- JavaScript / TypeScript

If you don't know TypeScript, rename the Netlify functions to `.js` and remove the type annotations.

# Setup

Setup Netlify-CLI and login to your Netlify account.

Connect to Netlify site:
```
netlify init
```

Find your token at [Personal settings](https://airtable.com/account).
Note that the automation scripts will be doing actions on your behalf.

(You might want to create a separate user with a specific name, if you want to correctly see the activity of these automations in Airtable)

Set the environment variables through the cli. It will set set up them both locally and also on the server:
```
netlify env:set AIRTABLE_KEY "Your-Airtable-API-token"
netlify env:set AIRTABLE_BASE_ID "Your-Airtable-Base-Id"
```

https://www.netlify.com/blog/2021/07/12/managing-environment-variables-from-your-terminal-with-netlify-cli/

## Run it!

```
netlify dev
```

You can open up your browser on the localhost address (most likely http://localhost:8888).

You will be met by a `Not Found` message there but that's okay. Our Netlify server is not serving any HTML files so this is expected.

You can **open the devtools** though. And in the console there fire up test requests to your new endpoint:

```js
fetch('/.netlify/functions/add-subscribers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'test@email.com' }) });
```

For better testing you can set up a shortcut:
```js
const post = (data) => fetch('/.netlify/functions/add-subscriber', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data));
```

Then you can just do in the console
```js
post({ email: 'your@email.com' });
```

## Thanks!

Read more at: https://automation-docs.martinmalinda.cz/
https://twitter.com/martinmalindacz
https://www.linkedin.com/in/martin-malinda-58b03253/


