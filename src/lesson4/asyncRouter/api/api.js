import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';
//import { AsyncRouter } from 'express-asynk-router';

export default (ctx) => {
  const api = AsyncRouter();
  api.all('/', () => ({ok: true, version: '1.0.1'}));
  api.all('/test', () => ({test: 123123}));
  return api;
}