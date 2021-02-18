import React from 'react';
import { FiX } from 'react-icons/fi';

import * as S from './styles';
import getNameInitials from '../../utils/getNameInitials';
import Loading from '../Loading';

interface AvatarProps {
  name: string;
  image?: string;
  bottomName?: boolean;
  largeAvatar?: boolean;
  closeIcon?: boolean;
}

const CustomAvatar: React.FC<AvatarProps> = ({
  name,
  image,
  closeIcon,
  bottomName,
  largeAvatar,
}) => {
  const initialsName = getNameInitials(name);

  return (
    <S.Wrapper>
      <S.Container>
        {image ? (
          <S.AvatarImage src={image} alt={name} />
        ) : (
          <S.AvatarNoImg bigger={largeAvatar}>
            <S.AvatarName>{initialsName}</S.AvatarName>
          </S.AvatarNoImg>
        )}
        {closeIcon && (
          <S.IconContainer>
            <FiX size={20} color="#333" />
          </S.IconContainer>
        )}
      </S.Container>
      {bottomName && <S.BottomName>{name}</S.BottomName>}
    </S.Wrapper>
  );
};

export default CustomAvatar;
