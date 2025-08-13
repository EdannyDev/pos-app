import styled from '@emotion/styled'

export const SidebarContainer = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100vh;
    background-color: #111;
    padding: 2rem 1rem;
    box-shadow: 0 0 10px #00ffc3;
    position: fixed;
    top: 0;
    left: 0;
  }
`

export const Title = styled.h2`
  color: #00ffc3;
  font-weight: 700;
  font-size: 1.5rem;
  user-select: none;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
`

export const Separator = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 255, 195, 0.3);
  margin: 1.25rem 0;
`

export const MenuItem = styled.div`
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-left: 3px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1f1f1f;
    border-left: 3px solid #00ffc3;
    border-radius: 8px;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #1f1f1f;
    border-left: 3px solid #00ffc3;
    border-radius: 8px;
    font-weight: 600;
  `}

  & svg {
    color: #00ffc3;
  }
`