import React from 'react';

export default function Table({ headerSection, contentSection }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headerSection}
        </tr>
      </thead>
      <tbody>
        {contentSection}
      </tbody>
    </table>
  )
}
