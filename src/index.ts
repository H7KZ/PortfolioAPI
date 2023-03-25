import express, { type Application } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { counterController } from './controllers/counter.controller';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { type Server as HTTPServer, type IncomingMessage, type ServerResponse } from 'http';

// Import database connection
import connectDB from './db/connect.db';
import { projectController } from './controllers/project.controller';

// Create express application
const app: Application = express();
const server: HTTPServer<typeof IncomingMessage, typeof ServerResponse> = createServer(app);
const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = new Server(server);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Add middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());
app.use(express.json());

// Start logging
app.use(morgan('short'));

// Add routes
app.post('/count/plus/:name', counterController.count);

io.on('connection', (socket) => {
    console.log(`[PortfolioAPI] New connection: ${socket.id}`);

    counterController.websocket(io, socket);
    projectController.websocket(io, socket);

    socket.on('disconnect', () => {
        console.log(`[PortfolioAPI] Disconnected: ${socket.id}`);
    });
});

// Start server
server.listen(process.env.PORT || 3000, () => {
    console.log(`[PortfolioAPI] Server running on port ${process.env.PORT || 3000}`);
});
