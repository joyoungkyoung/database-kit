import RestController from "./restController";
import { Delete, Get, Patch, Post, Put } from "./routers";

export enum MetadataKeys {
  BasePath = "base-path",
  Routers = "routers",
}

export { RestController, Get, Post, Put, Patch, Delete };
