import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    
  const token = req.cookies.get('token')?.value;
    

  if (token) {
    try {
      return NextResponse.next(); 
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url)); 
    }
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/', '/subordinates'],
};
