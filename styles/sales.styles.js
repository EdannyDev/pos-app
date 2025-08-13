import styled from '@emotion/styled'

export const SalesContainer = styled.div`
  padding: 0;

  @media (max-width: 768px) {
    padding: 0 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`

export const Title = styled.h1`
  text-align: center;
  color: #00e0ff;
  margin-bottom: 20px;
  text-shadow: 0px 0px 8px rgba(0, 224, 255, 0.7);

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`

export const Form = styled.form`
  background: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  select, input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #333;
    color: var(--foreground);
    height: 36px;
    line-height: 1.2;
    box-sizing: border-box;

    &:focus {
      border-color: #00ffc3;
      outline: none;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      height: 34px;
      padding: 6px;
    }
  }

  h2 {
    color: #00ffc3;
    text-align: center;
    text-shadow: 0px 0px 8px rgba(0, 255, 195, 0.6);
  }
`

export const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  select {
    flex: 5;

    @media (max-width: 480px) {
      flex: 4;
      font-size: 0.9rem;
    }
  }

  input {
    flex: 1;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  span {
    flex: 1;
    text-align: center;
    font-weight: bold;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  button {
    flex: 0;
    background: #ff4d4f;
    color: var(--foreground);
    font-weight: bold;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #d9363e;
    }

    @media (max-width: 480px) {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
  }
`

export const AddProductButton = styled.button`
  background: #00ffc3;
  color: var(--background);
  font-weight: bold;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background: #00ccaa;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    @media (max-width: 480px) {
      padding: 8px 12px;
      font-size: 0.95rem;
    }
  }

  button[type="submit"] {
    background: #00e0ff;
    color: var(--background);

    &:hover {
      background: #00b8cc;
    }
  }

  button.cancel {
    background: #d9d9d9;
    color: var(--background);

    &:hover {
      background: #bfbfbf;
    }
  }
`

export const SearchWrapper = styled.div`
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 480px) {
    margin: 8px 0 16px 0;
  }
`

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 300px;

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 8px 8px 8px 10px;
    font-size: 14px;
    border-radius: 5px;
    border: 2px solid transparent;
    background-color: #333;
    color: var(--foreground);
    height: 36px;
    box-sizing: border-box;

    &:focus {
      border-color: #00ffc3;
      outline: none;
    }

    &::placeholder {
      color: #aaa;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      height: 34px;
      padding-left: 8px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  font-size: 1rem;

  thead {
    background: #00ffc3;
    th {
      padding: 10px;
      text-align: center;
      color: var(--background);

      @media (max-width: 480px) {
        padding: 8px 5px;
        font-size: 0.85rem;
      }
    }
  }

  tbody {
    tr:nth-of-type(even) {
      background-color: #2a2a2a;
    }
    tr:nth-of-type(odd) {
      background-color: #222;
    }
    td {
      padding: 10px;
      text-align: center;

      @media (max-width: 480px) {
        padding: 8px 5px;
        font-size: 0.85rem;
      }
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 6px 10px;
    border-radius: 5px;
    transition: color 0.3s;

    &.edit {
      color: #ffc107;

      &:hover {
        color: #e0a800;
      }
    }

    &.delete {
      color: #dc3545;

      &:hover {
        color: #a71d2a;
      }
    }

    @media (max-width: 480px) {
      font-size: 14px;
      padding: 4px 8px;
    }
  }
`

export const PaginationWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`

export const PageButton = styled.button`
  background: ${({ isActive }) => (isActive ? '#00ffc3' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#000' : '#00ffc3')};
  border: 2px solid #00ffc3;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background: #00e0b8;
    color: #000;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.9rem;
  }
`