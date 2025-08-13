import styled from '@emotion/styled'

export const RegisterWrapper = styled.div`
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
    width: 100%;
    max-width: 320px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.5rem;
    max-width: 100%;
  }
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #00ffc3;
  font-family: 'Orbitron', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`

export const InputGroup = styled.div`
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
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
    color: #00ffc3;

    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-top: 0;
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
  box-sizing: border-box;

  &::placeholder {
    color: #666;
  }

  &:focus {
    color: #eee;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export const PasswordToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  height: 100%;
  margin-top: 1px;

  &:hover {
    color: #00ffc3;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 0;
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