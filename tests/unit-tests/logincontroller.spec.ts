import {jest} from '@jest/globals';
import {loginController} from "../../src/controllers/loginController";
import {describe} from "node:test";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import {collections} from "../../src/services/db";
import {request, mockResponse} from '../helpers/MockHelpers'

describe("Login controller",()=>{
    let response:any;
    beforeAll(()=>{
        dotenv.config();
    });

    beforeEach(()=>{
        response = mockResponse()
    })
    

    it("test user with successful login",  async() =>{
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue({email:"test1@gmail.com",passwordHash:"helloworld",info:{}, isVerified:false,_id:1}),
        }
        collections.users = users as any;
        await loginController(request as any, response as any);
        collections.users && expect(collections.users.findOne).toHaveBeenCalledTimes(1);
        //expect(response.status).toHaveBeenCalledWith(201);
    })
    it("test login  with wrong usernamae",  async() =>{
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue(null),
        }
        collections.users = users as any;
        await loginController(request as any, response as any);
        collections.users && expect(collections.users.findOne).toHaveBeenCalledTimes(1);
        expect(response.sendStatus).toHaveBeenCalledWith(401);
    })
    it("test login  with wrong password",  async() =>{
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue({email:"test@gmail.com", password:"helloworld"}),
        }
        jest.spyOn(bcrypt, "compare").mockImplementationOnce(()=>{return false as any})
        collections.users = users as any;
        await loginController(request as any, response as any);
        collections.users && expect(collections.users.findOne).toHaveBeenCalledTimes(1);
        expect(response.sendStatus).toHaveBeenCalledWith(401);
    })
    afterAll(()=>{
        jest.restoreAllMocks();
    })
})