const validNewsWebsites = new RegExp(
  `^(ftp|http|https):\\/\\/(?:www\\.)?` +
    `(?:` +
    `stirileprotv\\.ro|` +
    `observatornews\\.ro|` +
    `activenews\\.ro|` +
    `b1tv\\.ro|` +
    `digi24\\.ro|` +
    `libertatea\\.ro|` +
    `romaniatv\\.net|` +
    `evz\\.ro|` +
    `hotnews\\.ro|` +
    `antena3\\.ro|` +
    `realitatea\\.net` +
    `mediafax\\.ro` +
    `gandul\\.ro` +
    `adevarul\\.ro` +
    `)(?:\\/[^ "]+)?$`
);

export default validNewsWebsites;
