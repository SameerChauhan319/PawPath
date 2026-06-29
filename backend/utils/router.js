const url = require('url');

class Router {
  constructor() {
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      DELETE: [],
      OPTIONS: []
    };
  }

  add(method, pathPattern, ...handlers) {
    const keys = [];
    
    const pattern = pathPattern.replace(/:([^/]+)/g, (match, key) => {
      keys.push(key);
      return '([^/]+)';
    });
    
    const regex = new RegExp(`^${pattern}$`);
    this.routes[method].push({ regex, keys, handlers });
  }

  get(path, ...handlers) { this.add('GET', path, ...handlers); }
  post(path, ...handlers) { this.add('POST', path, ...handlers); }
  put(path, ...handlers) { this.add('PUT', path, ...handlers); }
  delete(path, ...handlers) { this.add('DELETE', path, ...handlers); }

  async handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    
    res.json = (data, statusCode = 200) => {
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000', 
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      });
      res.end(JSON.stringify(data));
    };

    
    if (method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      });
      res.end();
      return;
    }

    const routesForMethod = this.routes[method] || [];
    for (const route of routesForMethod) {
      const match = pathname.match(route.regex);
      if (match) {
        
        req.params = {};
        route.keys.forEach((key, index) => {
          req.params[key] = decodeURIComponent(match[index + 1]);
        });
        req.query = parsedUrl.query;

        
        if (method === 'POST' || method === 'PUT') {
          try {
            req.body = await this.getRequestBody(req);
          } catch (err) {
            return res.json({ message: 'Invalid JSON body parsing error' }, 400);
          }
        }

        
        const handlers = route.handlers;
        let index = 0;

        const next = async () => {
          if (index < handlers.length) {
            const currentHandler = handlers[index++];
            await currentHandler(req, res, next);
          }
        };

        try {
          await next();
        } catch (err) {
          console.error('Router execution error:', err);
          return res.json({ message: 'Internal Server Error', error: err.message }, 500);
        }
        return;
      }
    }

    
    return res.json({ message: `Route ${method} ${pathname} not found` }, 404);
  }

  getRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        if (!body) {
          resolve({});
          return;
        }
        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        } else {
          resolve(body);
        }
      });
      req.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = Router;
