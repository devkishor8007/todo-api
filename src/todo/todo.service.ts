import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo)
  private readonly todoRepository: EntityRepository<Todo>) { }

  async create(createtodoDto: CreateTodoDto): Promise<Todo> {
    const { name, desc, price } = createtodoDto;
    const todo = this.todoRepository.create({
      name,
      desc,
      price,
      fav: 'a'
    });
    await this.todoRepository.persistAndFlush(todo);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find({});
  }

  async findOne(id: number): Promise<Todo> {
    try {
      return await this.todoRepository.findOneOrFail(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, updatetodoDto: UpdateTodoDto): Promise<Todo> {
    const existTodo = await this.todoRepository.findOne(id);
    const todo = this.todoRepository.assign(existTodo, updatetodoDto);
    await this.todoRepository.persistAndFlush(todo)
    return todo;
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    this.todoRepository.removeAndFlush(todo);
    return 'successfully deleted';
  }
}
