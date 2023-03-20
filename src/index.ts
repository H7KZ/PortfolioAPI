import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

// Import database connection
import connectDB from './db/connect.db';

// Import routes
import webRoutes from './routes/web';

// Create express application
const app: Application = express();

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
app.use('/count', webRoutes);

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`[PortfolioAPI] Server running on port ${process.env.PORT || 3000}`);
});
