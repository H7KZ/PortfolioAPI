import { type Request, type Response } from 'express';
import counterModel from '../models/counter.model';

export const webController = {
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

    get: async (req: Request, res: Response) => {
        const { name } = req.params;

        if (!name) return res.status(400).json({ error: 'Missing name' });

        try {
            const counter = await counterModel.findOne({ name: name });

            if (!counter) return res.status(400).json({ error: 'Invalid name' });

            return res.status(200).json({ count: counter.count });
        } catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Failed' });
        }
    },

    all: async (req: Request, res: Response) => {
        try {
            const counters = await counterModel.find();

            const mapped = counters.map((c) => {
                return { name: c.name, count: c.count };
            });

            return res.status(200).json(mapped);
        } catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Failed' });
        }
    },

    allCounted: async (req: Request, res: Response) => {
        try {
            const counters = await counterModel.find({ count: { $gt: 0 } });

            let counter = 0;

            counters.forEach((c) => {
                counter = counter + c.count;
            });

            return res.status(200).json(counter);
        } catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Failed' });
        }
    }
};
