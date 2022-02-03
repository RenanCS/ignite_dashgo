import faker from 'faker';
import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import { UserMirage } from './interface';

export const makeServer = () => {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
        models: {
            user: Model.extend<Partial<UserMirage>>({})
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
            this.get('/users/:id');
            this.post('/users');

            // remove o namespace api para não prejudicar as rodas de api do next
            this.namespace = '';
            this.passthrough(`${process.env.NEXT_PUBLIC_API_SEGURANCA}/**`);
            this.passthrough();
        },

        seeds(server) {
            server.createList('user', 2);
        },

    })

    return server;
}
