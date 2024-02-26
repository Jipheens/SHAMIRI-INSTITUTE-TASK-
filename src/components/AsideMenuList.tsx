import React from 'react';
import { MenuAsideItem } from '../interfaces';
import AsideMenuItem from './AsideMenuItem';
import { useAppSelector } from '../stores/hooks';
import { hasPermission } from '../helpers/userPermissions';

type Props = {
  menu: MenuAsideItem[];
  isDropdownList?: boolean;
  className?: string;
};

export default function AsideMenuList({
  menu,
  isDropdownList = false,
  className = '',
}: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) return null;

  return (
    <ul className={className}>
      {menu.map((item, index) => {
        if (!hasPermission(currentUser, item.permissions)) return null;

        return (
          <AsideMenuItem
            key={index}
            item={item}
            isDropdownList={isDropdownList}
          />
        );
      })}
    </ul>
  );
}
