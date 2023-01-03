import { Box } from '@chakra-ui/react';

export const renderTrack = ({ style, ...properties }: any) => {
  const trackStyle = {
    position: 'absolute',
    maxWidth: '100%',
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    background: 'transparent',
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div id="track" style={{ ...style, ...trackStyle }} {...properties} />;
};
export const renderThumb = ({ style, ...properties }: any) => {
  const thumbStyle = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div id="thmb" style={{ ...style, ...thumbStyle }} {...properties} />;
};
export const renderView = ({ style, ...properties }: any) => {
  const viewStyle = {};
  return <Box style={{ ...style, ...viewStyle }} {...properties} />;
};

export const kanbanRenderTrack = ({ style, ...properties }: any) => {
  const trackStyle = {
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...properties} />;
};
export const kanbanRenderThumb = ({ style, ...properties }: any) => {
  const thumbStyle = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...properties} />;
};
export const kanbanRenderView = ({ style, ...properties }: any) => {
  const viewStyle = {
    position: 'relative',
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...properties} />;
};

export const storiesRenderTrack = ({ style, ...properties }: any) => {
  const trackStyle = {
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...properties} />;
};
export const storiesRenderThumb = ({ style, ...properties }: any) => {
  const thumbStyle = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...properties} />;
};
export const storiesRenderView = ({ style, ...properties }: any) => {
  const viewStyle = {
    position: 'relative',
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...properties} />;
};
