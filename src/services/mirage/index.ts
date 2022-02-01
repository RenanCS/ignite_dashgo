import faker from 'faker';
import { createServer, Factory, Model, Response, Serializer } from 'miragejs';
import { UserResponse } from './interface';


export const makeServer = () => {
    const server = createServer({
        models: {
            user: Model.extend<Partial<UserResponse>>({})
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


        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams;
                const total = schema.all('user').length;

                const pageStart = ((Number(page) - 1) * Number(per_page));
                const pageEnd = pageStart + Number(per_page);

                const data = this.serialize(schema.all('user'));
                const users = data.users.slice(pageStart, pageEnd);

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                );
            });
            this.post('/users');

            // remove o namespace api para não prejudir as rodas de api do next
            this.namespace = '';
            this.passthrough();
        },

        seeds(server) {
            server.createList('user', 200);
        },

    })

    return server;
}
