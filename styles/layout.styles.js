import styled from '@emotion/styled'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;

  @media (min-width: 768px) {
    margin-left: 250px;
    padding: 2rem;
  }
`