import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NotFound } from '@components/pages';

export const useRoute = () => {
  const navigate = useNavigate();

  const params = useParams();

  const push = (page: string) => {
    navigate(page);
  };

  const back = () => {
    navigate(-1);
  };

  const notFoundPage = (): JSX.Element => {
    return React.createElement(NotFound);
  };

  return {
    params,
    push,
    back,
    notFoundPage,
  };
};
