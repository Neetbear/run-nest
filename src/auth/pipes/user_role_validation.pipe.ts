import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UserRole} from '../model/user_role.model';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [ // readonly 접두사 : 값 변경 불가능
        UserRole.ADMIN,
        UserRole.User
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);

        return index !== -1
    }
}