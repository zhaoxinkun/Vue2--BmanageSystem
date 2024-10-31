export const filterHandler = {
    method: {
        filterHandler01(value, row, column) {
            console.log("filterHandler01 被调用");
            const property = column['property'];
            return row[property] === value;
        }
    }
}
