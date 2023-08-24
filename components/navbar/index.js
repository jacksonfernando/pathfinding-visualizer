import { useState } from 'react';
import navbarStyle from './navbar.module.css'
import Link from 'next/link';
import { HiMagnifyingGlass, HiOutlineMoon, HiOutlineBars3 } from "react-icons/hi2";
import { latoFont } from '../../pages/_app'
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import { NAVBAR_TITLE } from '../../constants/global';


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const router = useRouter();

  const renderMenu = (containerStyle, listStyle) => {
    const aboutClassName = router.pathname == '/'
      ? navbarStyle.activeMenu : undefined;
    const projectClassName = router.pathname == '/projects'
      ? navbarStyle.activeMenu : undefined;
    const blogsClassName = router.pathname == '/blogs'
      ? navbarStyle.activeMenu : undefined;
    const linksClassName = router.pathname == '/links'
      ? navbarStyle.activeMenu : undefined;

    return (
      <div className={containerStyle}>
        <ul className={listStyle}>
          <li>
            <Link href='/' className={aboutClassName}>About</Link>
          </li>
          <li>
            <Link href='/projects' className={projectClassName}>Projects</Link>
          </li>
          <li>
            <Link href={'/blogs'} className={blogsClassName}>Blogs</Link>
          </li>
          <li>
            <Link href={'/links'} className={linksClassName}>Links</Link>
          </li>
        </ul>
      </div >
    );
  }

  const renderNavbarIcons = () => {
    const icons = {
      moonIcon: <HiOutlineMoon size={22} key='moon' />,
      searchIcon: <HiMagnifyingGlass size={22} key='search' />,
      menuIcon: <HiOutlineBars3
        key='menu'
        size={30}
        className={navbarStyle.outlineMenu}
        onClick={() => setDropdownMenu(!dropdownMenu)}
      />
    }
    if (dropdownMenu) {
      icons['menuIcon'] = <IoCloseOutline
        key='closeMenu'
        size={33}
        onClick={() => setDropdownMenu(!dropdownMenu)}
        className={navbarStyle.outlineMenu}
      />
    }
    return Object.values(icons).map(icon => icon)
  }

  return (
    <>
      <header className={navbarStyle.headerContainer}>
        <div className={navbarStyle.headerMenu}>
          <h4>{NAVBAR_TITLE}</h4>
          <div className={latoFont.variable}>
            {renderMenu(navbarStyle.menuContainer, navbarStyle.menuList)}
          </div>
          <div className={navbarStyle.iconContainer}>
            {renderNavbarIcons()}
          </div>
          {dropdownMenu && renderMenu(navbarStyle.dropdownMenu, navbarStyle.dropdownMenuList)}
        </div>
      </header>
    </>
  )
}

export default Navbar
