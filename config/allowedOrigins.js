// allowedOrigins "whitelist" is an array of domains that are allowed to make requests to the server.
// If the request is coming from a domain that is not in the whitelist, it will be blocked.
// remove the other domains from the whitelist and only leave yoursite.com
// FIXME: Replace yoursite.com with your domain name
const allowedOrigins = [
  "https://yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

module.exports = allowedOrigins;
