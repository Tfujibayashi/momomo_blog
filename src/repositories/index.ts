import ContentsRepository from './contents';
import { db, storage } from '~/firebase';

const Repositories = {
  ContentsRepository: new ContentsRepository({ db, storage }),
};

export default Repositories;
