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

  
    const dates = result[0].entities.filter(entity => entity.type === 'DATE');
    // const titles = result[0].entities.filter(entity => entity.type === 'OTHER' || entity.type === 'WORK_OF_ART' || entity.type === 'OTHER');
    return dates;
  }

module.exports = entityExtractor;

// const result = entityExtractor("Oct. 5 – Lecture: Henry Ford and Abner Shutt: Wealth and Work in the Model-T Age")

// result.then(res =>  {
//   // month index is the actual month - 1 
//   const monthIndex = parseInt(res[0].metadata.month - 1);
//   const day = parseInt(res[0].metadata.day);
//   const year = 2021

//   const date = new Date(year, monthIndex, day);
//   console.log(date);
//   }
// );