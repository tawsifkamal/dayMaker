const express = require('express');
const app = express();
const upload = require('express-fileupload');
const { getGithubOrgs, getOrgRepos } = require('./github');
const { getSlackTeamInfo } = require('./slack');
const { matchSlackToGithub } = require('./matcher');
app.use(upload());

// get driver connection
app.use(express.static('public'));

app.post('/', (req, res) => {
  console.log('route reached');
  if (req.files) {
    let file = req.files.file;

    file.mv('./uploads/' + '__target.pdf', err => {
      if (err) {
        console.log(err);
      } else {
        documentAI();
        console.log('File worked');
      }
    });
  }
  res.redirect('https://calendar.google.com');
});

app.get('/repositories', async (req, res) => {
  const { githubToken, slackToken } = req.headers;

  if (!githubToken || !slackToken) {
    return res.status(400).send('GitHub and Slack tokens are required');
  }

  try {
    const [githubOrgs, slackTeam] = await Promise.all([
      getGithubOrgs(githubToken),
      getSlackTeamInfo(slackToken),
    ]);

    const matchedOrg = matchSlackToGithub(slackTeam, githubOrgs);

    if (matchedOrg) {
      const repos = await getOrgRepos(matchedOrg.login, githubToken);
      res.json(repos);
    } else {
      res.status(404).send('No matching GitHub organization found for your Slack workspace.');
    }
  } catch (error) {
    res.status(500).send('An error occurred while fetching repositories.');
  }
});

app.listen(8080, () => {
  console.log('Running on port 8080');
});
