import {jest } from '@jest/globals';
import {signupController} from "../../src/controllers/signupController";
import {describe} from "node:test";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import {collections} from "../../src/services/db";
import {request, mockResponse} from '../helpers/MockHelpers'

describe("Signup Controller",()=>{
    let response:any;
    beforeAll(()=>{
        dotenv.config();
    });
    
    beforeEach(()=>{
        response = mockResponse()
    })
    
    
    
    it("test signup router if user already exists",  async() =>{
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue({email:"test@gmail.com",password:"helloworld"}),
        }
                collections.users = users as any;
                 await signupController(request as any, response as any);
                 collections.users && expect(collections.users.findOne).toHaveBeenCalledTimes(1);
                expect(response.sendStatus).toHaveBeenCalledWith(409);
    })
    it("test signup router if its a new user",  async() =>{
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue(null),
        }
        collections.users = users as any;
        await signupController(request as any, response as any);
        collections.users && expect(collections.users.insertOne).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(201);
    })
    it("test signup router without sending password",  async() =>{
        response = mockResponse()
        let users = {
            insertOne:jest.fn().mockReturnValue({insertedId:1}),
            findOne:jest.fn().mockReturnValue(null),
        }
        collections.users = users as any;
        await signupController(request as any, response as any);
        collections.users && expect(collections.users.findOne).toHaveBeenCalledTimes(1);
       expect(response.status).toHaveBeenCalledWith(201);
    })
    afterAll(()=>{
        jest.resetAllMocks();
    })
})