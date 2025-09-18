import { NextResponse } from 'next/server';

export function GET() {
  // eslint-disable-next-line no-console
  console.log('/v1/healthcheck');

  return NextResponse.json({ status: 'ok' });
}
