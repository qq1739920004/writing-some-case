let users;

const fetchUsers = async () => {
    // 使用顶层 await
    const res = await Promise.resolve('aaa')
    users = res;
}
fetchUsers();
module.exports=fetchUsers


