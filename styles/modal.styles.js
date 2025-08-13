import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const fadeInBlur = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(3px);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInBlur} 0.3s ease forwards;
  backdrop-filter: blur(3px);
`

export const ModalContent = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 195, 0.7);
  animation: ${fadeInBlur} 0.3s ease;

  @media (max-width: 768px) {
    max-width: 320px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    padding: 1rem;
  }
`

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ffc3;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

export const WarningIcon = styled(FontAwesomeIcon)`
  color: #f59e0b;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  animation: ${pulse} 0.8s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 1rem;
  }
`

export const ModalText = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.7rem;
  }
`

export const ConfirmButton = styled.button`
  background-color: #00ffc3;
  color: #111;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    background-color: #00ccaa;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.8rem;
    font-size: 0.85rem;
    justify-content: center;
  }
`

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: #eee;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.8rem;
    font-size: 0.85rem;
    justify-content: center;
  }
`