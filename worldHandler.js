const utils = require('./utilities');
const World = require('./lib/world/world.js');

const actions = {
  'POST': (request, response) => {
    utils.collectData(request, (formattedData) => {
      const body = JSON.parse(formattedData);
      const w = new World(body.live_cells);

      const data = { live_cells: w.nextGeneration().liveCells };
      utils.sendResponse(response, JSON.stringify(data), 200, {'Content-Type': 'application/json'});
    });
  }
};

module.exports = (request, response) => {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
};
