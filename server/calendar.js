const oAuth2Client = require('./oAuth.js');
const { google } = require('googleapis');

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

/**
 * Creates an event object suitable for the Google Calendar API.
 * 
 * @param {number} year - The year of the event.
 * @param {number} monthIndex - The month index (0-11).
 * @param {number} day - The day of the month.
 * @param {string} title - The title/summary of the event.
 * @returns {Object} The event object formatted for Google Calendar.
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

/**
 * Inserts an event into the user's primary Google Calendar.
 *
 * @param {Object} event - The event object to insert.
 * @param {Object} event.summary - The title of the event.
 * @param {Object} event.start - The start time object.
 * @param {string} event.start.date - The start date in 'YYYY-MM-DD' format.
 * @param {string} event.start.timeZone - The time zone for the start date.
 * @param {Object} event.end - The end time object.
 * @param {string} event.end.date - The end date in 'YYYY-MM-DD' format.
 * @param {string} event.end.timeZone - The time zone for the end date.
 */
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


  