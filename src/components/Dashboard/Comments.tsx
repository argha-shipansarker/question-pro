import { useEffect, useReducer, useRef } from "react"
import {
    GetComments,
} from "../../service-pattern/api-endpoint-service"
import {
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

    useEffect(() => {
        if (isInitialMount.current) {
            handleGettingComments(-1)
            isInitialMount.current = false;
        } else {
            if (selectedOptions?.value) {
                handleGettingComments(selectedOptions.value)
            }
        }

    }, [selectedOptions])

    return (
        <div style={{ marginTop: "30px" }}>
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