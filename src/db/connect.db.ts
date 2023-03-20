import mongoose, { type ConnectOptions } from 'mongoose';

async function connectDB(): Promise<void> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);

        console.log(`[PortfolioAPI] MongoDB Connected: ${conn.connection.host}`);
    } catch (err: any) {
        console.error(`[PortfolioAPI] Error connecting to MongoDB: ${err.message ?? 'Unknown error'}`);
        process.exit(1);
    }
}

export default connectDB;
