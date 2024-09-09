import { NextResponse } from 'next/server'


export function middleware(request) {
  // const { state: { user, token, isAuthenticated } } = useContext(UserContext);
  const token = request.cookies.get('token');
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'|| path === '/website-calculator'

  if (isPublicPath && token) {
    // return NextResponse.redirect(new URL('/', request.nextUrl))
    const url = new URL(request.url);
    const returnUrl = url.searchParams.get('returnUrl') || '/';
    return NextResponse.redirect(new URL(returnUrl, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // return NextResponse.redirect(new URL('/login', request.nextUrl))
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set('returnUrl', path);
    return NextResponse.redirect(loginUrl);
  }

}

export const config = {
  matcher: [
    '/profile',
  ]
}



