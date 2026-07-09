function criterion(label, met) {
  return `<li class="${met ? 'pass' : 'fail'}">${met ? '✓' : '✗'} ${label}</li>`;
}

export function renderResultPage({ success, message, evalResult }) {
  const body = evalResult
    ? `
      <p>Reddit account: <strong>u/${evalResult.redditUsername}</strong></p>
      <ul>
        ${criterion(`Total karma: ${evalResult.totalKarma} (needs ${evalResult.minTotalKarma}+)`, evalResult.meetsKarma)}
        ${criterion(`Comment karma: ${evalResult.commentKarma} (needs ${evalResult.minCommentKarma}+)`, evalResult.meetsCommentKarma)}
        ${criterion(`Account age: ${evalResult.accountAgeDays} days (needs ${evalResult.minAccountAgeDays}+)`, evalResult.meetsAge)}
      </ul>
    `
    : `<p>${message}</p>`;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${success ? 'Verified' : 'Verification result'}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 480px; margin: 60px auto; padding: 0 20px; color: #1a1a1a; }
  h1 { color: ${success ? '#2e7d32' : '#c62828'}; }
  ul { list-style: none; padding: 0; }
  li { padding: 4px 0; }
  li.pass { color: #2e7d32; }
  li.fail { color: #c62828; }
</style>
</head>
<body>
  <h1>${success ? "You're verified!" : 'Verification unsuccessful'}</h1>
  ${body}
  <p>You can close this tab and return to Discord.</p>
</body>
</html>`;
}
