import EventDispatcher from "openfl/events/EventDispatcher";

export class ApiHandler extends EventDispatcher
{
    //events
    public static ON_INIT: string = "onInit";

    public constructor()
    {
        super();
        (window as any).collectorApp = {
            message: this.handleMessage.bind(this)
        }
    }

    private handleMessage(msg: any): void
    {

    }
}