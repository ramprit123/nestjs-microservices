import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CurrentUser } from './interfaces/user.interface';

@Injectable()
export class BaseService {
  protected currentUser: CurrentUser;
  constructor(protected supabaseService: SupabaseService) {}

  // Set current user (called from controller)
  setUser(user: CurrentUser) {
    this.currentUser = user;
  }

  // Get current user
  getUser(): CurrentUser {
    return this.currentUser;
  }

  // Check if user is admin
  protected requireAdmin() {
    if (this.currentUser.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
  }

  // Check if user owns resource
  protected async checkOwnership(table: string, id: string): Promise<boolean> {
    const { data } = await this.supabaseService.client
      .from(table)
      .select('user_id')
      .eq('id', id)
      .single();

    return data?.user_id === this.currentUser.id;
  }

  // Secure find - only user's data
  protected async findUserData(table: string, filters: any = {}) {
    const { data, error } = await this.supabaseService.client
      .from(table)
      .select('*')
      .eq('user_id', this.currentUser.id)
      .match(filters);

    if (error) throw new Error(error.message);
    return data;
  }

  // Secure create - auto add user_id
  protected async createUserData(table: string, data: any) {
    const { data: result, error } = await this.supabaseService.client
      .from(table)
      .insert({
        ...data,
        user_id: this.currentUser.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  }

  // Secure update - check ownership first
  protected async updateUserData(table: string, id: string, data: any) {
    const isOwner = await this.checkOwnership(table, id);
    if (!isOwner) {
      throw new ForbiddenException('You can only update your own data');
    }

    const { data: result, error } = await this.supabaseService.client
      .from(table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', this.currentUser.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  }

  // Secure delete - check ownership first
  protected async deleteUserData(table: string, id: string) {
    const isOwner = await this.checkOwnership(table, id);
    if (!isOwner) {
      throw new ForbiddenException('You can only delete your own data');
    }

    const { error } = await this.supabaseService.client
      .from(table)
      .delete()
      .eq('id', id)
      .eq('user_id', this.currentUser.id);

    if (error) throw new Error(error.message);
    return true;
  }
}
