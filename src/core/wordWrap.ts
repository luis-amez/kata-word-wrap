export class ColumnWidth {
  private constructor(private readonly value: number) {
    this.value = value;
  }

  static of(value: number) {
    if (value <= 0) throw new Error('columnWidth must be greater than 0');
    if (!Number.isInteger(value)) throw new Error('columnWidth must be an integer');
    return new ColumnWidth(value);
  }

  getValue() {
    return this.value;
  }
}

export class WrappableText {
  private constructor(private readonly text: string) {
    this.text = text;
  }

  static of(text: string) {
    // This should never happen, undefined and null are not assignable to string
    if (text === undefined || text === null) return new WrappableText('');
    return new WrappableText(text);
  }

  wrapText(columnWidth: ColumnWidth): string {
    if (this.text.length <= columnWidth.getValue()) return this.text;

    return (
      this.getTextBeforeLineBreak(columnWidth) +
      '\n' +
      WrappableText.of(this.getTextAfterLineBreak(columnWidth)).wrapText(columnWidth)
    );
  }

  private getWrapIndex(columnWidth: ColumnWidth) {
    const textToWrap = this.text.substring(0, columnWidth.getValue());
    const whiteSpaceIndex = textToWrap.indexOf(' ');
    return textToWrap.includes(' ') ? whiteSpaceIndex + 1 : columnWidth.getValue();
  }

  private getTextBeforeLineBreak(columnWidth: ColumnWidth) {
    return this.text.substring(0, this.getWrapIndex(columnWidth)).trim();
  }

  private getTextAfterLineBreak(columnWidth: ColumnWidth) {
    return this.text.substring(this.getWrapIndex(columnWidth));
  }
}
