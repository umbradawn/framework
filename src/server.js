import yaml from 'js-yaml';
import fs from 'fs';
import Hapi from '@hapi/hapi';
import { createConnections, createConnection } from 'typeorm';

export const startServer = async () => {
  try {
    const config = yaml.load(fs.readFileSync('./src/config/server.yml', 'utf-8'));
    let connection;
    if (!Array.isArray(config.db)) {
      connection = await createConnection(config.db);
    } else {
      connection = await createConnections(config.db);
    }
    let server;
    if (config.ssl) {
      server = Hapi.server({
        port: config.port,
        host: config.host,
        tls: {
          key: fs.readFileSync('./localhost.key'),
          cert: fs.readFileSync('./localhost.crt'),
        },
        routes: {
          json: {
            space: 4,
          },
        },
      });
    } else {
      server = Hapi.server({
        port: config.port,
        host: config.host,
        routes: {
          json: {
            space: 4,
          },
        },
      });
    }
    const routes = yaml.load(fs.readFileSync('./src/config/routes.yml', 'utf-8'));
    const serverRoutes = Array();
    await routes.routes.forEach(async (item) => {
      fs.access(`./src/handlers/${item.fileName.toLowerCase()}.js`, async (err) => {
        if (!err) {
          import(`./handlers/${item.fileName.toLowerCase()}.js`)
            .then(async (module) => {
              const currentRoute = {
                method: item.method,
                path: item.path,
                handler: module.default[item.handler],
              };
              await server.route(currentRoute);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
    await server.route(serverRoutes);
    await server.start();
    console.log(`Server start on ${server.info.uri}`);
  } catch (error) {
    console.log('Error:', error);
  }
};

export default {
  startServer,
};
