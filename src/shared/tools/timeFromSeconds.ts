export const getTimeFromSeconds = (timestamp: number) => {
    const roundedTimestamp = Math.ceil(timestamp);
    const days = Math.floor(roundedTimestamp / (60 * 60 * 24));
    const hours = Math.floor((roundedTimestamp % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((roundedTimestamp % (60 * 60)) / 60);
    const seconds = Math.floor(roundedTimestamp % 60);

    return {
        seconds,
        minutes,
        hours,
        days
    };
};