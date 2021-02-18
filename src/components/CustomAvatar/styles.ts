import styled, { css } from 'styled-components';

interface AvatarNoImgColor {
  bigger?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 64px;
`;

export const Container = styled.div`
  position: relative;
`;

export const AvatarImage = styled.img`
  width: 40px;
  border-radius: 20px;
`;

export const AvatarNoImg = styled.div<AvatarNoImgColor>`
  display: flex;
  background: #1c1b29;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  ${props =>
    props.bigger &&
    css`
      width: 64px;
      height: 64px;
      border-radius: 32px;
    `};
  align-items: center;
  justify-content: center;
`;

export const AvatarName = styled.h3`
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 0.15px;
  line-height: 22px;
`;

export const Icon = styled.img``;

export const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const BottomName = styled.p`
  font-weight: 200;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
  margin-top: 4px;
  color: #000;
`;
