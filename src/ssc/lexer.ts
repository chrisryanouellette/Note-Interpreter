import { Token, TokenType, TokenValue, keywords, tokens } from "./token";
import { isObjKey } from "./utils";

type Lexer = {
  input: string;
  position: number; // current position in input ( points to the current char )
  readPosition: number; // current reading position in input ( after current char )
  ch: string | null; // current character under examination
};

function readChar(l: Lexer): void {
  if (l.readPosition >= l.input.length) {
    l.ch = null; // end of input
  } else {
    l.ch = l.input[l.readPosition];
  }
  l.position = l.readPosition;
  l.readPosition += 1;
}

function newToken(tokenType: TokenType, ch: TokenValue): Token {
  return { type: tokenType, literal: ch };
}

function skipWhiteSpace(l: Lexer): void {
  while (l.ch === " " || l.ch === "\t" || l.ch === "\n" || l.ch === "\r") {
    readChar(l);
  }
}

function peekChar(l: Lexer): string | null {
  if (l.readPosition >= l.input.length) {
    return null;
  } else {
    return l.input[l.readPosition];
  }
}

function isPeriod(char: string): boolean {
  return char === ".";
}

function isLetter(char: string): boolean {
  const code = char.charCodeAt(0);
  const isLowercaseChar =
    "a".charCodeAt(0) <= code && "z".charCodeAt(0) >= code;
  const isUppercaseChar =
    "A".charCodeAt(0) <= code && "Z".charCodeAt(0) >= code;
  const isDash = "-".charCodeAt(0) === code;

  return isLowercaseChar || isUppercaseChar || isDash;
}

function isWhiteSpace(char: string): boolean {
  return char === " ";
}

function readIdentifier(l: Lexer): string {
  const position = l.position;

  while (
    typeof l.ch === "string" &&
    (isLetter(l.ch) || isWhiteSpace(l.ch) || isDigit(l.ch) || isPeriod(l.ch))
  ) {
    readChar(l);
  }
  return l.input.slice(position, l.position);
}

function lookupIdent(ident: string): TokenType {
  if (isObjKey(ident, keywords)) {
    return keywords[ident];
  }
  return tokens.STR;
}

function isDigit(char: string): boolean {
  const code = char.charCodeAt(0);
  const isNumber = "0".charCodeAt(0) <= code && code <= "9".charCodeAt(0);
  return isNumber;
}

function readNumber(l: Lexer): string {
  const position = l.position;
  while (typeof l.ch === "string" && isDigit(l.ch)) {
    const next = peekChar(l);
    // Include decimals
    if (typeof next === "string" && isPeriod(next)) {
      readChar(l);
    }
    readChar(l);
  }
  return l.input.slice(position, l.position);
}

export function nextToken(l: Lexer): Token {
  let token: Token;

  skipWhiteSpace(l);

  switch (l.ch) {
    case "=": {
      token = newToken("ASSIGN", l.ch);
      break;
    }
    case ";": {
      token = newToken("SEMICOLON", l.ch);
      break;
    }
    case ":": {
      token = newToken("COLON", l.ch);
      break;
    }
    case "#": {
      token = newToken("POUND", l.ch);
      break;
    }
    case ",": {
      token = newToken("COMMA", l.ch);
      break;
    }
    case null: {
      token = newToken("EOF", "");
      break;
    }
    default: {
      if (isLetter(l.ch)) {
        const literal = readIdentifier(l);
        return newToken(lookupIdent(literal), literal);
      } else if (isDigit(l.ch)) {
        return newToken("INT", readNumber(l));
      } else {
        token = newToken("ILLEGAL", l.ch);
      }
      break;
    }
  }

  readChar(l);

  return token;
}

export function newLexer(input: string): Lexer {
  const l: Lexer = { input, readPosition: 0, position: 0, ch: null };
  readChar(l);

  return l;
}
