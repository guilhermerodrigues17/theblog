'use client';

import {
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { logoutAction } from '@/actions/login/logout-action';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type ManageUserMenuProps = {
  isAuthenticated: boolean;
};

export function ManageUserMenu({ isAuthenticated }: ManageUserMenuProps) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  async function handleLogout(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    e.preventDefault();
    await logoutAction();
  }

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setToggleMenu(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    setToggleMenu(false);
  }, [pathname]);

  const listItemsStyles = clsx(
    'flex items-center gap-2 p-4',
    'hover:bg-slate-800 cursor-pointer transition-all duration-200',
  );

  return (
    <div className='relative' ref={containerRef}>
      <DefaultButton
        variant='ghost'
        onClick={() => setToggleMenu(prev => !prev)}
      >
        <UserCircle2Icon />
      </DefaultButton>

      {toggleMenu && (
        <div className='absolute right-0 mt-2 rounded-lg bg-slate-900 shadow-lg z-50'>
          <ul className='py-1 text-white'>
            {isAuthenticated && (
              <>
                <li>
                  <Link href='/admin/user' className={listItemsStyles}>
                    <SettingsIcon className='h-5 w-5' />
                    Configurações
                  </Link>
                </li>

                <li className={listItemsStyles} onClick={handleLogout}>
                  <LogOutIcon className='h-5 w-5' />
                  Fazer logout
                </li>
              </>
            )}

            {!isAuthenticated && (
              <li>
                <Link href={'/login'} className={listItemsStyles}>
                  <LogInIcon className='h-5 w-5' />
                  <span className='whitespace-nowrap'>Fazer Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
