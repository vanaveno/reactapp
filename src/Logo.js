
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function Logo() {
    return (
    <>
      <div className='text-5xl py-4 text-gray-800 float-left'>
        <Link to="/">
          Gallery<span className='text-rose-700'>4</span>U
        </Link>
      </div>
      
    </>
  );
}

export default Logo;
