import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface formProps {
  hasError: boolean;
}

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  position: absolute;
  top: 15%;
  font-size: 64px;
  color: #fff;
`;

export const UsersContainer = styled.div`
  margin-top: 80px;
  max-width: 700px;
`;

export const LinkContainer = styled(Link)`
  background: #333333;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  margin-bottom: 16px;

  &:hover {
    transform: scale(1.02);
  }
`;

export const UserDataContainer = styled.div`
  flex: 1;
  margin: 0 16px;
`;

export const UserName = styled.strong`
  font-size: 20px;
  color: #fff;
`;

export const UserAccountState = styled.p`
  font-size: 18px;
  color: #fff;
  margin-top: 4px;
`;

export const ChevronIcon = styled(FiChevronRight)`
  margin-left: auto;
  color: #cbcbd6;
`;
