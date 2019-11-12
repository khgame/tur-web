import {Get, Post, JsonController, UseInterceptor} from "routing-controllers";
import {genLogger, Logger} from "@khgame/turtle";

import {MessageInterceptor} from "../api";
import {SampleWorker} from "../workers";

@UseInterceptor(MessageInterceptor)
@JsonController("/panel")
export class PanelController {

    public log: Logger = genLogger("api:panel");

    constructor(private readonly sampleWorker: SampleWorker) {
    }

    @Get("/info")
    async info() {
        return Math.floor((new Date()).getTime() / 3600000);
    }

    @Post("/running_process")
    async getProcessRunning() {
        return this.sampleWorker.processRunning;
    }


}
