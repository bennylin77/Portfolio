import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw,
        AtomicBlockUtils,
        CompositeDecorator,
        ContentState} from 'draft-js';
import BlockStyleControls from 'components/editor/BlockStyleControls.js';
import InlineStyleControls from 'components/editor/InlineStyleControls.js';
import {LinkControls, findLinkEntities, Link} from 'components/editor/LinkControls.js';
import {MediaControls, mediaBlockRenderer} from 'components/editor/MediaControls.js';
import {
  updateArticle
} from 'actions/articleActions.js';
import { connect } from 'react-redux';
import './rich_editor.css';
import 'draft-js/dist/Draft.css';

//content
class BennyEditor extends React.Component {
  constructor(props) {
    super(props);

    //link
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    //link

    if(props.content)
      this.state = {editorState: EditorState.createWithContent( convertFromRaw( JSON.parse(props.content) ), decorator ),
                    showLinkURLInput: false,//link
                    LinkURLValue: '',//link
                    showMediaURLInput: false,//media
                    MediaURLValue: '',//media
                    urlType: '',//media
                   };
    else
      this.state = {editorState: EditorState.createEmpty(decorator),
                    showLinkURLInput: false,//link
                    LinkURLValue: '',//link
                    showMediaURLInput: false,//media
                    MediaURLValue: '',//media
                    urlType: '',//media
                   };
    //this.focus = () => this.refs.editor.focus();
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.onChange = (editorState) => this._handleOnChange(editorState);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    //link
    this.promptForLink = this._promptForLink.bind(this);
    this.onLinkURLChange = (e) => this.setState({LinkURLValue: e.target.value});///////
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    //link
    //media
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };
    this.onMediaURLChange = (e) => this.setState({MediaURLValue: e.target.value});/////
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onMediaInputKeyDown = this._onMediaInputKeyDown.bind(this);
    //media
  }

  componentDidMount(){
    this.domEditor.focus()
  }

  _handleOnChange(editorState){
    const { dispatch, id } = this.props;
    this.setState({editorState});
    const rawdata = convertToRaw(this.state.editorState.getCurrentContent())
    const data = { id: id, content: rawdata }
    dispatch(updateArticle(data))

  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  //link
  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        showLinkURLInput: true,
        LinkURLValue: url,
      }, () => {
        setTimeout(() => this.inputLinkURL.focus(), 0);
      });
    }
  }
  _confirmLink(e) {
    e.preventDefault();
    const {editorState, LinkURLValue} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: LinkURLValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showLinkURLInput: false,
      LinkURLValue: '',
    }, () => {
              setTimeout(() => this.domEditor.focus(), 0);
            });
  }
  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }
  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }
  //link

  //media
  _confirmMedia(e) {
    e.preventDefault();
    const {editorState, MediaURLValue, urlType} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      {src: MediaURLValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      ),
      showMediaURLInput: false,
      MediaURLValue: '',
    }, () => {
      setTimeout(() => this.domEditor.focus(), 0);
    });
  }
  _onMediaInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }
  _promptForMedia(type) {
    const {editorState} = this.state;
    this.setState({
      showMediaURLInput: true,
      MediaURLValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.inputMediaURL.focus(), 0);
    });
  }
  _addAudio() {
    this._promptForMedia('audio');
  }
  _addImage() {
    this._promptForMedia('image');
  }
  _addVideo() {
    this._promptForMedia('video');
  }
  //media


  render() {
    const { id, content } = this.props;
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <LinkControls
           promptForLink={this.promptForLink}
           removeLink={this.removeLink}
           showURLInput={this.state.showLinkURLInput}
           onChange={this.onLinkURLChange}
           value={this.state.LinkURLValue}
           onKeyDown={this.onLinkInputKeyDown}
           confirmLink={this.confirmLink}
           inputRef={el => this.inputLinkURL = el}
         />
       <MediaControls
            addAudio={this.addAudio}
            addImage={this.addImage}
            addVideo={this.addVideo}
            showURLInput={this.state.showMediaURLInput}
            onChange={this.onMediaURLChange}
            inputRef={el => this.inputMediaURL = el}
            value={this.state.MediaURLValue}
            onKeyDown={this.onMediaInputKeyDown}
            confirmMedia={this.confirmMedia}
          />

        <div className={className} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref={this.setDomEditorRef}
            spellCheck={true}
          />
        </div>
        <input
          onClick={this.logState}
          style={{
            marginTop: 10,
            textAlign: 'center',
          }}
          type="button"
          value="Log State"
        />

      </div>
    );
  }
}




// Custom overrides for "code" style.
const styleMap = {
  CODE:{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      };
function getBlockStyle(block) {
  switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
}
//connect
function mapStateToProps(state) {
  return {}
}
const App = connect(mapStateToProps)(BennyEditor);
export default App;
