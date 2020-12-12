export const parseJSONData = <T,>(data: string): T => {
    let parsedData = undefined;

    try {
        parsedData = JSON.parse(data);
    } catch (e) {}

    return parsedData;
}