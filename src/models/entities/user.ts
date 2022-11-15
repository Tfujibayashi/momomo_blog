import { Entity } from '~/models/common-class';
import { Mail, Password } from '~/models/value-objects';

interface UserProps {
  mail: Mail;
  password: Password;
}

export class User extends Entity<UserProps> {
  get isEmpty(): boolean {
    return this.props.mail.isEmpty;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  static empty(): User {
    return new User({
      mail: Mail.empty(),
      password: Password.empty(),
    });
  }

  copy(): User {
    return new User({
      mail: this.props.mail.copy(),
      password: this.props.password.copy(),
    });
  }
}
