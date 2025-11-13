function matchSlackToGithub(slackTeam, githubOrgs) {
  const slackDomain = slackTeam.domain;
  const matchedOrg = githubOrgs.find(org => org.login.toLowerCase() === slackDomain.toLowerCase());
  return matchedOrg;
}

module.exports = {
  matchSlackToGithub,
};
