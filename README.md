# Nuxt Example

Deploy your [Nuxt](https://nuxt.com) project to Vercel with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nuxtjs&template=nuxtjs)

_Live Example: https://nuxtjs-template.vercel.app_

Look at the [Nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

---

# 🌐 https://hatespeech-detector.vercel.app/

## Hate Speech Detection Setup

### Requirements to run the application:

- have a locally running instance of ollama
- or have it runnning in colab with the following link: https://colab.research.google.com/drive/1oSSNt6Osme6FRXpRy9wTRKi2t433EQXB?usp=sharing


- have pulled the ```dolphin-mistral:7b-v2.6-dpo-laser-q5_1``` on that instance (or pull through the ui later)


Then you can either
- start the server as written below or
- use the app directly via https://hatespeech-detector.vercel.app/

### Troubleshooting
If you get a connection error, this is probably because you didn't connect the ollama instance properly
- check if the ollama instance is running
- check the console of the browser for detailed errors
- make sure the correct model is pulled on the ollama instance (and finished. The model is a few GB in size)
- pulling through the ui seems to sometimes have issues, ideally pull the model directly with ```ollama pull [modelname]```
- you might have to run ```ollama serve``` to expose the api

---

## General Setup (standard docs)

Make sure to install the dependencies:

```bash
# yarn
yarn

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment#presets) for more information.
