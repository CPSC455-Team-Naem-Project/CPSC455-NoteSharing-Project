import './home.scss';
import React from 'react';
import Authed from '../../components/Authed';
import { MENU, selectCurrentMenu, setCurrentMenu } from './MenuSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Stack } from '@mui/material';
import { HomeComponents } from './MenuItems';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const currentMenu = useAppSelector(selectCurrentMenu);

  const setMenu = (menuItem: MENU) => {
    dispatch(setCurrentMenu(menuItem));
  };

  const currentMenuData = HomeComponents[currentMenu];

  return (
    <Authed>
      <div className={'home-container'}>
        <div className={'left-panel'}>
          <h1>Menu</h1>
          <div className={'menu-list'}>
            {(Object.keys(HomeComponents) as unknown as MENU[]).map(
              (homeComponentKey) => {
                const menuData = HomeComponents[homeComponentKey];
                const Icon = menuData.icon;
                return (
                  <Link key={homeComponentKey} to={menuData.link}>
                    <div
                      onClick={() => setMenu(homeComponentKey)}
                      className={
                        currentMenu === homeComponentKey
                          ? 'menu-item menu-item-active'
                          : 'menu-item'
                      }
                    >
                      <div className={'left-bar'}></div>
                      <Stack direction="row" spacing={2}>
                        <Icon />
                        <p>{menuData.display}</p>
                      </Stack>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>

        <div className={'main-panel'}>
          {/* just to test the store data */}
          <h1>{currentMenuData.display}</h1>

          <Outlet />
        </div>
      </div>
    </Authed>
  );
};
