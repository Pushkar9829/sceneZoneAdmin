module.exports = [
"[project]/app/(auth)/login/schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginSchema",
    ()=>loginSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email("Please enter a valid email address."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required.")
});
}),
"[project]/lib/exceptions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
class ApiError extends Error {
    status;
    constructor(message, status = 500){
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}
}),
"[project]/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60d76025c50634ce4a0f0063e7dc968f49d761a8f5":"fetchApi"},"",""] */ __turbopack_context__.s([
    "fetchApi",
    ()=>fetchApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/exceptions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// Set BACKEND_URL in .env to match your API (e.g. http://localhost:5000/api)
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';
async function fetchApi(path, options = {}) {
    const url = `${BACKEND_URL}${path}`;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('accessToken')?.value;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    // MANUALLY ATTACH THE TOKEN
    if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;
        headers['Authorization'] = `Bearer ${token}`;
    }
    let response;
    try {
        response = await fetch(url, {
            ...options,
            headers
        });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"]('Network error. Please check your connection.', 503);
    }
    // Handle parsing based on content type
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        try {
            data = await response.json();
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"]('Invalid JSON response from server', 500);
        }
    }
    // If status is not 2xx, throw error using the parsed message if available
    if (!response.ok) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"](data?.message || data?.error || `Request failed (${response.status})`, response.status);
    }
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchApi
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchApi, "60d76025c50634ce4a0f0063e7dc968f49d761a8f5", null);
}),
"[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"602df4264b7aaafda9cdf362b1500cf7e01f8fe2ce":"loginAction"},"",""] */ __turbopack_context__.s([
    "loginAction",
    ()=>loginAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$auth$292f$login$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(auth)/login/schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/exceptions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function loginAction(_prevState, formData) {
    const values = {
        email: formData.get("email"),
        password: formData.get("password")
    };
    // 1. Validate Input
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$auth$292f$login$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginSchema"].safeParse(values);
    if (!validated.success) {
        return {
            values,
            errors: validated.error.flatten().fieldErrors
        };
    }
    try {
        // 2. Call API
        // fetchApi returns the parsed JSON object directly
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchApi"])('/admin/auth/login', {
            method: 'POST',
            body: JSON.stringify(validated.data)
        });
        // 3. Set Cookie
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        cookieStore.set("accessToken", response.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            sameSite: "lax"
        });
    } catch (error) {
        console.error("Login Action Error:", error);
        // Return specific backend error message if available
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$exceptions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"]) {
            return {
                values,
                errors: {
                    root: [
                        error.message
                    ]
                }
            };
        }
        return {
            values,
            errors: {
                root: [
                    "Something went wrong. Please try again."
                ]
            }
        };
    }
    // 4. Redirect (must be outside try/catch)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/users");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "602df4264b7aaafda9cdf362b1500cf7e01f8fe2ce", null);
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$auth$292f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "602df4264b7aaafda9cdf362b1500cf7e01f8fe2ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$auth$292f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f28$auth$292f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => "[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$auth$292f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(auth)/login/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_9b85e201._.js.map