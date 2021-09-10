import http, { IncomingMessage, ServerResponse } from 'http'
import routes from './routes'

const server = http.createServer(routes.handle.bind(routes))

server.listen(3333, () => console.log('Server is running at 3333'))