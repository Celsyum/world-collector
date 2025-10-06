import Sprite from "openfl/display/Sprite";
import { ApiHandler, InitEvent } from "./handlers/ApiHandler";
import Event from "openfl/events/Event";
import TextField from "openfl/text/TextField";
import Assets from "openfl/utils/Assets";
import TextFormat from "openfl/text/TextFormat";
import TextFormatAlign from "openfl/text/TextFormatAlign";

export class UIView extends Sprite
{

    private apiHandler: ApiHandler;

    private nameTitle: TextField;
    private expTitle: TextField;
    private levelTitle: TextField;

    public currentScale: number;

    public constructor(apiHandler: ApiHandler)
    {
        super();
        this.apiHandler = apiHandler;
        this.onAddedToStage();;
        this.apiHandler.addEventListener(ApiHandler.ON_INIT, this.onDataInit.bind(this));
    }

    public resize(newWidth: number, newHeight: number): void
    {
        var maxWidth = newWidth * 0.90;
        var maxHeight = newHeight * 0.86;

        this.currentScale = 1;
        this.scaleX = 1;
        this.scaleY = 1;

        var currentWidth = this.width;
        var currentHeight = this.height;

        if (currentWidth > maxWidth || currentHeight > maxHeight)
        {
            var maxScaleX = maxWidth / currentWidth;
            var maxScaleY = maxHeight / currentHeight;

            if (maxScaleX < maxScaleY)
            {
                this.currentScale = maxScaleX;
            } else
            {
                this.currentScale = maxScaleY;
            }

            this.scaleX = this.currentScale;
            this.scaleY = this.currentScale;

        }

        this.x = newWidth / 2 - (currentWidth * this.currentScale) / 2;

    }

    private onDataInit(e: InitEvent): void
    {
        this.nameTitle.text = "Name: " + e.response.username;
        this.expTitle.text = "Exp: " + e.response.exp + " / " + e.response.next_level_exp;
        this.levelTitle.text = "Level: " + (e.response.level + 1);
    }

    private onAddedToStage(): void
    {
        console.log("UIView added to stage");
        var font = Assets.getFont("fonts/Inter_18pt-Medium.ttf");
        var defaultFormat: TextFormat = new TextFormat(font.fontName, 20, 0x000000);
        defaultFormat.align = TextFormatAlign.LEFT;

        this.nameTitle = new TextField();
        this.nameTitle.defaultTextFormat = defaultFormat;
        this.nameTitle.width = 400;
        this.nameTitle.height = 100;
        this.nameTitle.x = 2;
        this.nameTitle.y = 2;
        this.nameTitle.text = "Name: Loading...";
        this.addChild(this.nameTitle);

        this.expTitle = new TextField();
        this.expTitle.defaultTextFormat = defaultFormat;
        this.expTitle.width = 400;
        this.expTitle.height = 100;
        this.expTitle.x = 2;
        this.expTitle.y = 24;
        this.expTitle.text = "Exp: Loading...";
        this.addChild(this.expTitle);

        this.levelTitle = new TextField();
        this.levelTitle.defaultTextFormat = defaultFormat;
        this.levelTitle.width = 400;
        this.levelTitle.height = 100;
        this.levelTitle.x = 2;
        this.levelTitle.y = 46;
        this.levelTitle.text = "Level: Loading...";
        this.addChild(this.levelTitle);
        console.log("added to stage finished");

    }
}