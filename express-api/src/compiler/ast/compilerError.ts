import { SymbolType } from '../lexer/symbol';
export class CompilerError extends Error {
  public line: number;
  public token: SymbolType;
  constructor(line: number, message: string, token: SymbolType) {
    super(message);
    this.line = line;
    this.token = token;
  }
}
