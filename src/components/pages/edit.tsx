import { useEffect } from 'react';

import { EditForm } from '@components/organisms';

import {
  AuthContextStore,
  EditsContextStore,
  useAuthContext,
  useEditsContext,
  useRoute,
} from '~/hooks';
import { ContentId } from '~/models';

export const Edit = (): JSX.Element => {
  const { user } = useAuthContext() as AuthContextStore;
  const { getContent } = useEditsContext() as EditsContextStore;
  const { params, notFoundPage } = useRoute();

  useEffect(() => {
    const contentId = ContentId.create(params.contentId as string);

    if (contentId.isNotEmpty) {
      void getContent(contentId);
    }
  }, [getContent, params.contentId]);

  if (!user) {
    return notFoundPage();
  }

  return (
    <div>
      <EditForm />
    </div>
  );
};
