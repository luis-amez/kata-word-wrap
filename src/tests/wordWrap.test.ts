import { wordWrap } from '../core/wordWrap';
import { expect } from '@jest/globals';

describe('wordWrap', () => {
  it('does not wrap an empty string', () => {
    const result = wordWrap('', 5);

    expect(result).toBe('');
  });

  it('does not wrap a text shorter than the column width', () => {
    const result = wordWrap('hello', 5);

    expect(result).toBe('hello');
  });

  it('wraps a text longer than the column width', () => {
    const result = wordWrap('longword', 4);

    expect(result).toBe('long\nword');
  });

  it('wraps multiple times a text longer than twice the column width', () => {
    const result = wordWrap('reallylongword', 4);

    expect(result).toBe('real\nlylo\nngwo\nrd');
  });

  it('deletes the white space if it wraps in a space', () => {
    const result = wordWrap('abc def', 4);

    expect(result).toBe('abc\ndef');
  });

  it('deletes multiple white spaces if it wraps in multiple spaces', () => {
    const result = wordWrap('abc def ghi', 4);

    expect(result).toBe('abc\ndef\nghi');
  });

  it('prioritizes wrapping in a space over the middle of a word', () => {
    expect(wordWrap(' abcd', 4)).toBe('\nabcd');
    expect(wordWrap('ab cde fg', 4)).toBe('ab\ncde\nfg');
  });

  it('fails if the column width is negative', () => {
    expect(() => wordWrap('hello', -1)).toThrow('columnWidth must be greater than 0');
  });

  it('fails if the column width is zero', () => {
    expect(() => wordWrap('hello', 0)).toThrow('columnWidth must be greater than 0');
  });
});
