export enum UrlParserState {
  key = 'key',
  value = 'value',
}

export interface ParsedUrl {
  [key: string]: string;
}

export const parseUrl = (url: string): ParsedUrl => {
  let _url = url;
  let key = 'root';
  let value = '';
  let depth = 0;
  let skip = false;
  let state: UrlParserState | null = UrlParserState.value;
  let result: ParsedUrl = {};

  _url += '\0';

  _url.split('').forEach((char, index, chars) => {
    if (!skip) {
      const nextChars = ''.concat(chars[index + 1], chars[index + 2]);

      switch (state) {
        case UrlParserState.key:
          if (char === ':') {
            state = UrlParserState.value;
          } else {
            key += char;
          }

          break;
        case UrlParserState.value:
          if (char === '(') {
            value += char;
            depth += 1;
          } else if (char === ')') {
            value += char;
            depth -= 1;
          } else if (depth > 0) {
            value += char;
          } else if (nextChars === '//') {
            result[key] = value;
            key = value = '';
            state = UrlParserState.key;
            skip = true;
          } else if (char === '\0') {
            result[key] = value;
            key = value = '';
            state = UrlParserState.key;
          } else if (char === ':') {
            key = value;
            value = '';
            state = UrlParserState.value;
          } else {
            value += char;
          }

          break;
        default:
          break;
      }
    } else {
      skip = false;
    }
  });

  return result;
};
