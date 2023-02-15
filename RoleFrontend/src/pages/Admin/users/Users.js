import React, { useEffect, useState } from 'react'
import Table from '../../Common/table/Table';
import AdminService from '../../../services/admin.service';
import { TOAST_PROPERTIES } from '../../Common/table/ToastProperties';
import Toast from '../../../components/toast-notification/Toast';


const Users = () => {

  const entries = [3,10, 25, 50, 100];
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

  // Toast details
  const [nlist, setNList] = useState([]);
  const [position, setPosition] = useState('top-right');
  let [checkValue, setCheckValue] = useState(true);
  const [autoDeleteTime, setAutoDeleteTime] = useState(5000);

  const showToast = (type, response) => {
    setPosition('top-right');
    setCheckValue(true);
    setAutoDeleteTime(3000);
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
    if (type === 'success') {
      toastProperties.description = 'Role Changed Successfully.'
    } else if (type === 'warning') {
      toastProperties.description = response.data.message
    }
    setNList([...nlist, toastProperties]);
  }

  //Search
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(true)
  const [tableData, setTableData] = useState({})
  const [totalElements, setTotalElements] = useState(0)

  const [totalPages, setTotalPages] = useState(1)

  const [entry, setEntry] = useState(3);

  const [page, setPage] = useState(1)

  const sortFun = () => {
    setSort(!sort)
    console.log(sort);
  }

  useEffect(() => {
    const fetchUserList = async () => {
      await AdminService.userlist(search, sort, entry, page).then(res => {
        setTableData(res.content)
        setTotalElements(res.totalElements)
        setTotalPages(res.totalPages);
      })

    }
    fetchUserList()
  }, [search, sort, entry, page])

  return (
    <>
      <div className="a-container">
        <div className="table-container">
          <div className="title">Users List</div>
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
            entry={entry}
            onChange={setSearch}
            setSort={sortFun}
            sort={sort} />
        </div>
      </div>
      <Toast
        toastList={nlist}
        position={position}
        autoDelete={checkValue}
        autoDeleteTime={autoDeleteTime}
      />
    </>
  )
}

export default Users