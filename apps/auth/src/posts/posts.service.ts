import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService extends BaseService {
  // Create post (auto adds user_id)
  async create(createPostDto: CreatePostDto) {
    return this.createUserData('posts', createPostDto);
  }

  // Get all user's posts
  async findAll() {
    return this.findUserData('posts');
  }

  // Get single post (check ownership)
  async findOne(id: string) {
    const posts = await this.findUserData('posts', { id });
    return posts[0] || null;
  }

  // Update post (check ownership)
  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.updateUserData('posts', id, updatePostDto);
  }

  // Delete post (check ownership)
  async remove(id: string) {
    return this.deleteUserData('posts', id);
  }

  // Admin only - get all posts
  async findAllPosts() {
    this.requireAdmin();

    const { data, error } = await this.supabaseService.client
      .from('posts')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  }
}
