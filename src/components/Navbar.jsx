import {useState} from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { productQuantityLabel } = useCart();
    const {setShowSearch} = useShop();



  return (
    <div className='flex items-center justify-between py-5 font-medium'>

        <Link to='/'>
              <img src={assets.logo} className="w-36" alt="" />
        </Link>
    

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

       </ul>

        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} className='w-5 cursor-pointer' onClick={()=>setShowSearch(true)} alt="" />

            <div className='group relative'>
                <Link to='/login'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                </Link>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded' >
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{productQuantityLabel}</p>
            </Link>

            {/* mobile menu icon */}
            <img src={assets.menu_icon} className='w-5 sm:hidden cursor-pointer' alt="mobile menu" onClick={()=>setVisible(true)}/>
        </div>

        {/* sidebar menu for small screen */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${ visible ? 'w-full' : 'w-0' }`}>
            <div className='flex flex-col text-gray-700'>
                <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={()=>setVisible(false)}>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    <p>Back</p>
                </div>

                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>

                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>

            </div>

        </div>
    </div>
  )
}

export default Navbar