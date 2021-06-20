import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Box from '../component/utils/box';
import api from '../api';

export default function Stats() {
  // const [stats, setStats] = useState();
  const [mem, setMem] = useState({});

  useEffect(() => {
    const call = async () => {
      const m = await api.getMem();
      setMem(m);
    }

    call();
  }, []);

  const memorySection = useMemo(() => {
    if (Object.keys(mem).length === 0) return (<div>Loading...</div>);

    if (mem && mem.error) {
      return (<div>Error: {mem.error}</div>);
    }

    return Object.keys(mem.data).map(e => (
      <li key={e}>{e} - {mem.data[e]}</li>
    ))
  }, [mem]);



  return (
    <Box title="Stats">
      <ul>
        {memorySection}
      </ul>
    </Box>
  )
}
