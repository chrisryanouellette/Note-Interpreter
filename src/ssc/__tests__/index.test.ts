import * as fs from "fs";
import * as path from "path";
import { newLexer, nextToken } from "../lexer";
import { TokenType, TokenValue } from "../token";

describe("Will use the lexer to decode the metadata section to tokens", () => {
  const url = path.resolve(__dirname, "../metadata.ssc");
  const input = fs.readFileSync(url).toString();

  const tests: [name: TokenType, token: TokenValue][] = [
    ["POUND", "#"],
    ["VERSION", "VERSION"],
    ["COLON", ":"],
    ["INT", "0.83"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["TITLE", "TITLE"],
    ["COLON", ":"],
    ["STR", "Abandoned Doll"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["SUBTITLE", "SUBTITLE"],
    ["COLON", ":"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["ARTIST", "ARTIST"],
    ["COLON", ":"],
    ["STR", "Aspid Cat"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["GENRE", "GENRE"],
    ["COLON", ":"],
    ["STR", "Hard Ragtime"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["CREDIT", "CREDIT"],
    ["COLON", ":"],
    ["STR", "OutFox Serenity Volume 1"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["MUSIC", "MUSIC"],
    ["COLON", ":"],
    ["STR", "Abandoned Doll.opus"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["BANNER", "BANNER"],
    ["COLON", ":"],
    ["STR", "Abandoned Doll-bn.png"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["BACKGROUND", "BACKGROUND"],
    ["COLON", ":"],
    ["STR", "Abandoned Doll-bg.png"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["JACKET", "JACKET"],
    ["COLON", ":"],
    ["STR", "Abandoned Doll-jk.png"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["CDTITLE", "CDTITLE"],
    ["COLON", ":"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["SAMPLESTART", "SAMPLESTART"],
    ["COLON", ":"],
    ["INT", "55.957535"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["SAMPLELENGTH", "SAMPLELENGTH"],
    ["COLON", ":"],
    ["INT", "10.436600"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["SELECTABLE", "SELECTABLE"],
    ["COLON", ":"],
    ["STR", "YES"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["OFFSET", "OFFSET"],
    ["COLON", ":"],
    ["INT", "0.000"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["BPMS", "BPMS"],
    ["COLON", ":"],
    ["INT", "0.000"],
    ["ASSIGN", "="],
    ["INT", "120.000"],
    ["COMMA", ","],
    ["INT", "16.000"],
    ["ASSIGN", "="],
    ["INT", "124.000"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["STOPS", "STOPS"],
    ["COLON", ":"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["BGCHANGES", "BGCHANGES"],
    ["COLON", ":"],
    ["SEMICOLON", ";"],
    ["POUND", "#"],
    ["FGCHANGES", "FGCHANGES"],
    ["COLON", ":"],
    ["SEMICOLON", ";"],
    ["EOF", ""],
  ];

  const l = newLexer(input);

  for (let i = 0; i < tests.length; i++) {
    const tt = tests[i];
    const tok = nextToken(l);

    it(`Will parse a "${tt[1]}" as a ${tt[0]}`, () => {
      expect(tok.type).toBe(tt[0]);
      expect(tok.literal).toBe(tt[1]);
    });
  }
});
