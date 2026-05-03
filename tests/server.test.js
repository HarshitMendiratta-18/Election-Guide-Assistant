const request = require('supertest');
const app = require('../server');

describe('Server & Security Endpoints', () => {
  it('should serve the homepage', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('ElectionGuide Pro');
  });

  it('should have security headers (Helmet)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-content-type-options']).toEqual('nosniff');
    expect(res.headers['x-frame-options']).toEqual('SAMEORIGIN');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
  });

  it('should have rate limiting active', async () => {
    // This might be hard to test without many requests, but we check if the middleware is loaded
    const res = await request(app).get('/api/test');
    expect(res.headers['x-ratelimit-limit']).toBeDefined();
  });
});
