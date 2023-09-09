'use client';

import { useState } from 'react';
import navbarStyle from './navbar.module.css'
import { HiMagnifyingGlass, HiOutlineMoon, HiOutlineBars3 } from "react-icons/hi2";
import { latoFont } from '../../../config/fonts'
import { IoCloseOutline } from "react-icons/io5";
import { DFS_ALGORITHM, NAVBAR_TITLE } from '../../../constants/global';
import { useParams } from '../../../store/context';
import Algorithmsmodal from '../modal/AlgorithmsModal';

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setAlgo, setRun, run, setRestart, restart } = useParams();

  const onRunSimulation = () => {
    setAlgo(DFS_ALGORITHM);
    setRun(!run);
  }

  const renderMenu = (containerStyle, listStyle) => {
    return (
      <div className={containerStyle}>
        <ul className={listStyle}>
          <li>
            <p>Algorithms</p>
          </li>
          <li>
            <p onClick={() => onRunSimulation()}>Start</p>
          </li>
          <li>
            <p onClick={() => setRestart(!restart)}>Clear Maze</p>
          </li>
          <li>
            <p onClick={() => setIsModalOpen(!isModalOpen)}>Grid Size</p>
          </li>
          <li>
            <p>Starting Position</p>
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
        <Algorithmsmodal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </header >
    </>
  )
}

export default Navbar
