import './App.css';
import LeftSection from './Component/LeftSection/LeftSection';
import RightSection from './Component/RightSection/RightSection';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';

function App() {
  return (
    <div className="app">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', minWidth: '100vh',  }}
        className='mui-grid-width'
      >
        <Card sx={{  borderRadius: '50px' }} className='sections-main'>
          <LeftSection />
          <RightSection />
        </Card>
      </Grid>
    </div>
  );
}

export default App;
