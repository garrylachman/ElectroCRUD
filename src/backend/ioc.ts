import "reflect-metadata";

import { Container } from "inversify";
import { provide, buildProviderModule } from "inversify-binding-decorators";


let container = new Container();
container.load(buildProviderModule());

export default container;