import React, { useEffect, useRef } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

const Whiteboard = () => {
    const excalidrawRef = useRef(null);

    useEffect(() => {
        // You can initialize Excalidraw options here if needed
    }, []);

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <Excalidraw
                ref={excalidrawRef}
                // Add any additional props or options here
            />
        </div>
    );
};

export default Whiteboard;
