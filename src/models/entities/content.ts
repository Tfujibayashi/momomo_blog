import { ContentId, ContentText, ContentTitle, DateTime, Entity, ImagePath } from '~/models';

interface ContentProps {
  id: ContentId;
  title: ContentTitle;
  text: ContentText;
  imagePath: ImagePath;
  isPublic: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: DateTime;
}

export class Content extends Entity<ContentProps> {
  get isEmpty(): boolean {
    return this.props.id.isEmpty;
  }

  get isActive(): boolean {
    return this.props.deletedAt.isEmpty;
  }

  static create(props: ContentProps): Content {
    return new Content(props);
  }

  static empty(): Content {
    return new Content({
      id: ContentId.empty(),
      title: ContentTitle.empty(),
      text: ContentText.empty(),
      imagePath: ImagePath.empty(),
      isPublic: false,
      createdAt: DateTime.empty(),
      updatedAt: DateTime.empty(),
      deletedAt: DateTime.empty(),
    });
  }

  copy(): Content {
    return new Content({
      id: this.props.id.copy(),
      title: this.props.title.copy(),
      text: this.props.text.copy(),
      isPublic: this.props.isPublic,
      imagePath: this.props.imagePath.copy(),
      createdAt: this.props.createdAt.copy(),
      updatedAt: this.props.updatedAt.copy(),
      deletedAt: this.props.deletedAt.copy(),
    });
  }
}
