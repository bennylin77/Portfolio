import React from 'react';

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};


export const LinkControls = (props) => {
  //if(props.showURLInput){
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
  //}else {
  //  return(<div></div>);
  //}
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
