import type { IParseContext } from "./parse-context";

export function pushPath(ctx: IParseContext, key: string | number) {
  ctx.path.push(key);
}

export function popPath(ctx: IParseContext) {
  ctx.path.pop();
}