async function entityExtractor(textEntities) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    const text = textEntities;
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const result = await client.analyzeEntities({document: document});

  
    return result[0].entities.filter(entity => entity.type === 'DATE');
    
  }

module.exports = entityExtractor;

