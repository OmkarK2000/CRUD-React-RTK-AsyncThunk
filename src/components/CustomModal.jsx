import { useSelector } from "react-redux"
import "./CustomModal.css"

const CustomModel = ({ id, setShowPopUp }) => {

  const allUsers = useSelector(state => state.app.users)

  const seletedUser = allUsers.filter(item => item.id === id)

  console.log(seletedUser)

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="btn btn-primary" onClick={() => setShowPopUp(false)}>X</button>
        {seletedUser && (
          <div>
            <h3>Name : {seletedUser[0].name}</h3>
            <p>Email : {seletedUser[0].email}</p>
            <p>Gender : {seletedUser[0].gender}</p>
            <p>Age : {seletedUser[0].age}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomModel