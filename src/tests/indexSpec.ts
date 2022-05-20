import app from '../index';
import supertest from 'supertest';
import { promises as fsPromises } from 'fs';
import { Stats } from 'fs';
import path from 'path';
import { resize } from '../utilities/middleware';
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

describe('End Point Test For Image ', (): void => {
    it('Get The Api/Images? name & width & height End Point', async () => {
        const response = await request.get(
            '/api/images?name=image2&width=400&height=200'
        );
        expect(response.status).toBe(200);
    });

    it('Resized Image should be exist', async () => {
        await request
            .get('/api/images?name=image2&width=400&height=200')
            .then(() => {
                fsPromises
                    .stat(
                        path.resolve(
                            __dirname,
                            './../../assets/images/output/image2_400_200.jpeg'
                        )
                    )
                    .then((fileStat: Stats) => expect(fileStat).not.toBeNull());
            });
    });
});

describe('Test Image Properties', (): void => {
    it('test file name , width and height', () => {
        expect(async () => {
            await resize('image2', 100, 100);
        }).not.toThrow();
    });
});
