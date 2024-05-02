const ILLEGAL = "ILLEGAL";
const EOF = "";

// Identifiers + Literals
const STR = "STR"; // add, foobar, x, y
const INT = "INT"; // 123

// Delimiters
const COMMA = ",";
const SEMICOLON = ";";
const COLON = ";";
const POUND = "#";

// Operators
const ASSIGN = "=";

export const tokens = {
  ILLEGAL,
  EOF,
  STR,
  INT,
  COMMA,
  SEMICOLON,
  COLON,
  POUND,
  ASSIGN,
} as const;

// Keywords
const VERSION = "VERSION";
const TITLE = "TITLE";
const SUBTITLE = "SUBTITLE";
const ARTIST = "ARTIST";
const GENRE = "GENRE";
const CREDIT = "CREDIT";
const MUSIC = "MUSIC";
const BANNER = "BANNER";
const BACKGROUND = "BACKGROUND";
const JACKET = "JACKET";
const CDTITLE = "CDTITLE";
const SAMPLESTART = "SAMPLESTART";
const SAMPLELENGTH = "SAMPLELENGTH";
const SELECTABLE = "SELECTABLE";
const OFFSET = "OFFSET";
const BPMS = "BPMS";
const STOPS = "STOPS";
const BGCHANGES = "BGCHANGES";
const FGCHANGES = "FGCHANGES";

export const keywords = {
  VERSION,
  TITLE,
  SUBTITLE,
  ARTIST,
  GENRE,
  CREDIT,
  MUSIC,
  BANNER,
  BACKGROUND,
  JACKET,
  CDTITLE,
  SAMPLESTART,
  SAMPLELENGTH,
  SELECTABLE,
  OFFSET,
  BPMS,
  STOPS,
  BGCHANGES,
  FGCHANGES,
} as const;

type Tokens = typeof tokens;
type Keywords = typeof keywords;

export type TokenType = keyof Tokens | Keywords[keyof Keywords];
export type TokenValue = string;

export type Token = {
  type: TokenType;
  literal: TokenValue;
};
