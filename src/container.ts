import { NearConnector } from "./blockchain";
import { NearProtocalConfig } from "./constants";
import { Container } from "./types";

export const DefaultContainer: Container = Object.freeze({
  bcConnector: new NearConnector(NearProtocalConfig),
});

export function getContainer<T extends Container>(): T {
  //@ts-ignore
  return !process.env.NEXT_RUNTIME && window.container
    ? //@ts-ignore
      window.container
    : (DefaultContainer as T);
}
