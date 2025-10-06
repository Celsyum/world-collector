import EventDispatcher from "openfl/events/EventDispatcher";
import ExternalInterface from "openfl/external/ExternalInterface"
import { ApiResponse, InitResponse } from "../../shared/types/api";

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
        let resp = msg as ApiResponse;
        switch (resp.type)
        {
            case "init":
                let initData = resp.data as InitResponse;
                console.log("Init data received!: " + JSON.stringify(initData));
        }
        //this.dispatchEvent(new (openfl.events.Event as any)(ApiHandler.ON_INIT));
    }

    public call(): void
    {
        if (ExternalInterface.available)
        {
            console.log("Interface available");
            try
            {
                (window as any).collectorMessage("Hello from TypeScript!");
            }
            catch (e: any)
            {
                console.log("Error calling JavaScript function: " + e.message);
            }
        } else console.log("Interface not available");
    }
}