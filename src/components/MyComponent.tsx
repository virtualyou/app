import { useLocation } from 'react-router-dom';

const MyComponent = () => {
    const query = new URLSearchParams(useLocation().search);
    const dkey = query.get('dkey');

    return (
        <div>
            <p>My parameter is: {dkey}</p>
        </div>
    );
};

export default MyComponent;
