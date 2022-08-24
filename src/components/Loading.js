import './Loading.css';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
        <div className='App-loading'>
            <CircularProgress />
        </div>
    );
}

export default Loading;