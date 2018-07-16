import styled from 'styled-components';

export const StyledDataTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;
`;

export const StyledDataTableRow = styled.tr`
  height: 100%;
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export const StyledDataTableBody = styled.tbody`
  height: 100%;
  ${props => props.size && `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size]};
    overflow: auto;
  `}
`;

export const StyledDataTableHeader = styled.thead`
  height: 100%;
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export const StyledDataTableFooter = styled.tfoot`
  height: 100%;
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export default {};
