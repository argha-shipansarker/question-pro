import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { updateEmail, updateName } from '../../store/userInfoSlice'

function User() {

    const userInfo = useSelector((state: RootState) => state.userInfo)

    const dispatch = useDispatch()

    return (
        <div>
            <input
                type='text'
                placeholder='Name'
                value={userInfo.name}
                onChange={event => dispatch(updateName(event.target.value))}
            />

            <input
                type='text'
                placeholder='Email'
                value={userInfo.email}
                onChange={event => dispatch(updateEmail(event.target.value))}
            />
        </div>
    )
}

export default User