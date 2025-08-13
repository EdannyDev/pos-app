import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 0;
`

export const Title = styled.h1`
  text-align: center;
  color: #00e0ff;
  margin-bottom: 50px;
  text-shadow: 0px 0px 8px rgba(0, 224, 255, 0.7);

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`

export const Form = styled.form`
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #00ffc3;
    font-size: 16px;
    pointer-events: none;

    @media (max-width: 1024px) {
      top: 49%;
    }

    @media (max-width: 768px) {
      top: 28%;
    }
  }

  input {
    flex: 0 0 500px;
    max-width: 500px;
    padding: 8px 8px 8px 35px;
    font-size: 14px;
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #333;
    color: var(--foreground);
    height: 36px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #00ffc3;
      outline: none;
    }
  }

  @media (max-width: 1024px) {
    input {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    input {
      width: 100%;
      height: 42px;
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    input {
      height: 40px;
      font-size: 16px;
    }
  }
`

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 0 500px;
  max-width: 500px;
  width: 100%;

  input {
    width: 100%;
    padding-left: 35px;
    padding-right: 35px !important;
    font-size: 14px;
    height: 36px;
    border-radius: 5px;
    border: 2px solid transparent;
    background-color: #333;
    color: var(--foreground);
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #00ffc3;
      outline: none;
    }
  }

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #00ffc3;
    font-size: 16px;
    pointer-events: none;

    @media (max-width: 768px) {
      top: 49%;
    }
  }

  .password-toggle-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #00ffc3;
    user-select: none;
  }

  @media (max-width: 1024px) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    input {
      height: 42px;
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    input {
      height: 40px;
      font-size: 16px;
    }
  }
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 20px 0;
`

export const UserRole = styled.p`
  flex: 0 0 500px;
  font-size: 15px;
  color: #ffcc00;
  font-weight: 600;
  font-style: italic;
  margin: 0;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    font-size: 16px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

export const DescriptionWrapper = styled.div`
  max-width: 300px;
  text-align: right;
  user-select: none;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: left;
  }
`

export const DescriptionText = styled.p`
  font-size: 18px;
  color: var(--foreground);
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: space-between;

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 14px;
    }
  }

  button[type='submit'] {
    background: #00e0ff;
    color: var(--background);

    &:hover {
      background: #00b8cc;
    }
  }

  button.delete {
    background: #d63031;
    color: #fff;

    &:hover {
      background: #b02526;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    button {
      width: 100%;
      justify-content: center;
      font-size: 16px;

      svg {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    button {
      padding: 12px 0;
    }
  }
`