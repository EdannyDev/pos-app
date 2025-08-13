import styled from '@emotion/styled'

export const DashboardWrapper = styled.div`
  padding: 0;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`

export const DashboardTitle = styled.h1`
  font-size: clamp(18px, 6vw, 28px);
  margin-bottom: 1rem;
  color: #00e0ff;
  text-shadow: 0px 0px 8px rgba(0, 224, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 0.6rem;
  }
`

export const UserInfo = styled.div`
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
  }
`

export const InfoItem = styled.p`
  font-size: 1rem;
  margin: 0.3rem 0;
  color: #ccc;

  strong {
    color: #00e0ff;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`