import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import CreditCardIcon from '@mui/icons-material/CreditCard';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// styles
const CardWrapper = styled(MainCard)(() => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `#1E88E5`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `#1E88E5`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading }) => {
  const theme = useTheme();

 

  // const [cashInGoing,setCashInGoing] = useState(0)
  const [posInGoing,setPosInGoing] = useState(0)



  const getInComing = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/api/Financial/inComing/list`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
       
    const posOutGoingTotal = response.data
      .filter(item => item.paymentType === 'Pos' && item.type === 'Satış')
      .reduce((total, item) => total + item.amount, 0);

    
    setPosInGoing(posOutGoingTotal);
    }catch(err){
      console.log(err)
    }
  }

useEffect(()=>{
  
  getInComing()
},[])


  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: "#5E35B1",
                      color:"#fff"
                    }}
                  >
                    <CreditCardIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4">
                      {posInGoing}₺
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2"  sx={{
                      color: theme.palette.grey[500],
                      mt: 0.5
                    }}>
                      Kartlı Satış
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
