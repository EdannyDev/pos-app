import styled from '@emotion/styled'

export const InventoryContainer = styled.div`
  padding: 0;

  @media (max-width: 768px) {
    padding: 0 1rem;
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

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
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
    font-size: 1rem;

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
      font-size: 13px;
      height: 32px;
      padding: 6px;
    }
  }

  h2 {
    color: #00ffc3;
    text-align: center;
    text-shadow: 0px 0px 8px rgba(0, 255, 195, 0.6);
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 8px 12px;
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
    justify-content: center;
  }
`

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

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
      font-size: 13px;
      height: 32px;
      padding-left: 8px;
    }
  }
`

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
`

export const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;

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

    @media (max-width: 480px) {
      font-size: 16px;
      padding: 4px 8px;
    }

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
  }
`

export const DescriptionInput = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: #333;
  color: var(--foreground);
  height: auto;
  resize: vertical;
  font-family: Arial, Helvetica, sans-serif;

  &:focus {
    border-color: #00ffc3;
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 6px;
  }
`

export const DescriptionCell = styled.td`
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

export const ImageCell = styled.td`
  text-align: center;
`

export const ImageThumb = styled.img`
  max-width: 50px;
  max-height: 40px;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 480px) {
    max-width: 40px;
    max-height: 32px;
  }
`

export const PaginationWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`

export const PageButton = styled.button`
  background: ${({ active }) => (active ? '#00ffc3' : 'transparent')};
  color: ${({ active }) => (active ? '#000' : '#00ffc3')};
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