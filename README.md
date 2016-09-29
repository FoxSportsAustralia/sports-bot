## Fox SPORTS SportsBot

### Requirements

Make sure you're using node `6.7.0` or higher.  Had some issues around sockets inside of `@slack/client` or `node-wit` that didn't seem to run under node 4.

### Startup

Copy `env-sample.json` to `env.json` and fill in the details.

[wit.ai](https://wit.ai) requires an app and some stories created. Use `witai-sportsbot.zip` as a starting basis, and update your `env.json` to the specified keys (we didn't end up using them all).

[Create a Bot](https://slack.com/apps/manage/custom-integrations) from your team's integration management and take note of the API key to enter into `env.json`

### Phrases

You can communicate with your Sports Bot with a number of phrases but not that only one of his response set is publicly accessible (at this stage).

1) Get **top** **five** **players** for **runs**
2) Get **top** **6** **teams** for **tries**
   * (best|top|lowest|bottom|worse) (players|teams) (1-10) (stat-type)
3) Show **tries** for **Johnathan Thurston**
   * (stat-type) (player-name)
4) What was the score between **sharks** and **rabbits**
   * (team-name) (team-name)
5) When is the **sharks** game on?
   * (team-name)
6) Hi sportsbot
7) Who will win Game Changer

Phrasing 1 and 2 will work as it uses a public API, the rest is off an internal API that was created on the day as it required some fuzzy searching against player names.
