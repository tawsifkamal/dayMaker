// Import necessary modules
const fs = require('fs');
const entityExtractor = require("./entityExtractor.js");
const projectId = 'peerless-haiku-291412';
const location = 'us'; // Format is 'us' or 'eu'
const processorId = '83eb2115a9ff84ef'; // Create processor in Cloud Console
const filePath = 'uploads/__target.pdf';
const eol = require("eol");
const { insertEvent } = require('./calendar');
const { createEvent } = require('./calendar');

// Import the Google Cloud Document AI client library
const {DocumentProcessorServiceClient} =
  require('@google-cloud/documentai').v1;

// Instantiates a client for the Document AI API
const client = new DocumentProcessorServiceClient();

// The main function that processes the PDF with Document AI
const documentAI = async function() {
  // The full resource name of the processor
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  // Read the file into memory.
  const fs = require('fs').promises;
  const imageFile = await fs.readFile(filePath);

  // Convert the image data to a Buffer and base64 encode it.
  const encodedImage = Buffer.from(imageFile).toString('base64');

  // Create the request object for the Document AI API
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

  // Helper function to extract text from a text anchor
  const getText = textAnchor => {
    if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
      return '';
    }
    // First shard in document doesn't have startIndex property
    const startIndex = textAnchor.textSegments[0].startIndex || 0;
    const endIndex = textAnchor.textSegments[0].endIndex;
    return text.substring(startIndex, endIndex);
  };

  // Get the first page of the document
  const [page1] = document.pages;
  const {paragraphs} = page1;
  
  // Iterate over each paragraph in the document
  for (const paragraph of paragraphs) {
    const paragraphText = getText(paragraph.layout.textAnchor);
    const entity = await entityExtractor(paragraphText);

    // Check if the paragraph contains a date entity
    if (entity.length != 0) {
      // Split the paragraph into lines
      let lines =  eol.split(paragraphText);

      // Iterate over each line in the paragraph
      for (const [index, line] of lines.entries()) {
        const lineEntity = await entityExtractor(line);
        
        // Check if the line contains a date entity
        if (lineEntity.length != 0) {
          // Extract the title of the event from the line
          let title = line.replace(lineEntity[0].name, "");
          title = title.replace("–", "");

          // Extract the date from the entity metadata
          const monthIndex = parseInt(lineEntity[0].metadata.month - 1);
          const day = parseInt(lineEntity[0].metadata.day);
          const year = 2021;

          // Check if the date is valid
          if (isNaN(monthIndex) || isNaN(day)) {
              console.log("No month/day was specified. This event cannot be created.")
          } else {
              // Create a Google Calendar event
              console.log("Event Detected!");
              const event = createEvent(year, monthIndex, day, title);
              insertEvent(event);
          }
        }
      }
    }
  } 
}

// Export the documentAI function
module.exports = documentAI;
