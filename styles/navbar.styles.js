import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const NavbarContainer = styled.header`
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #0f0f0f, #1a1a1a);
  color: #00ffc3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 10px #00ffc3;

  @media (min-width: 768px) {
    display: none;
  }
`

export const Logo = styled.h1`
  font-size: 1.2rem;
  letter-spacing: 1px;
`

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #00ffc3;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  svg {
    display: block;
    transition: transform 0.3s ease;
    transform-origin: center;
    transform: ${({ menuOpen }) => (menuOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  }
`

export const DropdownMenu = styled.nav`
  position: fixed;
  top: 50px;
  right: 20px;
  width: 200px;
  background: #111;
  box-shadow: 0 0 10px #00ffc3;
  border-radius: 8px;
  padding: 1rem 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  animation: ${fadeSlideDown} 0.3s ease forwards;

  @media (min-width: 768px) {
    display: none;
  }
`

export const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: #00ffc3;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #1f1f1f;
    outline: none;
  }

  ${({ active }) =>
    active &&
    `
    color: #00e0ff;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: 5px;
      left: 10%;
      width: 80%;
      height: 3px;
      background-color: #00e0ff;
      border-radius: 2px;
    }
  `}
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;

  @media (min-width: 768px) {
    display: none;
  }
`