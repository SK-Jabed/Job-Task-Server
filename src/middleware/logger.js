/**
 * @DESC LOGGER MIDDLEWARE
 * @DESC LOGS EACH INCOMING REQUEST WITH METHOD, URL, HOSTNAME, AND TIME
 */
const logger = (req, res, next) => {
    console.log(
      `📢 REQUEST FROM: ${req.hostname} | METHOD: ${req.method} | URL: ${
        req.url
      } | TIME: ${new Date().toLocaleTimeString()}`
    );
  
    // CONTINUE TO NEXT MIDDLEWARE OR ROUTE HANDLER
    next();
  };
  
  module.exports = logger;