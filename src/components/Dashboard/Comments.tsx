import { useEffect, useReducer, useRef } from "react"
// import Select from 'react-select'
import {
    GetComments,
    // GetPosts
} from "../../service-pattern/api-endpoint-service"
import {
    // Post,
    SelectDropdown, Comment
} from "../../utils/interface";

interface Props {
    selectedOptions?: SelectDropdown;
}

interface AppState {
    comments: Comment[];
    posts: SelectDropdown[];
    selectedPost: SelectDropdown
}

type Action =
    | { type: 'SET_COMMENTS'; payload: Comment[] }
    | { type: 'SET_POSTS'; payload: SelectDropdown[] }
    | { type: 'SET_POST'; payload: SelectDropdown };

const initialState: AppState = {
    comments: [],
    posts: [],
    selectedPost: { label: "All", value: -1 }
};

function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'SET_POST':
            return { ...state, selectedPost: action.payload };
        default:
            return state;
    }
}

const Comments: React.FC<Props> = ({ selectedOptions }) => {

    const isInitialMount = useRef(true);

    const [state, dispatch] = useReducer(appReducer, initialState);

    const handleGettingComments = async (postId: number) => {
        let commentResult = {
            data: []
        }
        if (postId < 0) {
            commentResult = await GetComments()
        } else {
            commentResult = await GetComments({ postId })
        }
        dispatch({ type: 'SET_COMMENTS', payload: commentResult.data });
    }

    // const handleGettingPosts = async () => {
    //     const postResult = await GetPosts()
    //     dispatch({ type: 'SET_POSTS', payload: [{ label: "All", value: -1 }, ...postResult.data.map((user: Post) => ({ label: user.title, value: user.id }))] });
    // }

    useEffect(() => {
        if (isInitialMount.current) {
            handleGettingComments(-1)
            isInitialMount.current = false;
        } else {
            if (selectedOptions?.value) {
                handleGettingComments(selectedOptions.value)
            }
        }

        console.log("selectedOptions", selectedOptions)
    }, [selectedOptions])

    // useEffect(() => {
    //     handleGettingComments(-1)
    //     handleGettingPosts()
    // }, [])

    // const handleSettingPost = (selectedOption: SelectDropdown | null) => {
    //     if (selectedOption) {
    //         dispatch({ type: 'SET_POST', payload: selectedOption });

    //         if (selectedOption.value < 0) {
    //             handleGettingComments(-1)
    //         } else {
    //             handleGettingComments(selectedOption.value)
    //         }
    //     }
    // }

    return (
        <div>
            Comments
            {/* <p>internal Select</p>
            <Select
                options={state.posts}
                value={state.selectedPost}
                onChange={selectedOption => handleSettingPost(selectedOption)}
            /> */}
            {
                state.comments.map((comment, index) => (
                    <div key={index} style={{ border: "1px solid grey", padding: "4px", maxWidth: "600px", marginBottom: "6px" }}>
                        <p style={{ color: "blue" }}>{comment.name}</p>
                        <p>{comment.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments