import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseController } from '../common/base.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../auth/decorators/user.decorator';
import { CurrentUser } from '../common/interfaces/user.interface';

@Controller('posts')
export class PostsController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
    this.service = postsService;
  }

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: CurrentUser,
  ) {
    this.initService(user);
    const post = await this.postsService.create(createPostDto);
    return this.success(post, 'Post created successfully');
  }

  @Get()
  async findAll(@User() user: CurrentUser) {
    this.initService(user);
    const posts = await this.postsService.findAll();
    return this.success(posts);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: CurrentUser) {
    this.initService(user);
    const post = await this.postsService.findOne(id);
    return this.success(post);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: CurrentUser,
  ) {
    this.initService(user);
    const post = await this.postsService.update(id, updatePostDto);
    return this.success(post, 'Post updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: CurrentUser) {
    this.initService(user);
    await this.postsService.remove(id);
    return this.success(null, 'Post deleted successfully');
  }

  @Get('admin/all')
  async findAllPosts(@User() user: CurrentUser) {
    this.initService(user);
    const posts = await this.postsService.findAllPosts();
    return this.success(posts);
  }
}
