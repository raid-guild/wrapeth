import { IEventCallback } from "../../helpers/types";
declare class EventController {
    private _eventCallbacks;
    constructor();
    on(eventCallback: IEventCallback): void;
    off(eventObj?: Partial<IEventCallback>): void;
    trigger(event: string, result?: any): void;
}
export default EventController;
//# sourceMappingURL=events.d.ts.map