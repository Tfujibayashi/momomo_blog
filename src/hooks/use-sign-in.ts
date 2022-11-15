import { useCallback, useMemo } from 'react';

import { useState } from '~/hooks';
import { Mail, Password } from '~/models';

export const useSignIn = () => {
  /**
   * State
   */
  const [inputs, setInputs] = useState({
    mail: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    mail: [] as Array<string>,
    password: [] as Array<string>,
  });

  /**
   * Data
   */
  const isInputted = useMemo(() => {
    return Object.values(inputs).filter(Boolean).length === Object.values(inputs).length;
  }, [inputs]);

  const hasError = useMemo(() => {
    return Object.values(errors).flat().length > 0;
  }, [errors]);

  /**
   * Methods
   */
  const init = useCallback(() => {
    setInputs({
      mail: '',
      password: '',
    });
    setErrors({
      mail: [],
      password: [],
    });
  }, [setInputs, setErrors]);

  const validateMail = useCallback((): void => {
    setErrors({ mail: [] });

    try {
      Mail.validate(inputs.mail);
    } catch (e) {
      setErrors({ mail: [(e as Error).message] });
    }
  }, [inputs.mail, setErrors]);

  const validatePassword = useCallback((): void => {
    setErrors({ password: [] });

    try {
      Password.validate(inputs.password);
    } catch (e) {
      setErrors({ password: [(e as Error).message] });
    }
  }, [inputs.password, setErrors]);

  return {
    inputs,
    errors,
    isInputted,
    hasError,
    setInputs,
    init,
    validateMail,
    validatePassword,
  };
};
