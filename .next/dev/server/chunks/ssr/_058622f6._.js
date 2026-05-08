module.exports = [
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
// const BACKEND_sURL = 'https://app.scenezone.in/api'
const BACKEND_URL = 'https://api.thescenezone.com/api';
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
"[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00224d157e919e52dc2c3c4582924d304ebf13df94":"getEventsAction","405cb920a10f9dd29a0ad35a72024ffc590611b7e1":"getEventBookingsAction"},"",""] */ __turbopack_context__.s([
    "getEventBookingsAction",
    ()=>getEventBookingsAction,
    "getEventsAction",
    ()=>getEventsAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getEventsAction() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get("accessToken")?.value;
    try {
        // Ensure the generic passed to fetchApi matches the expected backend response structure
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchApi"])('/admin/get-all-events', {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });
        return {
            success: true,
            data: response.data
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        console.error("Get Events Action Error:", error);
        return {
            success: false,
            error: error.message || "Failed to fetch events"
        };
    }
}
async function getEventBookingsAction(eventId) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get("accessToken")?.value;
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchApi"])(`/admin/get-event-bookings/${eventId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });
        console.log("Bookings fetched for event:", eventId, response.data);
        return {
            success: true,
            data: response.data
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        console.error("Get Bookings Action Error:", error);
        return {
            success: false,
            error: error.message || "Failed to fetch bookings"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getEventsAction,
    getEventBookingsAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventsAction, "00224d157e919e52dc2c3c4582924d304ebf13df94", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventBookingsAction, "405cb920a10f9dd29a0ad35a72024ffc590611b7e1", null);
}),
"[project]/.next-internal/server/app/(main)/events/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/api.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$events$2f$actions$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/(main)/events/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/api.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00224d157e919e52dc2c3c4582924d304ebf13df94",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$events$2f$actions$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventsAction"],
    "405cb920a10f9dd29a0ad35a72024ffc590611b7e1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$events$2f$actions$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventBookingsAction"],
    "60d76025c50634ce4a0f0063e7dc968f49d761a8f5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchApi"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$events$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f28$main$292f$events$2f$actions$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/events/page/actions.js { ACTIONS_MODULE0 => "[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/api.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$main$292f$events$2f$actions$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(main)/events/actions.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_058622f6._.js.map