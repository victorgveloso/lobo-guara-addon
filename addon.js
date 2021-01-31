const { addonBuilder } = require("stremio-addon-sdk");
const { getMeta } = require("./stream");
const urlExist = require("url-exist");
const manifest = require("./manifest.json");
const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async (args) => {
  let [imdbId, season, episode] = args.id.split(":");
  let { id, name } = await getMeta(imdbId);
  const url = `http://uganet.xyz/host04.php?b=tv/${id}/${season}/dub/${episode}.mp4`;
  const url2 = `http://uganet.xyz/host06.php?b=thor/${id}/${season}/dub/${episode}.mp4`;
  if ((await urlExist(url)) == true) {
    let streams = [
      {
        id: args.id,
        title: name + ' - DUBLADO',
        type: `series`,
        url: url,
        behaviorHints: {
          bingeGroup: `${name}-host04`,
        },
      },
    ];
    return { streams };
  } else if ((await urlExist(url2)) == true) {
    let streams = [
      {
        id: args.id,
        title: name + ' - DUBLADO',
        type: `series`,
        url: url2,
        behaviorHints: {
          bingeGroup: `${name}-host06`,
        },
      },
    ];
    return { streams };
  }
});

module.exports = builder.getInterface();
