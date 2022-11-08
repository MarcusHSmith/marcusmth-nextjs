import { ReactElement } from 'react';

export default function Layout({ children }): ReactElement {
  return (
    <div className='flex flex-col min-h-screen px-4'>
      <main className='container mx-auto flex-1'>{children}</main>
    </div>
  );
}