import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    // parseInt(id)로 해도 string type의 id를 int로 casting해줄 수 있지만,
    // +id를 해줘도 위와 같이 똑같은 결과를 얻을 수 있다.
    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.` );
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        // 삭제하고 새로운 데이터 생성
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
