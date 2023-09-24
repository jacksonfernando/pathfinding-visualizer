'use client';

import { useState } from 'react';
import navbarStyle from './navbar.module.css'
import { HiOutlineBars3 } from "react-icons/hi2";
import { latoFont } from '../../../config/fonts'
import { IoCloseOutline } from "react-icons/io5";
import { NAVBAR_TITLE } from '../../../constants/global';
import { useParams } from '../../../store/context';
import Algorithmsmodal from '../modal/AlgorithmsModal';
import GridSizeModal from '../modal/GridSizeModal';

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const { setRun, run, setRestart, restart } = useParams();

  const renderMenu = (containerStyle, listStyle) => {
    return (
      <div className={containerStyle}>
        <ul className={listStyle}>
          <li>
            <p onClick={() => setIsModalOpen(true)}>Algorithms</p>
          </li>
          <li>
            <p onClick={() => {
              setRestart(!restart)
              setRun(!run)
            }}>Start</p>
          </li>
          <li>
            <p onClick={() => setRestart(!restart)}>Clear Maze</p>
          </li>
          <li>
            <p onClick={() => setIsGridModalOpen(true)}>Grid Size</p>
          </li>
        </ul>
      </div >
    );
  }

  const renderNavbarIcons = () => {
    const icons = {
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
          {dropdownMenu && renderMenu(navbarStyle.dropdownMenu, navbarStyle.dropdownMenuList)}
          <div className={navbarStyle.iconContainer}>
            {renderNavbarIcons()}
          </div>
        </div>
        <Algorithmsmodal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <GridSizeModal open={isGridModalOpen} setIsModalOpen={setIsGridModalOpen} />
      </header >
    </>
  )
}

export default Navbar
