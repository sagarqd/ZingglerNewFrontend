import React, { useMemo, useCallback, useState, useEffect } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
  const [peer, setPeer] = useState(null);

  // Initialize RTCPeerConnection with ICE servers
  const initializePeer = useCallback(() => {
    const newPeer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: 'stun:global.stun.twilio.com:3478' }
      ]
    });

    newPeer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
      }
    };

    newPeer.ontrack = (event) => {
      console.log('Track event:', event);
      // Handle incoming tracks
    };

    setPeer(newPeer);
  }, []);

  // Create offer and set local description
  const createOffer = useCallback(async () => {
    if (!peer) {
      console.error('Peer connection not initialized');
      return null;
    }
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  }, [peer]);

  // Set remote description and create answer
  const answerCall = useCallback(async (offer) => {
    if (!peer) {
      console.error('Peer connection not initialized');
      return null;
    }
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  }, [peer]);

  // Add remote stream or track
  const addUser = useCallback((stream) => {
    if (peer) {
      stream.getTracks().forEach(track => peer.addTrack(track, stream));
    }
  }, [peer]);

  // Initialize peer connection on mount and clean up on unmount
  useEffect(() => {
    initializePeer();

    return () => {
      if (peer) {
        peer.close();
        setPeer(null); // Reset peer after closing
      }
    };
  }, [initializePeer]);

  return (
    <PeerContext.Provider value={{ peer, createOffer, answerCall, addUser }}>
      {props.children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
