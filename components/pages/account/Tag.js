import { useState, useEffect } from 'react'

const Tag = ({ tag }) => {
  return (
    <div
      style={{ borderColor: tag.color }}
      className={`inline-block rounded border-l-8 border-solid bg-light-100 px-2 py-1.25 font-body text-xs font-bold`}
    >
      {tag.name}
    </div>
  )
}

export default Tag
