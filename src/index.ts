'use strict'

import "reflect-metadata";
import {Container} from "typedi";
import {Action, useContainer} from "routing-controllers";
useContainer(Container);

import {defaultConf} from "./defaultConf";
import {CommandLineApp, IConf, IWorker} from "@khgame/turtle";
import * as controllers from "./controllers";
import * as workers from "./workers";

/** generated by web template */

import {Api} from "./api";

const cli = new CommandLineApp(
    "new-web-application",
    "0.0.1",
    __TURTLE_DRIVERS__,
    () => new Api(
        Object.values(controllers),
        1000,
        async (action: Action) => {
            const token = action.request.headers["authorization"];
            return !!token; // todo: edit for validate users
        }
    ),
    Object.values(workers).map(w => () => Container.get<IWorker>(w)),
    defaultConf as IConf
);

cli.run();
