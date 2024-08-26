import { MetadataKeys } from "decorators";

export default function RestController(basePath: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BasePath, basePath, target);
  };
}
