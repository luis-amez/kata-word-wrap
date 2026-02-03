export function wordWrap(text: string, columnWidth: number) {
  if (columnWidth <= 0) throw new Error('columnWidth must be greater than 0');
  if (text.length <= columnWidth) return text;

  let wrapIndex = getWrapIndex(text, columnWidth);
  let wrappedText = text.substring(0, wrapIndex).trim();
  let unwrappedText = text.substring(wrapIndex);
  while (unwrappedText.length > columnWidth) {
    wrapIndex = getWrapIndex(unwrappedText, columnWidth);
    wrappedText += '\n' + unwrappedText.substring(0, wrapIndex).trim();
    unwrappedText = unwrappedText.substring(wrapIndex);
  }
  return wrappedText + '\n' + unwrappedText;
}

function getWrapIndex(text: string, columnWidth: number) {
  const textToWrap = text.substring(0, columnWidth);
  const whiteSpaceIndex = textToWrap.indexOf(' ');
  return textToWrap.includes(' ') ? whiteSpaceIndex + 1 : columnWidth;
}
