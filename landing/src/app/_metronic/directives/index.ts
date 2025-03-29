import { ActiveMenuDirective } from "./helpers/ActiveMenu.directive";
import { HasPermissionDirective } from "./helpers/has-permission.directive";
// import { datefromtoValidatorDirective } from "./helpers/datefromTo-validator.directive";
import { HasRoleDirective } from "./helpers/has-role.directive";
import { InputTirmFilterDirective } from "./helpers/input-tirm-filter.directive";
// import { SpaceValidatorDirective } from "./helpers/space-validator.directive";



export const directives: any[] = [
    InputTirmFilterDirective,
    HasRoleDirective,
    ActiveMenuDirective,
    // datefromtoValidatorDirective,
    // SpaceValidatorDirective
    HasPermissionDirective
  ];
    export * from "./helpers/ActiveMenu.directive";
    export * from "./helpers/has-role.directive";
    export *  from "./helpers/input-tirm-filter.directive";
    // export * from "./helpers/space-validator.directive";
    // export * from "./helpers/datefromTo-validator.directive";
    export *  from "./helpers/has-permission.directive";


