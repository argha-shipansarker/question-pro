import React, { useEffect, useReducer, useRef } from "react"
import {
    GetPosts,
} from "../../service-pattern/api-endpoint-service"
import {
    Post, SelectDropdown,
} from "../../utils/interface";

interface Props {
    selectedOptions?: SelectDropdown;
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

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            handleGettingPosts(-1)
            isInitialMount.current = false;
        } else {
            if (selectedOptions?.value) {
                handleGettingPosts(selectedOptions.value)
            }
        }
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

    return (
        <div style={{ marginTop: "30px" }}>
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

export default React.memo(Posts, (prevProps, nextProps) => {
    return prevProps.selectedOptions?.value === nextProps.selectedOptions?.value;
})