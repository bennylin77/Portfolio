import React from 'react';
import styles from './styles.js';

export const MediaControls = (props) => {
    return (
        <div>
          <div style={{marginBottom: 10}}>
            Use the buttons to add audio, image, or video.
          </div>
          <div style={{marginBottom: 10}}>
            Here are some local examples that can be entered as a URL:
            <ul>
              <li>media.mp3</li>
              <li>media.png</li>
              <li>media.mp4</li>
            </ul>
          </div>
          <div style={styles.buttons}>
            <button onMouseDown={props.addAudio} style={{marginRight: 10}}>
              Add Audio
            </button>
            <button onMouseDown={props.addImage} style={{marginRight: 10}}>
              Add Image
            </button>
            <button onMouseDown={props.addVideo} style={{marginRight: 10}}>
              Add Video
            </button>
          </div>
          {props.showURLInput ? (
            <div style={styles.urlInputContainer}>
              <input
                onChange={props.onChange}
                ref={props.inputRef}
                style={styles.urlInput}
                type="text"
                value={props.value}
                onKeyDown={props.onKeyDown}
              />
              <button onMouseDown={props.confirmMedia}>
                Confirm
              </button>
            </div>
          ) : (<div></div>)}
        </div>
    );
};

export function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};
const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};
const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};
const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();
  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }
  return media;
};
