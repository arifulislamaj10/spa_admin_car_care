import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Simulated environment variable for the websocket server URL
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

export interface BookingEvent {
    bookingId: string;
    status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    message: string;
    timestamp: string;
}

export const useLiveBookings = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [liveEvents, setLiveEvents] = useState<BookingEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // In strict mode this might run twice, but connection logic ensures safety
        const socketInstance = io(WS_URL, {
            autoConnect: true,
            reconnection: true,
            transports: ['websocket']
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to CarCare24x7 Live Feed');
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        socketInstance.on('booking:status_change', (event: BookingEvent) => {
            setLiveEvents((prev) => [event, ...prev].slice(0, 50)); // Keep last 50 events in memory
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return { socket, isConnected, liveEvents };
};
