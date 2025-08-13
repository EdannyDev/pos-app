import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUpModal = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`

export const Form = styled.form`
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 195, 0.6);
  width: 380px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: var(--foreground);

  @media (max-width: 768px) {
    padding: 2rem 2rem;
    width: 100%; /* Full width para tablets */
    max-width: 320px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.5rem;
    max-width: 100%; /* Full ancho móvil */
  }
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #00ffc3;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #222;
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  gap: 0.4rem;
  font-size: 1rem;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #00ffc3;
  }

  svg {
    color: #00ffc3;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.6rem;
  }
`

export const Input = styled.input`
  flex: 1;
  border: none;
  background: #222;
  font-size: 1rem;
  outline: none;
  color: #eee;
  line-height: 1.4;
  transition: all 0.3s ease;
  padding-right: 2.4rem;
  box-sizing: border-box;

  &::placeholder {
    color: #666;
  }

  &:focus {
    color: #eee;
  }

  @media (max-width: 768px) {
    padding-right: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding-right: 2.2rem;
  }
`

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  padding: 0;
  height: auto;
  line-height: 1;
  color: inherit;

  &:hover {
    color: #00ffc3;
  }

  @media (max-width: 768px) {
    right: 14px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    right: 12px;
    font-size: 0.95rem;
  }
`

export const SubmitButton = styled.button`
  margin-top: 0.2rem;
  padding: 0.75rem 0;
  background-color: #00ffc3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00ccaa;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 0;
  }
`

export const LinksContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.9rem;
  text-align: center;
  color: #666;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.5rem;
  }
`

export const LinkButton = styled.button`
  margin-bottom: 0.4rem;
  background: none;
  border: none;
  color: #00ffc3;
  cursor: pointer;
  padding: 0;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeInOverlay} 0.25s ease-in-out forwards;
`

export const ModalContent = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 12px;
  width: 360px;
  max-width: 90%;
  box-shadow: 0 0 20px rgba(0, 255, 195, 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${slideUpModal} 0.3s ease-in-out forwards;

  @media (max-width: 768px) {
    width: 300px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 1rem 1rem 1.2rem;
  }
`

export const ModalTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  color: #00ffc3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`

export const ModalButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? '#6c757d' : '#00ffc3')};
  color: ${(props) => (props.cancel ? '#eee' : '#111')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.cancel ? '#5a6268' : '#00ccaa')};
  }

  &:focus {
    outline: 2px solid #00ffc3;
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.8rem;
  }
`