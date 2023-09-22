export const request:{ body: { password: string; email: string } } = {
    body: {email:"rt@gmail.com",password:"helloworld"}
}
export const mockResponse = () => {
    const res:any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};


