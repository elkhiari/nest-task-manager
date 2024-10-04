import { AuthMiddleware } from './auth.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });
});
