import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';

function ClaudeRecipe({receipe}) {
  return (
     <section>
    <article className="suggested-recipe-container mt-5">
    
    <ReactMarkdown children={receipe} remarkPlugins={[remarkGfm]} />
    </article>
    
        
    
        </section>
  )
}

export default ClaudeRecipe