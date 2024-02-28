import React from "react";
import { Helmet } from "react-helmet-async";

interface ITitle {
    title?: string;
    description?: string;
}

const Title: React.FC<ITitle> = ({
    title = "skapp",
    description = "skapp a real time chat app using MERN",
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default Title;
