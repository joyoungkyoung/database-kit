import { MetadataKeys } from "decorators";

type Method = "get" | "post" | "put" | "patch" | "delete";
export interface IRouter {
  /** api method */
  method: Method;
  /** api 주소 */
  path: string;
  /** api와 연동되는 메서드 */
  handlerName: string | symbol;
  /** 권한체크 유무 */
  secure?: boolean;
}

function methodDecorator(method: Method) {
  /**
   * 데코레이터 호출부 (외부에서 받는 파라미터 정의)
   * @param path api 주소
   * @param opt 해당 api에 대한 옵션 값.
   * @param opt.secure 권한 체크 유무 (default : false)
   */
  return (path: string, opt?: { secure?: boolean }): MethodDecorator => {
    /**
     * 데코레이터 실행부
     * @param target static 메서드라면 클래스의 생성자 함수, 인스턴스의 메서드라면 클래스의 prototype 객체
     * @param propertyKey 메서드 이름
     * @param descriptor 메서드의 Property Descriptor
     */
    return (target, propertyKey) => {
      const controller = target.constructor;
      const hasMetaRouter = Reflect.hasMetadata(
        MetadataKeys.Routers,
        controller
      );
      // 기존 저장된 라우터 메타값 불러와서 뒤에 추가
      const routers: IRouter[] = hasMetaRouter
        ? Reflect.getMetadata(MetadataKeys.Routers, controller)
        : [];
      routers.push({
        method,
        path,
        handlerName: propertyKey,
        secure: opt?.secure,
      });

      // 컨트롤러 내 라우터 목록 저장
      Reflect.defineMetadata(MetadataKeys.Routers, routers, controller);
    };
  };
}

export const Get = methodDecorator("get");
export const Post = methodDecorator("post");
export const Put = methodDecorator("put");
export const Delete = methodDecorator("delete");
export const Patch = methodDecorator("patch");
