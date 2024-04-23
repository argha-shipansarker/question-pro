import {
    // Outlet, 
    Route, Routes, useLocation, useNavigate
} from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import Posts from "./Post";
import Comments from "./Comments";
import { GetPosts, GetUsers } from "../../service-pattern/api-endpoint-service";
import { Post, SelectDropdown, User } from "../../utils/interface";
import Select from 'react-select'

function DashboardLayout() {

    const navigate = useNavigate();
    const location = useLocation();

    const [options, setOptions] = useState<SelectDropdown[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<SelectDropdown>({ label: "All", value: -1 })




    useEffect(() => {
        navigate('/dashboard/posts');
    }, []);

    const handleGettingDataForSelect = async () => {
        setSelectedOptions({ label: "All", value: -1 })
        if (location.pathname == "/dashboard/posts") {
            const userResult = await GetUsers()
            setOptions([{ label: "All", value: -1 }, ...userResult.data.map((user: User) => ({ label: user.name, value: user.id }))])
        } else if (location.pathname == "/dashboard/comments") {
            const postResult = await GetPosts()
            setOptions([{ label: "All", value: -1 }, ...postResult.data.map((user: Post) => ({ label: user.title, value: user.id }))])
        }
    }

    const handleSettingOption = (selectedOption: SelectDropdown | null) => {
        if (selectedOption) {
            setSelectedOptions(selectedOption)
        }
    }

    // useEffect(() => {
    //     console.log("options", selectedOptions)
    // }, [selectedOptions])

    useEffect(() => {
        handleGettingDataForSelect()
    }, [location.pathname])

    return (
        <>
            <DashboardHeader />
            <p>common Select</p>
            <Select
                options={options}
                value={selectedOptions}
                onChange={selectedOption => handleSettingOption(selectedOption)}
            />

            {/* <Outlet /> */}

            <Routes>
                <Route path="posts" element={<Posts selectedOptions={selectedOptions} />} />
                <Route path="comments" element={<Comments selectedOptions={selectedOptions} />} />
            </Routes>
        </>
    )
}

export default DashboardLayout