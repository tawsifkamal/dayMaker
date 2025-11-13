const { createApiRequest } = require('./utils');

async function getSlackTeamInfo(accessToken) {
  const api = createApiRequest(accessToken);
  try {
    const response = await api.get('https://slack.com/api/team.info');
    return response.data.team;
  } catch (error) {
    console.error('Error fetching Slack team info:', error);
    throw error;
  }
}

module.exports = {
  getSlackTeamInfo,
};
