'using strict'

import {defaultConf} from "./defaultConf";
import {CommandLineApp, IConf} from "@khgame/turtle/lib";
import * as controllers from "./controllers";
import * as workers from "./workers";

/** generated by web template */
import {Api} from "./api";

const cli = new CommandLineApp(
    "patrol",
    "0.0.1",
    ["mongo", "discover/consul"],
    () => new Api(Object.values(controllers)),
    Object.values(workers).map(w => (() => new w())),
    defaultConf as IConf
    );

cli.run();