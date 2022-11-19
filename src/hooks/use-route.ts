import { useNavigate, useParams } from 'react-router-dom';

export const useRoute = () => {
  const navigate = useNavigate();

  const params = useParams();

  const push = (page: string) => {
    navigate(page);
  };

  const back = () => {
    navigate(-1);
  };

  return {
    params,
    push,
    back,
  };
};
