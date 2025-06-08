import React from "react";

interface ListProps<T> {
    data: T[];
    renderData: (item: T) => React.ReactNode;
}

export const List = <T,>({ data, renderData }: ListProps<T>) => {
    return(
        <>
            {data.map((item, index) => (
                <React.Fragment key={index}>
                    {renderData(item)}
                </React.Fragment>
            ))}
        </>
    )
};

