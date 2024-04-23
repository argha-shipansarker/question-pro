import { useEffect, useReducer } from "react"
import Select from 'react-select'
import {
    GetPosts,
    GetUsers
} from "../../service-pattern/api-endpoint-service"
import {
    Post, SelectDropdown,
    User
} from "../../utils/interface";

interface Props {
    selectedOptions: SelectDropdown;
}

interface AppState {
    posts: Post[];
    users: SelectDropdown[];
    selectedUser: SelectDropdown
}

type Action =
    | { type: 'SET_POSTS'; payload: Post[] }
    | { type: 'SET_USERS'; payload: SelectDropdown[] }
    | { type: 'SET_USER'; payload: SelectDropdown };

const initialState: AppState = {
    posts: [],
    users: [],
    selectedUser: { label: "All", value: -1 }
};

function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_USER':
            return { ...state, selectedUser: action.payload };
        default:
            return state;
    }
}

const Posts: React.FC<Props> = ({ selectedOptions }) => {

    useEffect(() => {
        console.log("selectedOptions", selectedOptions)
        handleGettingPosts(selectedOptions.value)
    }, [selectedOptions])

    const [state, dispatch] = useReducer(appReducer, initialState);

    const handleGettingPosts = async (userId: number) => {
        let postResult = {
            data: []
        }
        if (userId < 0) {
            postResult = await GetPosts()
        } else {
            postResult = await GetPosts({ userId })
        }
        dispatch({ type: 'SET_POSTS', payload: postResult.data });
    }

    const handleGettingUsers = async () => {
        const userResult = await GetUsers()
        dispatch({ type: 'SET_USERS', payload: [{ label: "All", value: -1 }, ...userResult.data.map((user: User) => ({ label: user.name, value: user.id }))] });
    }

    useEffect(() => {
        handleGettingPosts(-1)
        handleGettingUsers()
    }, [])

    const handleSettingUser = (selectedOption: SelectDropdown | null) => {
        if (selectedOption) {
            dispatch({ type: 'SET_USER', payload: selectedOption });

            if (selectedOption.value < 0) {
                handleGettingPosts(-1)
            } else {
                handleGettingPosts(selectedOption.value)
            }
        }
    }

    return (
        <div>
            posts
            <p>internal Select</p>
            <Select
                options={state.users}
                value={state.selectedUser}
                onChange={selectedOption => handleSettingUser(selectedOption)}
            />
            {
                state.posts.map((post, index) => (
                    <div key={index} style={{ border: "1px solid grey", padding: "4px", maxWidth: "600px", marginBottom: "6px" }}>
                        <p style={{ color: "blue" }}>{post.title}</p>
                        <p>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts