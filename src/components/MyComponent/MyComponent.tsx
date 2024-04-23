import { useEffect, useState } from 'react';

function MyComponent() {

    const [count, setCount] = useState<number>(0);

    const handleButtonClick = () => {
        console.log("clicked")
        setCount(prevState => prevState + 1);
    };

    useEffect(() => {
        const buttons = document.querySelectorAll('button');

        for (const button of buttons) {
            button.addEventListener('click', handleButtonClick);
            break;
        }

        return () => {
            for (const button of buttons) {
                button.removeEventListener('click', handleButtonClick);
                break;
            }
        };
    }, []);

    return (
        <div>
            <p>hey you have clicked me {count} times</p>
            <div style={{ display: "flex", columnGap: "14px", alignItems: "center", userSelect: "none" }}>
                <div>this is a div</div>
                <button>Button 1</button>
                <button>Button 2</button>

                <div>Other content...</div>
            </div>
        </div>
    );
};

export default MyComponent;
