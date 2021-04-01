import React from 'react';
import { Helmet } from 'react-helmet';

interface HelmetComponentProps {
    title: string;
    description: string;
}
const HelmetComponent: React.FC<HelmetComponentProps> = ({
    title,
    description
}) => 
<Helmet>
    <title>{title}</title>
    <meta
        property="og:title"
        content={title}
    />
    <meta
        property="og:description"
        content={description}
    />
    <meta
        name="twitter:title"
        content={title}
    />
</Helmet>;

export default HelmetComponent;