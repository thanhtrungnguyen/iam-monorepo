import { sharedUntils } from './shared-untils.js';

describe('sharedUntils', () => {
  it('should work', () => {
    expect(sharedUntils()).toEqual('shared-untils');
  });
});
