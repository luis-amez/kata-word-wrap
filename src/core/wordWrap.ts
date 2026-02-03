export class ColumnWidth {
  private constructor(private readonly value: number) {
    this.value = value;
  }

  static of(value: number) {
    if (value <= 0) throw new Error('columnWidth must be greater than 0');
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

  wrapText(columnWidth: ColumnWidth) {
    if (this.getText().length <= columnWidth.getValue()) return this.getText();

    let wrappedText = this.getWrappedText(this.getText(), columnWidth);
    let unwrappedText = this.getUnwrappedText(this.getText(), columnWidth);
    while (unwrappedText.length > columnWidth.getValue()) {
      wrappedText += '\n' + this.getWrappedText(unwrappedText, columnWidth);
      unwrappedText = this.getUnwrappedText(unwrappedText, columnWidth);
    }
    return wrappedText + '\n' + unwrappedText;
  }

  private getText() {
    return this.text;
  }

  private getWrapIndex(text: string, columnWidth: ColumnWidth) {
    const textToWrap = text.substring(0, columnWidth.getValue());
    const whiteSpaceIndex = textToWrap.indexOf(' ');
    return textToWrap.includes(' ') ? whiteSpaceIndex + 1 : columnWidth.getValue();
  }

  private getWrappedText(text: string, columnWidth: ColumnWidth) {
    return text.substring(0, this.getWrapIndex(text, columnWidth)).trim();
  }

  private getUnwrappedText(text: string, columnWidth: ColumnWidth) {
    return text.substring(this.getWrapIndex(text, columnWidth));
  }
}
