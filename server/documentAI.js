const fs = require('fs').promises;
const eol = require('eol');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const { insertEvent, createEvent } = require('./calendar');
const entityExtractor = require('./entityExtractor.js');
const config = require('./config');

const client = new DocumentProcessorServiceClient();

async function processDocument(filePath) {
  const name = `projects/${config.projectId}/locations/${config.location}/processors/${config.processorId}`;
  const imageFile = await fs.readFile(filePath);
  const encodedImage = Buffer.from(imageFile).toString('base64');

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: 'application/pdf',
    },
  };

  try {
    const [result] = await client.processDocument(request);
    return result.document;
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

function getText(textAnchor, text) {
  if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
    return '';
  }
  const startIndex = textAnchor.textSegments[0].startIndex || 0;
  const endIndex = textAnchor.textSegments[0].endIndex;
  return text.substring(startIndex, endIndex);
}

async function extractAndCreateEvents(document) {
  const { text } = document;
  const [page1] = document.pages;
  const { paragraphs } = page1;

  for (const paragraph of paragraphs) {
    const paragraphText = getText(paragraph.layout.textAnchor, text);
    const entity = await entityExtractor(paragraphText);

    if (entity.length > 0) {
      const lines = eol.split(paragraphText);
      for (const line of lines) {
        await processLine(line);
      }
    }
  }
}

async function processLine(line) {
  const lineEntity = await entityExtractor(line);

  if (lineEntity.length > 0) {
    let title = line.replace(lineEntity[0].name, '').replace('–', '').trim();
    const { month, day } = lineEntity[0].metadata;

    if (month && day) {
      console.log('Event Detected!');
      const event = createEvent(2021, month - 1, day, title);
      await insertEvent(event);
    } else {
      console.log('No month/day was specified. This event cannot be created.');
    }
  }
}

const documentAI = async function (filePath) {
  try {
    const document = await processDocument(filePath);
    await extractAndCreateEvents(document);
  } catch (error) {
    console.error('An error occurred in the documentAI function:', error);
  }
};

module.exports = documentAI;
