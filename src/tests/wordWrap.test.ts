import { ColumnWidth, WrappableText } from '../core/wordWrap';
import { expect } from '@jest/globals';

describe('wordWrap', () => {
  it('does not wrap an empty string', () => {
    const result = WrappableText.of('').wrapText(ColumnWidth.of(5));

    expect(result).toBe('');
  });

  it('does not wrap a text shorter than the column width', () => {
    const result = WrappableText.of('hello').wrapText(ColumnWidth.of(5));

    expect(result).toBe('hello');
  });

  it('wraps a text longer than the column width', () => {
    const result = WrappableText.of('longword').wrapText(ColumnWidth.of(4));

    expect(result).toBe('long\nword');
  });

  it('wraps multiple times a text longer than twice the column width', () => {
    const result = WrappableText.of('reallylongword').wrapText(ColumnWidth.of(4));

    expect(result).toBe('real\nlylo\nngwo\nrd');
  });

  it('deletes the white space if it wraps in a space', () => {
    const result = WrappableText.of('abc def').wrapText(ColumnWidth.of(4));

    expect(result).toBe('abc\ndef');
  });

  it('deletes multiple white spaces if it wraps in multiple spaces', () => {
    const result = WrappableText.of('abc def ghi').wrapText(ColumnWidth.of(4));

    expect(result).toBe('abc\ndef\nghi');
  });

  it('prioritizes wrapping in a space over the middle of a word', () => {
    expect(WrappableText.of(' abcd').wrapText(ColumnWidth.of(4))).toBe('\nabcd');
    expect(WrappableText.of('ab cde fg').wrapText(ColumnWidth.of(4))).toBe('ab\ncde\nfg');
  });

  it('fails if the column width is negative', () => {
    expect(() => WrappableText.of('hello').wrapText(ColumnWidth.of(-1))).toThrow('columnWidth must be greater than 0');
  });

  it('fails if the column width is zero', () => {
    expect(() => WrappableText.of('hello').wrapText(ColumnWidth.of(0))).toThrow('columnWidth must be greater than 0');
  });

  it('fails if the column width is a decimal number', () => {
    expect(() => WrappableText.of('hello').wrapText(ColumnWidth.of(1.5))).toThrow('columnWidth must be an integer');
  });
});
