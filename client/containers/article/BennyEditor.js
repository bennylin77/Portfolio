import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw,
        CompositeDecorator,
        ContentState} from 'draft-js';
import BlockStyleControls from 'components/editor/BlockStyleControls.js';
import InlineStyleControls from 'components/editor/InlineStyleControls.js';
import {LinkControls, findLinkEntities, Link} from 'components/editor/LinkControls.js';
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
                    showURLInput: false,//link
                    urlValue: '',//link
                   };
    else
      this.state = {editorState: EditorState.createEmpty(decorator),
                    showURLInput: false,//link
                    urlValue: '',//link
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
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
    //link
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
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.inputUrl.focus(), 0);
      });
    }
  }
  _confirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
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
           showURLInput={this.state.showURLInput}
           onChange={this.onURLChange}
           value={this.state.urlValue}
           onKeyDown={this.onLinkInputKeyDown}
           confirmLink={this.confirmLink}
           inputRef={el => this.inputUrl = el}
         />
        <div className={className} onClick={this.focus}>
          <Editor
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
