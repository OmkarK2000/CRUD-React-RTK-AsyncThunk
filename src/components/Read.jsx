import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, showUser } from "../features/gitUserSlice"
import CustomModal from "./CustomModal"
import { Link } from "react-router-dom"

const Read = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.app)
  const [id, setId] = useState()
  const [showPopUp, setShowPopUp] = useState(false)
  
  // console.log(users)

  useEffect(() => {
    dispatch(showUser())
  },[])

  if(loading){
    return <h1>Loading..</h1>
  }

  return (
    <div className="container d-flex flex-column  ">
      <h3 className="mx-auto mt-2 mb-2">All Blogs</h3>
      {showPopUp && <CustomModal id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      <div className="container d-flex flex-row flex-wrap">
      {users && users.map((item)=>(
        <div key={item.id} className="card w-25 " >
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.email}</p>
            <p className="card-text">{item.gender}</p>
            <button to="" className="btn btn-primary mx-1" onClick={()=> [setId(item.id), setShowPopUp(true)]}>View </button>
            <Link to={`/edit/${item.id}`} className="btn btn-secondary mx-1">Edit </Link>
            <Link onClick={()=> dispatch(deleteUser(item.id))} className="btn btn-danger mx-1">Delete </Link>
          </div>
      </div>
      ))}
      </div>
    </div>
  )
}

export default Read