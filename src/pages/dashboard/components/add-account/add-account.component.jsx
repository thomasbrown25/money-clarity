import { usePlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { publicTokenExchange } from 'store/user/user.action';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';

const AddAccount = ({ user: { currentUser }, publicTokenExchange }) => {
  const { open, ready } = usePlaidLink({
    token: currentUser?.linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      console.log(metadata);
      console.log('updating token');
      publicTokenExchange(metadata.public_token);
    },
    onExit: (error) => {
      console.log('got an error trying to update link token');
      console.log(error);
    }
  });

  return (
    <MDBox mt={3} ml={3}>
      <div className="add-account">
        <MDButton
          component="a"
          variant="gradient"
          onClick={() => open()}
          color="dark"
        >
          Add Account
        </MDButton>
      </div>
    </MDBox>
  );
};

AddAccount.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  publicTokenExchange
})(AddAccount);
