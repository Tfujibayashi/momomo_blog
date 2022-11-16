import ItemRepository from './item';
import ScheduleRepository from './schedule';
import TransactionRepository from './transaction';
import UserRepository from './user';

const Repositories = {
  ItemRepository: new ItemRepository(),
  UserRepository: new UserRepository(),
  TransactionRepository: new TransactionRepository(),
  ScheduleRepository: new ScheduleRepository(),
};

export default Repositories;
