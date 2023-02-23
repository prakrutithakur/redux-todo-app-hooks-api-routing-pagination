import React, { useState, useEffect } from 'react';

function FetchButton() {
    const [clicked, setClicked] = React.useState(false);
    // const [titleini, setTitleini] = useState('');

    // useEffect(() => {
    //     document.title = { titleini };
    // });

    if (clicked) {


        return React.createElement(
            'button',
            {
                onClick: () => setClicked(false),
                // onClick: () => setTitleini(`You Fetched the data`),
            },
            'Delete Data');
    }

    return (


        React.createElement(
            'button',
            {
                onClick: () => setClicked(true),
            },
            'Fetch Data'

        )
    );
}

export default FetchButton;