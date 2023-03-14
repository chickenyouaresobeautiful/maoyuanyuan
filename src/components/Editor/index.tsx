import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const Editor = (props: any) => {
  console.log('content', props.content);
  const [value, setValue] = useState(props.content ?? '');

  const handleChange = (content: any) => {
    setValue(content);
    props.setDetails(content);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
};

export default Editor;
