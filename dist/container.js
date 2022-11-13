import { NearConnector } from "./blockchain";
import { NearProtocalConfig } from "./constants";
export var DefaultContainer = Object.freeze({
    bcConnector: new NearConnector(NearProtocalConfig),
});
export function getContainer() {
    //@ts-ignore
    return !process.env.NEXT_RUNTIME && window.container
        ? //@ts-ignore
            window.container
        : DefaultContainer;
}
