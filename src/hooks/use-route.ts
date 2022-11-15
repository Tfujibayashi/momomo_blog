import { useNavigate } from 'react-router-dom';

export const useRoute = () => {
  const navigate = useNavigate();

  const push = (page: string) => {
    navigate(page);
  };

  const back = () => {
    navigate(-1);
  };

  return {
    push,
    back,
  };
};
