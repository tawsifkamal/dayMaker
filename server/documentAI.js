const fs = require('fs');
const entityExtractor = require("./entityExtractor.js");
const projectId = 'peerless-haiku-291412';
const location = 'us'; // Format is 'us' or 'eu'
const processorId = '83eb2115a9ff84ef'; // Create processor in Cloud Console
const filePath = 'uploads/__target.pdf';
const eol = require("eol");
const { insertEvent } = require('./calendar');
const { createEvent } = require('./calendar');

const {DocumentProcessorServiceClient} =
  require('@google-cloud/documentai').v1;

// Instantiates a client
// apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
// const client = new DocumentProcessorServiceClient({apiEndpoint: 'eu-documentai.googleapis.com'});
const client = new DocumentProcessorServiceClient();

const documentAI = async function() {
  // The full resource name of the processor, e.g.:
  // projects/project-id/locations/location/processor/processor-id
  // You must create new processors in the Cloud Console first
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // Read the file into memory.
  const fs = require('fs').promises;
  const imageFile = await fs.readFile(filePath);

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(imageFile).toString('base64');

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: 'application/pdf',
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);
  const {document} = result;

  //Get all of the document text as one big string
  const {text} = document;
  // Extract shards from the text field
  const getText = textAnchor => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return '';
    }
    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;
    return text.substring(startIndex, endIndex);
  };
  // Read the text recognition output from the processor
  const [page1] = document.pages;
  const {paragraphs} = page1;
  
  for (const paragraph of paragraphs) {
    const paragraphText = getText(paragraph.layout.textAnchor);
    const entity = await entityExtractor(paragraphText);

    // Checking if the entity objecdt has a type date property
    if (entity.length != 0) {
      // console.log("\n===================== Section With Date ===============");
      // console.log('>>>>>>>> Paragraph <<<<<<<<<<')
      // console.log(paragraphText);

      // split paragraph into lines 
      let lines =  eol.split(paragraphText);

      for (const [index, line] of lines.entries()) {
        const lineEntity = await entityExtractor(line);
        
        if (lineEntity.length != 0) {
          // console.log(`********* Line ${index + 1} Date *********`);
          // console.log(lineEntity[0].name);

          // Finding the title of that line with a date entity
          let title = line.replace(lineEntity[0].name, "");
          title = title.replace("–", "");

          // MonthIndex is actually one less than the actual month (Jan starts at 0)
          const monthIndex = parseInt(lineEntity[0].metadata.month - 1);
          const day = parseInt(lineEntity[0].metadata.day);
          const year = 2021;

          if (isNaN(monthIndex) || isNaN(day)) {
              console.log("No month/day was specified. This event cannot be created.")
          } else {
              console.log("Event Detected!");
              const event = createEvent(year, monthIndex, day, title);
              insertEvent(event);
          }
          
          // console.log(`>>>>>>>>>>>>>>>>> TITLE FOR LINE ${index + 1} DATE <<<<<<<<<<<<<<<<<<<<`)
          // console.log(title);
        }
      }
    }
  } 
}

module.exports = documentAI;


