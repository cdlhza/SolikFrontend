import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import  {IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson} from 'react-icons/io5'

function Navbar() {
    const {isAuthenticated, logout, user}= useAuth();
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-start
    py-5 px-10 rounded-lg">
        <Link to={
          isAuthenticated ? '/products' : '/'}
          >
        <h1 className="text-2xl font-bold">Productos</h1> 
        </Link>
      <ul className="flex gap-x-2">
        {
            isAuthenticated?(
                <>
                     <li>
                      <div className='flex mx-3 px-3'>
                       <IoPerson size={30}/> {user.username}
                        </div>
                     </li>
                     <li>
                        <Link to='/add-product'
                         className='bg-zinc-500 rounded-sm'
                         ><IoAddCircle  size={30}/>
                         </Link>
                     </li>
                     <li>
                        <Link to='/' onClick={()=>{logout()}}
                         className='bg-zinc-500   rounded-sm'
                         >
                        <IoLogOut size={30}/>
                        </Link>
                     </li>
                </>
            ):(
                <>
                     <li>
                        <Link to='/Login'
                        className='bg-zinc-500 rounded-sm'
                        >
                          <IoLogIn  size={30}/>
                        </Link>
                     </li>
                     <li>
                     <Link to="/register"
                      className='bg-zinc-500   rounded-sm'
                      >
                        <IoPersonAdd size={30}/>
                      </Link>
                     </li>
                </>
            )
        }
        
      </ul>
    </nav>
  );
}

export default Navbar;
