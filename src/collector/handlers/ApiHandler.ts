import EventDispatcher from "openfl/events/EventDispatcher";
//import ExternalInterface from "openfl/external/ExternalInterface"
import { ApiResponse, InitResponse } from "../../shared/types/api";
import Event from "openfl/events/Event";

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

    private handleMessage(resp: ApiResponse): void
    {
        switch (resp.type)
        {
            case "init": //callback ApiHandler.ON_INIT
                console.log("Init data received!: " + JSON.stringify(resp));
                this.dispatchEvent(new InitEvent(resp));
                break;
            case "error":
                console.log("API Error: " + resp.message);
                break;
        }
    }

    public call(event: string): void
    {
        //if (ExternalInterface.available)
        //{
        try
        {
            switch (event)
            {
                case ApiHandler.ON_INIT:
                    (window as any).apiCall("/api/init", "GET");
                    //ExternalInterface.call("fetchInit");
                    break;
            }
        }
        catch (e: any)
        {
            console.log("Error calling JavaScript function: " + e.message);
        }
        //} else console.log("Interface not available");
    }
}

export class InitEvent extends Event
{
    public response: InitResponse;

    public constructor(resp: ApiResponse)
    {
        super(ApiHandler.ON_INIT);
        this.response = resp.data as InitResponse;
    }
}