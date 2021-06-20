import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '../component/utils/box';
import Table from '../component/utils/table';
import api from '../api';

export default function Config() {

  const [conf, setConf] = useState({});
  const [listener, setListener] = useState({});


  useEffect(() => {
    const callConfig = async () => {
      const con = await api.getConfig();
      setConf(con);
    }

    const callListener = async () => {
      const lis = await api.getListener();
      setListener(lis);
    }

    callConfig();
    callListener();

  }, []);

  const listenerSection = useMemo(() => {
    if (Object.keys(listener).length === 0) return (<div>Loading...</div>);
    if (listener && listener.error) {
      return (<div>Error: {listener.error}</div>);
    }

    const { data } = listener;

    const listenerHeader = () => {
      return Object.keys(data[0][0]).map(
        element => {
          return (
            <th key={element} className="table__col">{element}</th>
          )
        }
      )
    }

    const listenerContent = () => {
      const list = data[0];
      return list.map(
        (element) => {

          const column = Object.keys(element).map((el) => (
            <td key={el} className="table__col">{element[el]}</td>
          ))

          return (
            <tr key={uuidv4()}>{column}</tr>
          )
        }
      )
    }
    return <Table headerSection={listenerHeader()} contentSection={listenerContent()} />
  }, [listener])


  const relaysSection = useMemo(() => {
    if (Object.keys(conf).length === 0) return (<div>Loading...</div>);
    if (conf && conf.error) {
      return (<div>Error: {conf.error}</div>);
    }

    const relaysHeader = () => {
      return Object.keys(conf.data.relays[1]).map(element => {
        return (
          <th key={uuidv4()} className="table__col">{element}</th>
        )
      })
    }

    const relaysContent = () => {
      return conf.data.relays.map((element) => {
        const column = Object.keys(element).map((el) => (
          <td key={uuidv4()} className="table__col">{JSON.stringify(element[el])}</td>
        ));

        return (
          <tr key={uuidv4()}>{column}</tr>
        )
      })
    };

    return (<Table headerSection={relaysHeader()} contentSection={relaysContent()} />)
  }, [conf])


  return (
    <div>
      <div className="row">
        <Box title="Config">
          <form>
            <div className="form-group" >
              <label>relay_name: </label>
              <span>connect.wixcloud.de</span>
            </div>

            <div className="form-group" >
              <label>Relay: </label>
              <ul>
                <li>wixr://localhost</li>
              </ul>
            </div>


            <div className="form-group" >
              <label>Relays: </label>
              {relaysSection}
            </div>

            <div className="form-group" >
              <label>user_agent: </label>
              <span>"Mozilla/5.0 (Windows NT 6.3; Macintosh; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0 wixConnect/20190405"</span>
            </div>

            <div className="form-group" >
              <label>Debug: </label>
              <input type="checkbox"
                label="Debug"
              />
            </div>

          </form>
        </Box>
      </div>
      <div className="row">
        <Box title="Listener">
          {listenerSection}
        </Box>
      </div>
    </div>
  )
}
