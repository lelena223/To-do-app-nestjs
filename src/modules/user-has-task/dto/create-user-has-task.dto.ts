import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserHasTaskDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    taskId: number;
}
