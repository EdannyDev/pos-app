import styled from '@emotion/styled'

export const ReportsContainer = styled.div`
  padding: 0;
`

export const Title = styled.h1`
  text-align: center;
  color: #00e0ff;
  margin-bottom: 20px;
  text-shadow: 0px 0px 8px rgba(0, 224, 255, 0.7);
`

export const SectionTitle = styled.h2`
  margin: 20px 0;
  font-size: 1.5rem;
  color: #00ffc3;
  text-shadow: 0px 0px 8px rgba(0, 255, 195, 0.6);
`

export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
`

export const TooltipContainer = styled.div`
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  color: #00ffc3;
`

export const HighlightCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 1.5rem;
  color: #00ffc3;
  box-shadow: 0 0 10px rgba(0, 224, 255, 0.5);
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

  thead {
    background: #00ffc3;
    th {
      padding: 10px;
      text-align: center;
      color: var(--background);
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
    }
  }
`

export const DotCircle = styled(({ dataKey, ...rest }) => (
  <circle {...rest} r={3} />
))`
  fill: currentColor;
`