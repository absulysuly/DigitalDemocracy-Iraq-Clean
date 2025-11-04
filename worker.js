/**
 * Cloudflare Worker for Iraqi Digital Democracy Platform
 *
 * This worker handles:
 * - API request proxying to Railway backend
 * - CORS headers for international access
 * - Request logging and analytics
 * - Edge caching for static candidate data
 *
 * Deployment:
 * - Run "npm run dev" to start local development server
 * - Run "npm run deploy" to publish to Cloudflare edge network
 *
 * Learn more: https://developers.cloudflare.com/workers/
 */

const RAILWAY_API = 'https://digitaldemocracy-iraq-production.up.railway.app';
const ALLOWED_ORIGINS = [
  'https://digitaldemocracy-iraq.pages.dev',
  'http://localhost:3000',
  'http://localhost:8787'
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Log incoming requests for monitoring
    console.info({
      message: 'Iraqi Election Platform - Request received',
      path: url.pathname,
      method: request.method,
      timestamp: new Date().toISOString()
    });

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // Proxy API requests to Railway backend
    if (url.pathname.startsWith('/api/')) {
      return proxyToRailway(request, url);
    }

    // Default response for root path
    if (url.pathname === '/') {
      return new Response(
        JSON.stringify({
          platform: 'Iraqi Digital Democracy Platform',
          status: 'operational',
          message: 'مرحباً بكم في منصة الديمقراطية الرقمية العراقية',
          endpoints: {
            api: RAILWAY_API,
            docs: '/api/docs'
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    return new Response('Not Found', { status: 404 });
  }
};

/**
 * Handle CORS preflight requests
 */
function handleCORS(request) {
  const origin = request.headers.get('Origin');
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin?.includes('vercel.app');

  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
}

/**
 * Proxy requests to Railway backend API
 */
async function proxyToRailway(request, url) {
  try {
    const apiUrl = `${RAILWAY_API}${url.pathname}${url.search}`;

    const response = await fetch(apiUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    // Clone response and add CORS headers
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

    return modifiedResponse;
  } catch (error) {
    console.error({ message: 'Railway API proxy error', error: error.message });

    return new Response(
      JSON.stringify({
        error: 'Backend API unavailable',
        message: 'الخدمة غير متوفرة مؤقتاً'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
