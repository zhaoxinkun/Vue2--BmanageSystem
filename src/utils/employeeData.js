import {employee} from "@/api/api";
import {getToken} from "@/utils/token";


let EmployeeData = null

// 我们要做的是:
// 1.发送请求
// 2.把拿到的数据返回出去


export const getEmployeeData = async () => {
    if (!EmployeeData) {
        console.log(getToken())
        EmployeeData = await employee(getToken())
            .then(response => {
                console.log(response);
                // let {code, data} = response.data;
                // if (code === 20000) {
                //     return data
                // } else {
                //     return alert("获取用户列表失败")
                // }
            })
            // .catch(error => {
            //     return alert(error)
            // })
    }
    return EmployeeData
}
