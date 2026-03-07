(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
// Unprotected paths
const PUBLIC_PATHS = [
    '/login'
];
// Allow requests for Next.js internals and public static files
function isPublicRequest(pathname) {
    return pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico') || pathname.includes('.') || // public folder
    PUBLIC_PATHS.includes(pathname);
}
// Decode a base64url JWT and check its 'exp' claim
function isTokenExpired(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return true;
        // 1. Convert Base64URL to Base64
        let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        // 2. FIXED: Add Padding (Required for atob in Edge Runtime)
        const padding = base64.length % 4;
        if (padding) {
            base64 += '='.repeat(4 - padding);
        }
        // 3. Decode
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const payload = JSON.parse(jsonPayload);
        const nowInSecs = Date.now() / 1000;
        return typeof payload.exp !== 'number' || payload.exp < nowInSecs;
    } catch (e) {
        console.error("Token decode failed:", e);
        return true;
    }
}
async function middleware(req) {
    const { pathname } = req.nextUrl;
    // Check for access token cookie
    const accessToken = req.cookies.get('accessToken')?.value;
    const hasValidSession = accessToken && !isTokenExpired(accessToken);
    // Redirect authenticated users away from login page
    if (pathname === '/login' && hasValidSession) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/users', req.url));
    }
    // Allow any public or static request
    if (isPublicRequest(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Redirect root to dashboard
    if (pathname === '/') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/users', req.url));
    // Clear cookies on logout
    if (pathname === '/logout') {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', req.url));
        response.cookies.delete('accessToken');
        return response;
    }
    // Protect private routes
    if (!hasValidSession) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', req.url));
    }
    // Authenticated, proceed
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    // Protect everything except Next.js internals
    matcher: [
        '/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map