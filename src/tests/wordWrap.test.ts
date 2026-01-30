import { wordWrap } from '../core/wordWrap';

describe('wordWrap', () => {
  it('does nothing for an empty string', () => {
    const result = wordWrap('', 5);

    expect(result).toBe('');
  });
});
