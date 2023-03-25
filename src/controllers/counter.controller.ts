import { type Request, type Response } from 'express';
import counterModel from '../models/counter.model';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const counterController = {
    count: async (req: Request, res: Response) => {
        const { name } = req.params;
    
        if (!name) return res.status(400).json({ error: 'Missing name' });
    
        try {
            const counter = await counterModel.findOne({ name: name });
    
            if (!counter) return res.status(400).json({ error: 'Invalid name' });
    
            counter.count++;
    
            await counter.save();
        } catch (err) {
            console.error(err);
    
            return res.status(500).json({ error: 'Failed' });
        }
    
        res.status(201).json({ message: 'Success' });
    },

    websocket: async (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        socket.emit('counter:count:load', await countAll());

        counterModel.watch().on('change', async () => {
            socket.emit('counter:count:change', await countAll());
        });
    },
};

async function countAll() {
    try {
        const counters = await counterModel.find({ count: { $gt: 0 } });

        let counter = 0;

        counters.forEach((c) => {
            counter = counter + c.count;
        });

        return counter;
    } catch (err) {
        console.error(err);

        return 0;
    }
}
