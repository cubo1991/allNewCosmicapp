const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);