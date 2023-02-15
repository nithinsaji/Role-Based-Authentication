import React, { useEffect, useState } from 'react'
import './home.css'
import Widget from '../../Common/widget/Widget'
import Table from '../../Common/table/Table';
import AdminService from '../../../services/admin.service';
import { TOAST_PROPERTIES } from '../../Common/table/ToastProperties';
import Toast from '../../../components/toast-notification/Toast';

const Home = () => {

  const [widgetData, setWidgetData] = useState([])

  const entries = [10, 25, 50, 100];

  const [tableData, setTableData] = useState({})

  const [totalElements, setTotalElements] = useState(0)

  const [totalPages, setTotalPages] = useState(1)

  const [entry, setEntry] = useState(10);

  const [page, setPage] = useState(1)

  const [list, setList] = useState({})

  const entryHandler = (e) => {
    setEntry(e.target.value)
  }

  const listHandler = (e, data) => {
    e.preventDefault();
    setList({
      id: data,
      role: e.target.value
    })
  }

  const updateRole = async () => {
    await AdminService.updateRole(list.id, list.role).then((res) => {
      setList({})
      showToast('success')
    }).catch((e) => {
      showToast('warning', e.response)
    })
  }

  useEffect(() => {
    const fetchNewUser = async () => {
      await AdminService.newUserlist().then((res) => {
        setTableData(res.content)
        setTotalElements(res.totalElements)
        setTotalPages(res.totalPages);
      })
    }
    const fetchUserCount = async () => {
      await AdminService.userCount().then((res) => {
        setWidgetData(res);
      })
    }
    fetchNewUser()
    fetchUserCount()
  }, [])

  // Toast details
  const [nlist, setNList] = useState([]);
  // const [position, setPosition] = useState('top-right');
  // let [checkValue, setCheckValue] = useState(true);
  // const [autoDeleteTime, setAutoDeleteTime] = useState(5000);

  const showToast = (type, response) => {
    // setPosition('top-right');
    // setCheckValue(true);
    // setAutoDeleteTime(3000);
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
    if (type === 'success') {
      toastProperties.description = 'Role Changed Successfully.'
    } else if (type === 'warning') {
      toastProperties.description = response.data.message
    }
    setNList([...nlist, toastProperties]);
  }

  return (
    <>
      <div className="a-container">
        <div className="title">Dashboard</div>
        <div className="w-box">
          <Widget widgetData={widgetData} />
        </div>
        <div className="table-container">
          <div className="title">New Users</div>
          <Table
            tableData={tableData}
            totalElements={totalElements}
            totalPages={totalPages}
            entryHandler={entryHandler}
            entries={entries}
            listHandler={listHandler}
            updateRole={updateRole}
            setPage={setPage}
            page={page}
            list={list}
            entry={entry} />
        </div>
      </div>
      <Toast
        toastList={nlist}
        autoDelete={true}
        autoDeleteTime={3000}
      />
    </>
  );
};
export default Home