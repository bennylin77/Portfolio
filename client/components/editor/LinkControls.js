import React from 'react';
import styles from './styles.js';

export const LinkControls = (props) => {
    return (
        <div>
          <div style={styles.buttons}>
            <button
              onMouseDown={props.promptForLink}
              style={{marginRight: 10}}>
              Add Link
            </button>
            <button onMouseDown={props.removeLink}>
              Remove Link
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
            <button onMouseDown={props.confirmLink}>
              Confirm
            </button>
          </div>
          ) : (<div></div>)}
        </div>
    );
};
export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
export const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};
