import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { Track } from "livekit-client";

const wsUrl = "wss://avashnp-p123vr0b.livekit.cloud";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tIjoiYXZhc2hSb29tIiwicm9vbUpvaW4iOnRydWV9LCJpc3MiOiJBUElKZUtwcmlFTUxnejkiLCJleHAiOjE3MzUwMDExOTIsIm5iZiI6MCwic3ViIjoiU3Vrc2hhbSJ9.FHqk_01UGg-_ra-m_ghXpr7w20V_u8Nxi7yz5621rZQ";
export default function Video() {
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={wsUrl}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
