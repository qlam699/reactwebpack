import React from 'react';

export default function Box({ title, children }) {
  return (
    <div className="box">
      <div className="box__title">
        {title}
      </div>
      <div className="box__content">
        {children}
      </div>
    </div>
  )
}