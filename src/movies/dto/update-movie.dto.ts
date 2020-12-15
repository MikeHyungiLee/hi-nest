import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto{
//     @IsString()
//     readonly title?: string;
//     @IsNumber()
//     readonly year?: number;
//     @IsString({ each: true })
//     readonly genres?: string[];
// }

//위의 코드는 create-movie.dto.ts의 코드와 중복되는 부분이 많기 때문에, 
//다른 부분만 수정해서 작성해주면 된다. 

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    
}