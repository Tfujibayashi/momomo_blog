import ContentsRepository from './contents';
import { db } from '~/firebase';

const Repositories = {
  ContentsRepository: new ContentsRepository(db),
};

export default Repositories;
