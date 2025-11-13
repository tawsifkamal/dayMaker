const { createApiRequest } = require('./utils');

async function getGithubOrgs(accessToken) {
  const api = createApiRequest(accessToken);
  try {
    const response = await api.get('https://api.github.com/user/orgs');
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub orgs:', error);
    throw error;
  }
}

async function getOrgRepos(org, accessToken) {
  const api = createApiRequest(accessToken);
  try {
    const response = await api.get(`https://api.github.com/orgs/${org}/repos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching repos for org ${org}:`, error);
    throw error;
  }
}

module.exports = {
  getGithubOrgs,
  getOrgRepos,
};
