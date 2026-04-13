import posthog from 'posthog-js';

// In a real application, POSTHOG_API_KEY would come from .env
const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_placeholder_key';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

export const initAnalytics = () => {
    if (typeof window !== 'undefined') {
        posthog.init(POSTHOG_API_KEY, {
            api_host: POSTHOG_HOST,
            autocapture: true,
            capture_pageview: true,
            capture_pageleave: true,
            loaded: (posthog) => {
                if (import.meta.env.DEV) {
                    posthog.debug(true);
                }
            }
        });
    }
};

export const captureEvent = (eventName: string, properties?: object) => {
    posthog.capture(eventName, properties);
};

export const identifyUser = (userId: string, properties?: object) => {
    posthog.identify(userId, properties);
};
