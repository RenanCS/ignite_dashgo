import { createServer, Model, Server } from 'miragejs'

type User = {
    name: string;
    email: string;
    created_at: string;
}

export const makeServer = () => {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },
        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users');
            this.post('/users');

            // remove o namespace api para não prejudir as rodas de api do next
            this.namespace = '';
            this.passthrough();
        }
    })

    return server;
}
