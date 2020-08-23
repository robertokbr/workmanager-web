import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<InputProps> = ({
  name,
  icon: Icon,
  children,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const { fieldName, error, registerField } = useField(name);
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      >
        {children}
      </select>
    </Container>
  );
};

export default Select;
