import faker from 'faker';
import { createServer, Factory, Model } from 'miragejs';
import { User } from './interface';


export const makeServer = () => {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                }
            })
        },

        seeds(server) {
            server.createList('user', 8);
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
