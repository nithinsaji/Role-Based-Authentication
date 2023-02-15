import React from 'react'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditIcon from '@mui/icons-material/Edit';
import './table.css'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const Table = (props) => {

    const { tableData, totalElements, totalPages, entryHandler, setPage, listHandler, page, entries, list, entry, updateRole, onChange, setSort, sort } = props;

    return (
        <div className="card">
            <div className="row top">
                <div className="t-entry-body" id="example_length">
                    <label>
                        Show
                        <select name="example_length" aria-controls="example" className="custom-select custom-select-sm form-control form-control-sm" onChange={entryHandler}>
                            {entries.map((value, key) => {
                                return (
                                    <option key={key} value={value} className='option'>{value}</option>
                                )
                            })}

                        </select>
                        entries
                    </label>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search..." onChange={(e) => onChange(e.target.value)} />
                    <SearchOutlinedIcon />
                </div>
            </div>
            <div className="row table-row" >
                <table id="example" className="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="example_info">
                    <thead>
                        <tr role="row" className="tr">
                            <th className="sorting" onClick={setSort}>
                                <span>
                                    Name
                                    <div className='sort-icon'>{sort === true ? <NorthIcon /> : <SouthIcon />}</div>
                                </span>
                            </th>
                            <th className="sorting">Username</th>
                            <th className="sorting">Joining Date</th>
                            <th className="sorting">Role</th>
                            <th className="sorting">Role Added By</th>
                            <th className="sorting">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length ?
                            tableData.map((data) => {
                                return (
                                    <tr key={data.id} role="row" className="tr">
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.joiningTime}</td>
                                        <td >
                                            <select defaultValue={data.roles[0].name} onChange={(e) => listHandler(e, data.id)}>
                                                <option value="ROLE_ADMIN">ROLE_ADMIN </option>
                                                <option value="ROLE_EDITOR">ROLE_EDITOR </option>
                                                <option value="ROLE_USER">ROLE_USER </option>
                                            </select>
                                        </td>
                                        <td>{data.roleAddedBy}</td>
                                        <td><button type='submit' className={`edit ${list.id === data.id && 'update'}`} onClick={list.id === data.id ? updateRole : undefined}><EditIcon /></button></td>
                                    </tr>
                                )
                            })
                            : <tr className='no-value'><td colSpan={6}>No Records Found!!!</td></tr>}
                    </tbody>
                </table>
            </div>
            <div className="row pagination-row">
                <div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example_info" role="status" aria-live="polite">Showing {(entry * (page - 1)) + 1} to {totalElements > entry*page ? entry * page : totalElements} of {totalElements} entries</div></div>
                <ul className="pagination">
                    {page > 1 && <li className="paginate_button page-item previous disabled" id="example_previous" onClick={() => setPage(1)}>First</li>}
                    {page > 2 && <li className="paginate_button page-item active">...</li>}
                    {page > 1 && <li className="paginate_button page-item active" onClick={() => setPage(page - 1)}>{page - 1}</li>}
                    <li className="paginate_button page-item">{page}</li>
                    {page < totalPages && <li className="paginate_button page-item" onClick={() => setPage(page + 1)}>{page + 1}</li>}
                    {page < totalPages - 1 && <li className="paginate_button page-item active">...</li>}
                    {page < totalPages && <li className="paginate_button page-item next" id="example_next" onClick={() => setPage(totalPages)}>Last</li>}
                </ul>
            </div>


        </div>

    )
}

export default Table