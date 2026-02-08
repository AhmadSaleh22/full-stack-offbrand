import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Middleware ──────────────────────────────────────────────────────────────
// Placeholder middleware for route protection.
// localStorage is not accessible in middleware (server-side), so token-based
// protection will require migrating to cookie-based token storage.
// For now this is a no-op that can be extended later.

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
