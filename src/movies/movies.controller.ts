import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    // NestJS에서는 ExpressJS에서와 같이 작성한 서비스 부분의 작성을 import하지 않고, 
    // 아래와 같이 constructor에 작성한 service 객체를 작성해서 접근을 한다.
    constructor(private readonly moviesService: MoviesService) {}
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // localhost:3000/movies/search?year=2000
    @Get("search")
    search(@Query("year") searchingYear: string){
        return `We are searching for a movie made after : ${searchingYear}`;
    }

    @Get(":id")
    // url에 있는 id를 parameter로 사용하도록 한다.
    getOne(@Param("id") movieId: number): Movie {
        return this.moviesService.getOne(movieId); 
    }

    // 새로운 데이터를 생성하기 위해 POST방식으로 Body에 데이터 객체를 넘겨서 보내야 한다면,
    // 아래와 같이 @Body() decorator를 사용해서 작성해준다.
    @Post()
    create(@Body() movieData:CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId:number ){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }
}
