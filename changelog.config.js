/* eslint-disable no-param-reassign */

// These env vars need to be defined for the script to run correctly:
// JIRA_HOST
// JIRA_LOGIN_EMAIL
// MARKETING_VERSION
// BUILD_NUMBER

module.exports = {
  // Jira integration
  jira: {
    // API
    api: {
      // Root host of your JIRA installation without protocol.
      // (i.e 'yourapp.atlassian.net')
      host: process.env.JIRA_HOST,
      // Email address of the user to login with
      email: process.env.JIRA_LOGIN_EMAIL,
      // Auth token of the user to login with
      // https://confluence.atlassian.com/cloud/api-tokens-938839638.html
      token: process.env.JIRA_TOKEN,
      // If you need to set some jira-client option use this object.
      // Check jira-client docs for available options: https://jira-node.github.io/typedef/index.html#static-typedef-JiraApiOptions
      options: {},
    },

    // Jira base web URL
    // Set to the base URL for your Jira account
    baseUrl: `https://${process.env.JIRA_HOST}`,

    // Regex used to match the issue ticket key
    // Use capture group one to isolate the key text within surrounding characters (if needed).
    ticketIDPattern: /[A-Z]+-[0-9]+/i,
    //
    // // Status names that mean the ticket is approved.
    // approvalStatus: ['Done', 'Closed', 'Accepted'],
    //
    // // Tickets to exclude from the changelog, by type name
    // excludeIssueTypes: ['Sub-task', 'Story Bug'],
    //
    // // Tickets to include in changelog, by type name.
    // // If this is defined, `excludeIssueTypes` is ignored.
    // includeIssueTypes: [],
  },

  // Github settings
  sourceControl: {
    // Default range for commits.
    // This can include from/to git commit references
    // and or after/before datestamps.
    defaultRange: {
      from: 'origin/dev',
      to: 'origin/main',

      // symmetric='...'
      // non-symmetric='..'
      // https://matthew-brett.github.io/pydagogue/git_diff_dots.html
      symmetric: false,
    },
  },

  // Possible to hide "~ None ~" blocks in template if set to true
  hideEmptyBlocks: true,

  // Transforms the basic changelog data before it goes to the template.
  //  data - The changelog data.
  // eslint-disable-next-line func-names, object-shorthand
  transformData: function (data) {
    // Add marketing version and build number
    data.marketingVersion = process.env.MARKETING_VERSION;
    data.buildNumber = process.env.BUILD_NUMBER;

    // Filter [skip ci] commits (version bumps)
    data.commits.noTickets = data.commits.noTickets.filter(
      (commit) => !commit.summary.includes('[skip ci]'),
    );

    return Promise.resolve(data);
  },

  // The template that generates the output, as an ejs template.
  // Learn more: http://ejs.co/
  // language=ejs
  template: `:building_construction: :building_construction: :building_construction:
New builds in progress - estimated delivery ~1 hour
iOS & Android: Build <%= marketingVersion -%> (<%= buildNumber -%>)
Changes in the new build:
\`\`\`
<% blockTickets = tickets.all.filter((t) => !t.reverted); -%>
<% if (blockTickets.length > 0 || !options.hideEmptyBlocks) { -%>
Jira Tickets
---------------------
<% blockTickets.forEach(ticket => { -%>
  * <<%= ticket.fields.issuetype.name %>> - <%- ticket.fields.summary %>
  [<%= ticket.key %>] <%= jira.baseUrl + '/browse/' + ticket.key %>
<% }); -%>
<% if (!blockTickets.length) { %> ~ None ~ <% } %>
<% } -%>
<% blockNoTickets = commits.noTickets; -%>
<% if (blockNoTickets.length > 0 || !options.hideEmptyBlocks) { -%>
Other Commits
---------------------
<% blockNoTickets.forEach(commit => { -%>
  * <%= commit.slackUser ? '@' + commit.slackUser.name : commit.authorName %> - <<%= commit.revision.substr(0, 7) %>> - <%= commit.summary %>
<% }); -%>
<% if (!blockNoTickets.length) { %> ~ None ~ <% } %>
<% } -%>
<% if (tickets.reverted.length) { %>
Reverted
---------------------
<% tickets.reverted.forEach((ticket) => { -%>
* <<%= ticket.fields.issuetype.name %>> - <%- ticket.fields.summary %>
[<%= ticket.key %>] <%= jira.baseUrl + '/browse/' + ticket.key %>
commit: <%= ticket.reverted %>
<% }); -%>
<% } -%>
\`\`\``,
};
