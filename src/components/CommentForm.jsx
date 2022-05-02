import { useState } from 'react'
import '../assets/styles/commentForm.css'


function CommentForm( {handleSubmit, submitLabel} ) {
    const [text, setText] = useState('');
    const isTextEmpty = text.length === 0;
    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit(text)
        setText('')
    }

  return (
    <form className="commentForm" onSubmit={onSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn_comment" disabled={isTextEmpty} style={{backgroundColor: isTextEmpty && 'grey'}}>{submitLabel}</button>
    </form>
    
  )
}

export default CommentForm