'use client';
import clsx from 'clsx';
import { FileTextIcon, MenuIcon, PlusCircleIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const navStyles = clsx(
    'flex items-center justify-between gap-4 mb-8',
    'transition-all duration-500 ease-in-out',
    isExpanded ? 'w-full' : 'w-15',
    'overflow-x-scroll scrollbar-hide',
    'sm:justify-start sm:gap-12',
  );

  const linkStyles = clsx(
    'flex gap-2 items-center',
    'bg-slate-900 text-slate-100',
    'p-3 rounded-xl cursor-pointer',
    'shrink-0 hover:bg-slate-800',
    'transition duration-500 ease-in-out',
  );

  const menuBtnStyles = clsx(
    'bg-slate-900 text-slate-100 p-3 rounded-full',
    'flex items-center gap-2',
    'cursor-pointer z-10 hover:bg-slate-800 ',
    'transition-all duration-300',
  );

  return (
    <nav className={navStyles}>
      <button className={menuBtnStyles} onClick={() => setIsExpanded(s => !s)}>
        <div
          className={clsx(
            'transition-transform duration-300',
            isExpanded && 'rotate-90',
          )}
        >
          {!isExpanded && <MenuIcon size={20} />}
          {isExpanded && <XIcon size={20} />}
        </div>
      </button>

      <Link className={linkStyles} href='/admin/post'>
        <FileTextIcon size={20} />
      </Link>

      <Link className={linkStyles} href='/admin/post/new'>
        <PlusCircleIcon size={20} />
      </Link>
    </nav>
  );
}
