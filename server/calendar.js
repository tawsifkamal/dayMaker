const oAuth2Client = require('./oAuth.js');
const { google } = require('googleapis');

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

/**
 * Creates an event in the users google calendar. 
 * 
 * @param {*} year 
 * @param {*} monthIndex 
 * @param {*} day 
 * @param {*} title 
 * @returns 
 */
const createEvent = (year, monthIndex, day, title) => {
  let date = new Date(year, monthIndex, day);
  date = date.toISOString().substring(0, 10);

  return {
    summary: title,
    start: {
      date: date,
      timeZone: 'America/New_York',
    },
    end: {
      date: date,
      timeZone: 'America/New_York',
    },
  }
}

const insertEvent = (event) => {
  calendar.events.insert(
    { calendarId: 'primary', resource: event },
    err => {
      // Check for errors and log them if they exist.
      if (err) return console.error('Error Creating Calender Event:', err)
      // Else log that the event was created.
      return console.log(`Calendar event successfully created on ${event.start.date}`)
    }
  ) 
}

module.exports.insertEvent = insertEvent;
module.exports.createEvent = createEvent;


  