/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import TableCell from '@mui/material/TableCell';

// Material Dashboard 2 PRO React components
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';

const BudgetTableCell = ({ title, content, image, noBorder, ...rest }) => {
  return (
    <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
      <MDBox display="flex" flexDirection="column">
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}:
        </MDTypography>
        <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
        >
          {content}
        </MDTypography>
      </MDBox>
    </TableCell>
  );
};

// Setting default values for the props of BudgetTableCell
BudgetTableCell.defaultProps = {
  image: '',
  noBorder: false
};

// Typechecking props for the BudgetTableCell
BudgetTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool
};

export default BudgetTableCell;
