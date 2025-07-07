import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.create(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find({});
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ _id: id });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateOrderDto },
    );
  }

  remove(id: string) {
    return this.orderRepository.findOneAndDelete({ _id: id });
  }
}
