import { useContextApi } from "../../store/AppContext";


function User() {

    const { userInfo, setUserInfo } = useContextApi();


    return (
        <div>
            <input
                type='text'
                placeholder='Name'
                value={userInfo.name}
                onChange={event => setUserInfo({ ...userInfo, name: event.target.value })}
            />

            <input
                type='text'
                placeholder='Email'
                value={userInfo.email}
                onChange={event => setUserInfo({ ...userInfo, email: event.target.value })}
            />
        </div>
    )
}

export default User