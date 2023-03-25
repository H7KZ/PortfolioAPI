import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import projectModel from '../models/project.model';

export const projectController = {
    websocket: async (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        socket.emit('project:lines:load', await countAllLines());
        socket.emit('project:collaborators:load', await countAllCollabs());
        socket.emit('project:pullrequests:load', await countAllPRs());
        socket.emit('project:commits:load', await countAllCommits());

        projectModel.watch().on('change', async () => {
            socket.emit('project:lines:change', await countAllLines());
            socket.emit('project:collaborators:change', await countAllCollabs());
            socket.emit('project:pullrequests:change', await countAllPRs());
            socket.emit('project:commits:change', await countAllCommits());
        });
    },
};

async function countAllLines() {
    try {
        const projects = await projectModel.find({ lines: { $gt: 0 } });

        let counter = 0;

        projects.forEach((c) => {
            counter = counter + c.lines;
        });

        return counter;
    } catch (err) {
        console.error(err);

        return 0;
    }
}

async function countAllCollabs() {
    try {
        const projects = await projectModel.find({ collaborators: { $gt: 1 } });

        let counter = 0;

        projects.forEach((c) => {
            counter = counter + c.collaborators;
        });

        return counter;
    } catch (err) {
        console.error(err);

        return 0;
    }
}

async function countAllPRs() {
    try {
        const projects = await projectModel.find({ pullRequests: { $gt: 0 } });

        let counter = 0;

        projects.forEach((c) => {
            counter = counter + c.pullRequests;
        });

        return counter;
    } catch (err) {
        console.error(err);

        return 0;
    }
}

async function countAllCommits() {
    try {
        const projects = await projectModel.find({ commits: { $gt: 0 } });

        let counter = 0;

        projects.forEach((c) => {
            counter = counter + c.commits;
        });

        return counter;
    } catch (err) {
        console.error(err);

        return 0;
    }
}