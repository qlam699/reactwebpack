import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Box from '../component/utils/box';
import Table from '../component/utils/table';
import api from '../api';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Status() {

  const [status, setStatus] = useState({});

  useEffect(() => {

    const call = async () => {
      const s = await api.getStatus();
      setStatus(s);
    }

    call();
  }, []);

  const statusSection = useMemo(() => {
    if (Object.keys(status).length === 0) return (<div>Loading...</div>);
    if (status && status.error) {
      return (<div>Error: {mem.error}</div>);
    }

    const { data } = status;

    const statusHeader = () => {
      return Object.keys(data[0][0]).map(
        element => {
          return (
            <th key={element} className="table__col">{element}</th>
          )
        }
      )
    };

    const statusContent = () => {
      const list = data[0];

      return list.map(
        (element, index) => {

          const column = Object.keys(element).map(el => {
            const currentElement = element[el];
            if (typeof currentElement === 'boolean') {

              return (
                <td key={el} className="table__col"><FontAwesomeIcon icon={faCheck} color={currentElement ? "green" : "lightgray"} /></td>
                // <td key={el} className="table__col"></td>
              )
            }
            return (
              <td key={el} className="table__col">{currentElement}</td>
            )
          });

          return (
            <tr key={index}>{column}</tr>
          )
        }
      )
    }

    return (<Table headerSection={statusHeader()} contentSection={statusContent()} />);
  }, [status])





  return (
    <Box title="Status">
      {statusSection}

    </Box>
  )
}
