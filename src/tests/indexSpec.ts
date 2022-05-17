import app from '../index';
import supertest from 'supertest';

const request = supertest(app);
describe('End Point Test Response', (): void => {
    it('Get The Home End Point', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});

describe('End Point Test Response', (): void => {
    it('Get The Api/Images End Point', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
});

describe('End Point Test Response', (): void => {
    it('Get The Api/Images>name&widthheightEnd Point', async () => {
        const response = await request.get(
            '/api/images?name=image2&width=400&height=200'
        );
        expect(response.status).toBe(200);
    });
});
