jest.mock("../../config/db")
jest.mock("bcrypt")
jest.mock("jsonwebToken")

const db=require("../../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authService = require("../authService")

describe("authService.register" , ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test("throw an error if the email already exists" , async()=>{
        db.query.mockResolvedValueOnce([[{id:1, email :"existing@test.com"}]]);

        await expect(authService.register({
            name:"John",
            email:"existing@test.com",
            password:"secret",
            role:"student"
        })
    ).rejects.toThrow("email already exists");

    expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    test("hashes the password and inserts the data", async()=>{
        db.query
        .mockResolvedValueOnce([[]])//no existing user
        .mockResolvedValueOnce([{insertId: 43}]);

        bcrypt.hash.mockResolvedValueOnce("hashed_password")

        const result = await authService.register({
            name:"John",
            email:"john@test.com",
            password:"plainpassword",
            role:"student"
        });

        expect(bcrypt.hash).toHaveBeenCalledWith("plainpassword", 10);

        expect(db.query).toHaveBeenCalledWith(2,
            expect.stringContaining("INSERT INTO users"),
            ["John", "john@test.com", "hashed_password", "student"]
        );
        expect(result).toEqual({
            id:43,
            name:"Jhon",
            email:"john@test.com",
            role:"student"
        })
        
    })
});

describe("authService.login" , ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test_secret";
    });

    test("throws an error when email is not found", async()=>{
        db.query.mockResolvedValueOnce([[]]);

        await expect(
            authService.login({email:"testing@test.com", password:"xyz"})
        ).rejects.toThrow("Invaild email or password")
        
    });

    test("throws an error when the password does not match" , async()=>{
        db.query.mockResolvedValueOnce([[{
            id:1,
            email:"john@test.com",
            password:"hashed_password",
            role:"student"
        }]]);

        bcrypt.compare.mockResolvedValueOnce(false);
        await expect(
            authService.login({email:"john@test.com", password:"wrong"})
        ).rejects.toThrow("invaild email or password")
    });

    test("returns a token and user details after succesful login", async()=>{
        db.query.mockResolvedValueOnce([[{
            id:1,
            name:"John",
            email:"john@test.com",
            password:"hashed_password",
            role:"student"
        }]])
        bcrypt.compare.mockResolvedValueOnce(true);
        jwt.sign.mockResolvedValueOnce("signed.jwt.token")

        const result = await authService.login({
            email:"john@test.com",
            password:"plainpassword"
        });

        expect(jwt.sign).toHaveBeenCalledWith({id:1, role:"student"},
            "test_secret",{expiresIn:"8d"}
        );

        expect(result).toEqual({
            token:"signed.jwt.token",
            user:{
                id:1,
                name:"John",
                email:"john@test.com",
                role:"student"
            }
        })
    })
})